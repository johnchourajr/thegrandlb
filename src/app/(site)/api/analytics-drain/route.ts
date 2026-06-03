import crypto from "node:crypto";
import type { NextRequest } from "next/server";
import pool from "../../../../services/db";

// Vercel signs each drain delivery with HMAC-SHA1 over the raw request body,
// using the drain's signing secret, and sends the result as a bare hex digest
// in the `x-vercel-signature` header (no "sha1=" prefix). Set
// ANALYTICS_DRAIN_SECRET to that signing secret. Fails closed if it is unset.
function verifySignature(rawBody: string, header: string | null): boolean {
  const secret = process.env.ANALYTICS_DRAIN_SECRET;
  if (!secret || !header) return false;

  const expected = crypto
    .createHmac("sha1", secret)
    .update(rawBody, "utf-8")
    .digest("hex");

  const received = Buffer.from(header);
  const computed = Buffer.from(expected);
  return (
    received.length === computed.length &&
    crypto.timingSafeEqual(received, computed)
  );
}

// Columns written for every event, in insert order. `event_type` and
// `occurred_at` are required; everything else is nullable. `raw` keeps the full
// Vercel event so we never silently drop a field again — new dimensions can be
// backfilled from it without re-instrumenting the site.
const COLUMNS = [
  "event_type",
  "event_name",
  "event_data",
  "path",
  "route",
  "origin",
  "referrer",
  "referrer_host",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "country",
  "region",
  "city",
  "device_type",
  "device_brand",
  "device_model",
  "os_name",
  "os_version",
  "browser_name",
  "browser_version",
  "client_type",
  "session_id",
  "device_id",
  "project_id",
  "owner_id",
  "vercel_env",
  "deployment_id",
  "raw",
  "occurred_at",
] as const;

type Column = (typeof COLUMNS)[number];

// The base table predates the richer dimensions, so we add the new columns with
// idempotent, additive `ADD COLUMN IF NOT EXISTS` — safe to run against the
// existing populated table on every cold start.
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
  ALTER TABLE analytics_events
    ADD COLUMN IF NOT EXISTS route           TEXT,
    ADD COLUMN IF NOT EXISTS referrer        TEXT,
    ADD COLUMN IF NOT EXISTS referrer_host   TEXT,
    ADD COLUMN IF NOT EXISTS utm_source      TEXT,
    ADD COLUMN IF NOT EXISTS utm_medium      TEXT,
    ADD COLUMN IF NOT EXISTS utm_campaign    TEXT,
    ADD COLUMN IF NOT EXISTS utm_term        TEXT,
    ADD COLUMN IF NOT EXISTS utm_content     TEXT,
    ADD COLUMN IF NOT EXISTS country         TEXT,
    ADD COLUMN IF NOT EXISTS region          TEXT,
    ADD COLUMN IF NOT EXISTS city            TEXT,
    ADD COLUMN IF NOT EXISTS device_type     TEXT,
    ADD COLUMN IF NOT EXISTS device_brand    TEXT,
    ADD COLUMN IF NOT EXISTS device_model    TEXT,
    ADD COLUMN IF NOT EXISTS os_name         TEXT,
    ADD COLUMN IF NOT EXISTS os_version      TEXT,
    ADD COLUMN IF NOT EXISTS browser_name    TEXT,
    ADD COLUMN IF NOT EXISTS browser_version TEXT,
    ADD COLUMN IF NOT EXISTS client_type     TEXT,
    ADD COLUMN IF NOT EXISTS owner_id        TEXT,
    ADD COLUMN IF NOT EXISTS vercel_env      TEXT,
    ADD COLUMN IF NOT EXISTS deployment_id   TEXT,
    ADD COLUMN IF NOT EXISTS raw             JSONB;
  CREATE INDEX IF NOT EXISTS analytics_events_event_name_idx    ON analytics_events (event_name);
  CREATE INDEX IF NOT EXISTS analytics_events_occurred_at_idx   ON analytics_events (occurred_at DESC);
  CREATE INDEX IF NOT EXISTS analytics_events_device_type_idx   ON analytics_events (device_type);
  CREATE INDEX IF NOT EXISTS analytics_events_country_idx       ON analytics_events (country);
  CREATE INDEX IF NOT EXISTS analytics_events_referrer_host_idx ON analytics_events (referrer_host);
  CREATE INDEX IF NOT EXISTS analytics_events_utm_source_idx    ON analytics_events (utm_source);
