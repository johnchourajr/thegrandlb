import type { NextRequest } from "next/server";
import pool from "../../../../services/db";

// Simple token auth — set ANALYTICS_READ_TOKEN in Vercel env vars,
// then use that as the Bearer token in Retool's REST resource.
function isAuthorized(request: NextRequest): boolean {
  const token = process.env.ANALYTICS_READ_TOKEN;
  if (!token) return true; // open in dev if not set
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
    return Response.json({ error: "Unauthorized" }, { status: 401, headers: CORS });
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
        const limit = Math.min(parseInt(searchParams.get("limit") ?? "100"), 500);
        const eventName = searchParams.get("event_name");
        const where = eventName ? `AND event_name = $2` : "";
        const params: unknown[] = [limit];
        if (eventName) params.push(eventName);
        result = await pool.query(
          `SELECT id, event_type, event_name, event_data, path, occurred_at
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

      default:
        return Response.json({ error: "Unknown query" }, { status: 400, headers: CORS });
    }
  } catch (err) {
    console.error("[analytics]", err);
    return Response.json({ error: "Query failed" }, { status: 500, headers: CORS });
  }
}
