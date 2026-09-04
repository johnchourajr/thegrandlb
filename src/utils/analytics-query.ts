import { SESSION_QUERY_PARAM } from "./session";

/**
 * Reads the query parameters off a Vercel analytics log-drain event.
 *
 * The drain used to assume `queryParams` was a raw query string. It is not —
 * Vercel sends a **JSON object**, serialised:
 *
 *   queryParams: "{\"_sid\":\"s_9f2d615bef38d5e2\",\"utm_source\":\"newsletter\"}"
 *
 * Handing that to `new URLSearchParams(...)` does not throw. It produces one
 * key containing the entire JSON text, so every `.get()` returns null and the
 * failure is completely silent. The cost of that:
 *
 *   - `session_uid` was null on 100% of pageviews, even though `_sid` was
 *     present on 215 of the 216 pageviews the day it shipped.
 *   - `utm_source` and `utm_campaign` were null on all 30,005 events, while
 *     431 of them carried a `utm_` parameter in `raw`. Campaign traffic has
 *     been arriving and being discarded, not absent.
 *
 * Both shapes are accepted now: the JSON object Vercel actually sends, and a
 * genuine query string, in case that ever changes back.
 */
export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export type UtmFields = Record<(typeof UTM_KEYS)[number], string | null>;

function str(v: unknown): string | null {
  if (typeof v === "string") return v.trim() || null;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  return null;
}

export function queryOf(queryParams: unknown): URLSearchParams | null {
  // Already an object — the shape after jsonb round-trips.
  if (
    queryParams &&
    typeof queryParams === "object" &&
    !Array.isArray(queryParams)
  ) {
    return fromEntries(queryParams as Record<string, unknown>);
  }

  const s = str(queryParams);
  if (!s) return null;

  // The shape Vercel actually sends.
  if (s.startsWith("{")) {
    try {
      const parsed = JSON.parse(s);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return fromEntries(parsed as Record<string, unknown>);
      }
    } catch {
      // Fall through and try it as a query string.
    }
  }

  try {
    return new URLSearchParams(s.startsWith("?") ? s.slice(1) : s);
  } catch {
    return null;
  }
}

function fromEntries(obj: Record<string, unknown>): URLSearchParams {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(obj)) {
    const v = str(value);
    if (v !== null) params.set(key, v);
  }
  return params;
}

/** Pulls the standard UTM fields into their own columns. */
export function parseUtm(queryParams: unknown): UtmFields {
  const out: UtmFields = {
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_term: null,
    utm_content: null,
  };
  const params = queryOf(queryParams);
  if (!params) return out;
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) out[key] = value;
  }
  return out;
}

function parseJson(v: unknown): unknown {
  if (typeof v !== "string") return v;
  try {
    return JSON.parse(v);
  } catch {
    return null;
  }
}

/**
 * The first-party session id minted in `src/utils/session.ts`.
 *
 * Custom events carry it in their property bag; pageviews have no property bag,
 * so it rides along as the `_sid` query parameter instead.
 *
 * Vercel's own `sessionId` is not a session identifier — 68% null across 90
 * days, every non-null value the literal `0`. It is still stored in
 * `session_id` for fidelity, but nothing reads it.
 */
export function sessionUid(e: Record<string, unknown>): string | null {
  const data = parseJson(e.eventData);
  if (data && typeof data === "object" && !Array.isArray(data)) {
    const fromEvent = str((data as Record<string, unknown>).session_id);
    if (fromEvent) return fromEvent;
  }
  return str(queryOf(e.queryParams)?.get(SESSION_QUERY_PARAM));
}