`;

let tableReady = false;

async function ensureTable() {
  if (tableReady) return;
  await pool.query(SETUP_SQL);
  tableReady = true;
}

// Normalize empty/missing values to null so dimension GROUP BYs stay clean.
function str(v: unknown): string | null {
  return v === undefined || v === null || v === "" ? null : String(v);
}

// Bare hostname (sans leading www.) for referrer grouping, e.g.
// "https://www.google.com/search" -> "google.com".
function hostOf(url: unknown): string | null {
  const s = str(url);
  if (!s) return null;
  try {
    return new URL(s).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

// Vercel sends the raw query string in `queryParams`; pull the standard UTM
// fields out into their own columns for acquisition reporting.
function parseUtm(
  queryParams: unknown,
): Record<(typeof UTM_KEYS)[number], string | null> {
  const out = {
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_term: null,
    utm_content: null,
  } as Record<(typeof UTM_KEYS)[number], string | null>;
  const s = str(queryParams);
  if (!s) return out;
  try {
    const params = new URLSearchParams(s.startsWith("?") ? s.slice(1) : s);
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) out[k] = v;
    }
  } catch {
    /* ignore malformed query strings */
  }
  return out;
}

// jsonb params must be passed as JSON text; objects/arrays are stringified so
// node-postgres doesn't coerce arrays into Postgres array literals.
function asJsonb(v: unknown): string | null {
  if (v === undefined || v === null) return null;
  return typeof v === "string" ? v : JSON.stringify(v);
}

function rowFor(e: Record<string, unknown>): unknown[] {
  const utm = parseUtm(e.queryParams);
  const values: Record<Column, unknown> = {
    event_type: String(e.eventType ?? ""),
    event_name: str(e.eventName),
    event_data: asJsonb(e.eventData),
    path: str(e.path),
    route: str(e.route),
    origin: str(e.origin),
    referrer: str(e.referrer),
    referrer_host: hostOf(e.referrer),
    utm_source: utm.utm_source,
    utm_medium: utm.utm_medium,
    utm_campaign: utm.utm_campaign,
    utm_term: utm.utm_term,
    utm_content: utm.utm_content,
    country: str(e.country),
    region: str(e.region),
    city: str(e.city),
    device_type: str(e.deviceType),
    device_brand: str(e.deviceBrand),
    device_model: str(e.deviceModel),
    os_name: str(e.osName),
    os_version: str(e.osVersion),
    browser_name: str(e.clientName),
    browser_version: str(e.clientVersion),
    client_type: str(e.clientType),
    session_id: e.sessionId ?? null,
    device_id: e.deviceId ?? null,
    project_id: str(e.projectId),
    owner_id: str(e.ownerId),
    vercel_env: str(e.vercelEnvironment),
    deployment_id: str(e.deployment),
    raw: asJsonb(e),
    occurred_at: new Date(Number(e.timestamp)).toISOString(),
  };
  return COLUMNS.map((c) => values[c]);
}

export async function POST(request: NextRequest) {
  const body = await request.text();

  const valid = verifySignature(
    body,
    request.headers.get("x-vercel-signature"),
  );
  if (!valid) return new Response("Unauthorized", { status: 401 });

  // Vercel sends either NDJSON (one object per line) or a JSON array
  let events: unknown[];
  try {
    const trimmed = body.trim();
    events = trimmed.startsWith("[")
      ? JSON.parse(trimmed)
      : trimmed.split("\n").map((l: string) => JSON.parse(l));
  } catch {
    return new Response("Bad Request", { status: 400 });
  }

  await ensureTable();

  const analyticsEvents = (events as Record<string, unknown>[]).filter(
    (e) => e.schema === "vercel.analytics.v2",
  );

  if (analyticsEvents.length === 0) return new Response(null, { status: 204 });

  const rows = analyticsEvents.map(rowFor);
  const width = COLUMNS.length;
  const placeholders = rows
    .map((_, i) => {
      const base = i * width;
      return `(${COLUMNS.map((__, j) => `$${base + j + 1}`).join(",")})`;
    })
    .join(",");

  await pool.query(
    `INSERT INTO analytics_events (${COLUMNS.join(",")})
     VALUES ${placeholders}`,
    rows.flat(),
  );

  return new Response(null, { status: 204 });
}
