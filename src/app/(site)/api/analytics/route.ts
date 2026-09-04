import type { NextRequest } from "next/server";
import pool from "../../../../services/db";

// Bearer token auth — ANALYTICS_READ_TOKEN must be set in Vercel env vars.
// Use the same token as the Bearer value in Retool's REST resource headers.
function isAuthorized(request: NextRequest): boolean {
  const token = process.env.ANALYTICS_READ_TOKEN;
  if (!token) return false; // deny if token not configured
  const auth = request.headers.get("authorization") ?? "";
  return auth === `Bearer ${token}`;
}

// Vercel's `session_id` is not a session identifier — across 90 days it was 68%
// null and every non-null value was the literal 0, so every "sessions" figure
// built on it was wrong. Count the first-party id instead (src/utils/session.ts),
// falling back to the device for rows written before that shipped so historical
// numbers degrade to visitor-level rather than collapsing to zero.
const SESSION_KEY = `COALESCE(session_uid, 'device:' || device_id::text)`;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
};

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401, headers: CORS },
    );
  }

  const { searchParams } = request.nextUrl;
  const endpoint = searchParams.get("q") ?? "events";
  const days = Math.min(parseInt(searchParams.get("days") ?? "30"), 90);
  const since = `NOW() - INTERVAL '${days} days'`;

  try {
    let result;

    switch (endpoint) {
      // Recent raw events — used for the event log table in Retool
      case "events": {
        const limit = Math.min(
          parseInt(searchParams.get("limit") ?? "100"),
          500,
        );
        const eventName = searchParams.get("event_name");
        const where = eventName ? `AND event_name = $2` : "";
        const params: unknown[] = [limit];
        if (eventName) params.push(eventName);
        result = await pool.query(
          `SELECT id, event_type, event_name, event_data, path, route,
                  referrer_host, utm_source, country, region, city,
                  device_type, os_name, browser_name, occurred_at
           FROM analytics_events
           WHERE occurred_at > ${since} ${where}
           ORDER BY occurred_at DESC
           LIMIT $1`,
          params,
        );
        return Response.json({ rows: result.rows }, { headers: CORS });
      }

      // Event counts grouped by name — for the bar/pie chart
      case "event_counts": {
        result = await pool.query(
          `SELECT event_name, COUNT(*)::int AS count
           FROM analytics_events
           WHERE occurred_at > ${since} AND event_name IS NOT NULL
           GROUP BY event_name
           ORDER BY count DESC`,
        );
        return Response.json({ rows: result.rows }, { headers: CORS });
      }

      // Daily event volume — for the time-series chart
      case "daily": {
        const eventName = searchParams.get("event_name");
        const where = eventName ? `AND event_name = $1` : "";
        const params = eventName ? [eventName] : [];
        result = await pool.query(
          `SELECT DATE(occurred_at) AS date, COUNT(*)::int AS count
           FROM analytics_events
           WHERE occurred_at > ${since} ${where}
           GROUP BY DATE(occurred_at)
           ORDER BY date ASC`,
          params,
        );
        return Response.json({ rows: result.rows }, { headers: CORS });
      }

      // Inquiry funnel: submit → success rate
      case "inquiry_funnel": {
        result = await pool.query(
          `SELECT
             event_name,
             COUNT(*)::int AS total,
             event_data->>'event_type' AS event_type
           FROM analytics_events
           WHERE occurred_at > ${since}
             AND event_name IN ('conversion.inquiry_submit','conversion.inquiry_success','conversion.inquiry_error')
           GROUP BY event_name, event_data->>'event_type'
           ORDER BY event_name, total DESC`,
        );
        return Response.json({ rows: result.rows }, { headers: CORS });
      }

      // Inquiry form drop-off, split by device. This is the query the funnel
      // audit could not run: it separates "opened the form and never touched a
      // field" from "started filling it in and gave up", and shows where.
      //
      // Scoped to rows carrying a first-party session id, so it reports only on
      // traffic seen since the form instrumentation shipped. Older rows have no
      // start/step events and would drag every rate toward zero.
      case "inquiry_form_funnel": {
        result = await pool.query(
          `WITH s AS (
             SELECT
               session_uid,
               MAX(device_type)                                                      AS device_type,
               COALESCE(BOOL_OR(path LIKE '/inquire%' AND event_name IS NULL), false) AS reached_form,
               COALESCE(BOOL_OR(event_name = 'conversion.inquiry_start'), false)      AS started,
               COALESCE(BOOL_OR(event_name = 'conversion.inquiry_blocked'), false)    AS blocked,
               COALESCE(BOOL_OR(event_name = 'conversion.inquiry_submit'), false)     AS submitted,
               COALESCE(BOOL_OR(event_name = 'conversion.inquiry_success'), false)    AS succeeded,
               MAX(CASE WHEN event_data->>'step' ~ '^[0-9]+$'
                        THEN (event_data->>'step')::int END)
                 FILTER (WHERE event_name = 'conversion.inquiry_step')                AS furthest_step
             FROM analytics_events
             WHERE occurred_at > ${since}
               AND session_uid IS NOT NULL
             GROUP BY session_uid
           )
           SELECT
             COALESCE(NULLIF(device_type, ''), 'unknown')          AS device_type,
             (COUNT(*) FILTER (WHERE reached_form))::int           AS reached_form,
             (COUNT(*) FILTER (WHERE started))::int                AS started,
             (COUNT(*) FILTER (WHERE blocked))::int                AS hit_validation_block,
             (COUNT(*) FILTER (WHERE submitted))::int              AS submitted,
             (COUNT(*) FILTER (WHERE succeeded))::int              AS succeeded,
             ROUND(100.0 * COUNT(*) FILTER (WHERE started)
                   / NULLIF(COUNT(*) FILTER (WHERE reached_form), 0), 1) AS pct_form_to_start,
             ROUND(100.0 * COUNT(*) FILTER (WHERE submitted)
                   / NULLIF(COUNT(*) FILTER (WHERE started), 0), 1)      AS pct_start_to_submit,
             ROUND(AVG(furthest_step) FILTER (WHERE started AND NOT submitted), 2)
                                                                   AS avg_step_abandoned
           FROM s
           GROUP BY 1
           ORDER BY reached_form DESC`,
        );
        return Response.json({ rows: result.rows }, { headers: CORS });
      }

      // Direct evidence for the mobile button-bar defect: how often the action
      // bar is measured sitting on top of the form's own fields, and on which
      // screens. Sliced by viewport height rather than device class, because a
      // phone in landscape and a small laptop window share the problem.
      case "form_obstruction": {
        result = await pool.query(
          `SELECT
             COALESCE(NULLIF(event_data->>'bar_position', ''), 'unknown') AS bar_position,
             COALESCE(NULLIF(device_type, ''), 'unknown')                 AS device_type,
             CASE
               WHEN event_data->>'viewport_h' ~ '^[0-9]+$' THEN
                 CASE
                   WHEN (event_data->>'viewport_h')::int < 700 THEN 'under 700px'
                   WHEN (event_data->>'viewport_h')::int < 900 THEN '700-899px'
                   ELSE '900px and up'
                 END
               ELSE 'unknown'
             END                                                          AS viewport_band,
             COALESCE(NULLIF(event_data->>'worst_field', ''), '(none)')   AS worst_field,
             COUNT(*)::int                                                AS occurrences,
             COUNT(DISTINCT session_uid)::int                             AS sessions,
             ROUND(AVG(CASE WHEN event_data->>'worst_pct' ~ '^[0-9]+$'
                            THEN (event_data->>'worst_pct')::numeric END), 1) AS avg_worst_pct
           FROM analytics_events
           WHERE occurred_at > ${since}
             AND event_name = 'conversion.inquiry_obstructed'
           GROUP BY 1, 2, 3, 4
           ORDER BY sessions DESC`,
        );
        return Response.json({ rows: result.rows }, { headers: CORS });
      }

      // Per-field engagement: which inputs people actually touch, and how many
      // of them go on to submit. Catches the visitor who stalls on one field
      // and leaves without ever pressing Next — invisible to inquiry_blocked.
      case "inquiry_field_dropoff": {
        result = await pool.query(
          `WITH touched AS (
             SELECT DISTINCT session_uid, event_data->>'field' AS field
             FROM analytics_events
             WHERE occurred_at > ${since}
               AND event_name = 'conversion.inquiry_field'
               AND session_uid IS NOT NULL
           ),
           submitted AS (
             SELECT DISTINCT session_uid
             FROM analytics_events
             WHERE occurred_at > ${since}
               AND event_name = 'conversion.inquiry_submit'
               AND session_uid IS NOT NULL
           )
           SELECT
             t.field,
             COUNT(DISTINCT t.session_uid)::int AS sessions_touched,
             COUNT(DISTINCT s.session_uid)::int AS sessions_submitted,
             ROUND(100.0 * COUNT(DISTINCT s.session_uid)
                   / NULLIF(COUNT(DISTINCT t.session_uid), 0), 1) AS pct_went_on_to_submit
           FROM touched t
           LEFT JOIN submitted s USING (session_uid)
           GROUP BY t.field
           ORDER BY sessions_touched DESC`,
        );
        return Response.json({ rows: result.rows }, { headers: CORS });
      }

      // Agent activity: MCP tool calls + menu fetches + markdown requests
      case "agent_activity": {
        result = await pool.query(
          `SELECT
             event_name,
             event_data->>'tool'  AS tool,
             event_data->>'menu'  AS menu,
             event_data->>'path'  AS md_path,
             COUNT(*)::int        AS count
           FROM analytics_events
           WHERE occurred_at > ${since}
             AND event_name LIKE 'agent.%'
           GROUP BY event_name, event_data->>'tool', event_data->>'menu', event_data->>'path'
           ORDER BY count DESC`,
        );
        return Response.json({ rows: result.rows }, { headers: CORS });
      }

      // Phone click counts
      case "phone_clicks": {
        result = await pool.query(
          `SELECT DATE(occurred_at) AS date, COUNT(*)::int AS count
           FROM analytics_events
           WHERE occurred_at > ${since}
             AND event_name = 'conversion.phone_click'
           GROUP BY DATE(occurred_at)
           ORDER BY date ASC`,
        );
        return Response.json({ rows: result.rows }, { headers: CORS });
      }

      // Device-type mix (desktop / mobile / tablet) — pie/donut
      case "by_device": {
        result = await pool.query(
          `SELECT COALESCE(device_type, 'unknown') AS device_type,
                  COUNT(*)::int                     AS count,
                  COUNT(DISTINCT ${SESSION_KEY})::int AS sessions
           FROM analytics_events
           WHERE occurred_at > ${since}
           GROUP BY COALESCE(device_type, 'unknown')
           ORDER BY count DESC`,
        );
        return Response.json({ rows: result.rows }, { headers: CORS });
      }

      // Browser breakdown
      case "by_browser": {
        result = await pool.query(
          `SELECT COALESCE(browser_name, 'unknown') AS browser_name,
                  COUNT(*)::int                      AS count,
                  COUNT(DISTINCT ${SESSION_KEY})::int AS sessions
           FROM analytics_events
           WHERE occurred_at > ${since}
           GROUP BY COALESCE(browser_name, 'unknown')
           ORDER BY count DESC`,
        );
        return Response.json({ rows: result.rows }, { headers: CORS });
      }

      // Operating-system breakdown
      case "by_os": {
        result = await pool.query(
          `SELECT COALESCE(os_name, 'unknown') AS os_name,
                  COUNT(*)::int                 AS count,
                  COUNT(DISTINCT ${SESSION_KEY})::int AS sessions
           FROM analytics_events
           WHERE occurred_at > ${since}
           GROUP BY COALESCE(os_name, 'unknown')
           ORDER BY count DESC`,
        );
        return Response.json({ rows: result.rows }, { headers: CORS });
      }

      // Acquisition sources: UTM source wins, else referrer host, else Direct
      case "sources": {
        result = await pool.query(
          `SELECT COALESCE(utm_source, referrer_host, 'Direct') AS source,
                  COUNT(*)::int                                 AS count,
                  COUNT(DISTINCT ${SESSION_KEY})::int AS sessions
           FROM analytics_events
           WHERE occurred_at > ${since}
           GROUP BY COALESCE(utm_source, referrer_host, 'Direct')
           ORDER BY count DESC
           LIMIT 25`,
        );
        return Response.json({ rows: result.rows }, { headers: CORS });
      }

      // UTM campaign breakdown — only rows that carry a UTM tag
      case "utm": {
        result = await pool.query(
          `SELECT utm_source, utm_medium, utm_campaign,
                  COUNT(*)::int                   AS count,
                  COUNT(DISTINCT ${SESSION_KEY})::int AS sessions
           FROM analytics_events
           WHERE occurred_at > ${since}
             AND (utm_source IS NOT NULL OR utm_medium IS NOT NULL OR utm_campaign IS NOT NULL)
           GROUP BY utm_source, utm_medium, utm_campaign
           ORDER BY count DESC`,
        );
        return Response.json({ rows: result.rows }, { headers: CORS });
      }

      // Geography: country (with region/city rollup)
      case "geo": {
        result = await pool.query(
          `SELECT COALESCE(country, 'Unknown')  AS country,
                  region,
                  city,
                  COUNT(*)::int                  AS count,
                  COUNT(DISTINCT ${SESSION_KEY})::int AS sessions
           FROM analytics_events
           WHERE occurred_at > ${since}
           GROUP BY COALESCE(country, 'Unknown'), region, city
           ORDER BY count DESC
           LIMIT 100`,
        );
        return Response.json({ rows: result.rows }, { headers: CORS });
      }

      default:
        return Response.json(
          { error: "Unknown query" },
          { status: 400, headers: CORS },
        );
    }
  } catch (err) {
    console.error("[analytics]", err);
    return Response.json(
      { error: "Query failed" },
      { status: 500, headers: CORS },
    );
  }
}
