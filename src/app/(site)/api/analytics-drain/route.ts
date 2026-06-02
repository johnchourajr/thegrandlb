import type { NextRequest } from "next/server";
import pool from "../../../../services/db";

// Vercel signs drain payloads with HMAC-SHA1 using the drain secret.
// Set ANALYTICS_DRAIN_SECRET in Vercel env vars to match what you configure
// in the drain settings. If unset, signature verification is skipped (dev only).
async function verifySignature(body: string, header: string | null): Promise<boolean> {
  const secret = process.env.ANALYTICS_DRAIN_SECRET;
  if (!secret) return true; // skip in dev
  if (!header) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-1" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
  const expected = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return header === `sha1=${expected}`;
}

const SETUP_SQL = `
  CREATE TABLE IF NOT EXISTS analytics_events (
    id          BIGSERIAL PRIMARY KEY,
    event_type  TEXT        NOT NULL,
    event_name  TEXT,
    event_data  JSONB,
    path        TEXT,
    origin      TEXT,
    session_id  BIGINT,
    device_id   BIGINT,
    project_id  TEXT,
    occurred_at TIMESTAMPTZ NOT NULL,
    received_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
  CREATE INDEX IF NOT EXISTS analytics_events_event_name_idx  ON analytics_events (event_name);
  CREATE INDEX IF NOT EXISTS analytics_events_occurred_at_idx ON analytics_events (occurred_at DESC);
`;

let tableReady = false;

async function ensureTable() {
  if (tableReady) return;
  await pool.query(SETUP_SQL);
  tableReady = true;
}

export async function POST(request: NextRequest) {
  const body = await request.text();

  const valid = await verifySignature(body, request.headers.get("x-vercel-signature"));
  if (!valid) return new Response("Unauthorized", { status: 401 });

  // Vercel sends either NDJSON (one object per line) or a JSON array
  let events: unknown[];
  try {
    const trimmed = body.trim();
    events = trimmed.startsWith("[") ? JSON.parse(trimmed) : trimmed.split("\n").map((l) => JSON.parse(l));
  } catch {
    return new Response("Bad Request", { status: 400 });
  }

  await ensureTable();

  const analyticsEvents = (events as Record<string, unknown>[]).filter(
    (e) => e.schema === "vercel.analytics.v2",
  );

  if (analyticsEvents.length === 0) return new Response(null, { status: 204 });

  const values = analyticsEvents.map((e) => [
    String(e.eventType ?? ""),
    e.eventName ? String(e.eventName) : null,
    e.eventData ? (typeof e.eventData === "string" ? JSON.parse(e.eventData) : e.eventData) : null,
    e.path ? String(e.path) : null,
    e.origin ? String(e.origin) : null,
    e.sessionId ?? null,
    e.deviceId ?? null,
    e.projectId ? String(e.projectId) : null,
    new Date(Number(e.timestamp)).toISOString(),
  ]);

  const placeholders = values
    .map((_, i) => {
      const base = i * 9;
      return `($${base + 1},$${base + 2},$${base + 3},$${base + 4},$${base + 5},$${base + 6},$${base + 7},$${base + 8},$${base + 9})`;
    })
    .join(",");

  await pool.query(
    `INSERT INTO analytics_events
       (event_type,event_name,event_data,path,origin,session_id,device_id,project_id,occurred_at)
     VALUES ${placeholders}`,
    values.flat(),
  );

  return new Response(null, { status: 204 });
}
