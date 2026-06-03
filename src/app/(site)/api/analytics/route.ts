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
                  COUNT(DISTINCT session_id)::int   AS sessions
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
                  COUNT(DISTINCT session_id)::int    AS sessions
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
                  COUNT(DISTINCT session_id)::int AS sessions
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
                  COUNT(DISTINCT session_id)::int               AS sessions
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
                  COUNT(DISTINCT session_id)::int AS sessions
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
                  COUNT(DISTINCT session_id)::int AS sessions
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
