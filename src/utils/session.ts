/**
 * First-party session identifier.
 *
 * Vercel's drain delivers a `sessionId` field, but it is not a session
 * identifier: across 90 days of production data it was 68% NULL and every
 * non-null value was the literal string `0` (plus three test rows). Anything
 * keyed on it returns confident, wrong answers — see the header note in
 * `analysis/funnel-analysis.sql`. This module mints our own instead.
 *
 * Semantics follow the usual convention: a session is one browser's run of
 * activity with no more than `SESSION_TIMEOUT_MS` of idle time between events.
 * The id is random and carries no personal data — it is not derived from the
 * visitor, is scoped to one browser, and is never shared with a third party.
 *
 * Deliberately not marked `"use client"`: the drain route imports
 * `SESSION_QUERY_PARAM` on the server, and the browser-only paths are guarded
 * by a `typeof window` check.
 */

/** Query parameter that carries the session id on pageviews. */
export const SESSION_QUERY_PARAM = "_sid";

const STORAGE_KEY = "glb.session";

/** Idle gap that ends a session. 30 minutes is the analytics-industry default. */
const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

type StoredSession = { id: string; lastSeen: number };

/**
 * Fallback for browsers where `localStorage` throws — private mode, embedded
 * webviews, storage disabled. Keeps the id stable for the life of the document
 * rather than minting a fresh one on every event.
 */
let memorySession: StoredSession | null = null;

function newId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return `s_${crypto.randomUUID().replace(/-/g, "").slice(0, 16)}`;
  }
  const rand = () => Math.random().toString(36).slice(2, 10);
  return `s_${rand()}${rand()}`;
}

function read(): StoredSession | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return memorySession;
    const parsed = JSON.parse(raw) as Partial<StoredSession>;
    if (typeof parsed.id !== "string" || typeof parsed.lastSeen !== "number") {
      return memorySession;
    }
    return { id: parsed.id, lastSeen: parsed.lastSeen };
  } catch {
    return memorySession;
  }
}

function write(session: StoredSession): void {
  memorySession = session;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    /* memorySession is already holding it */
  }
}

/**
 * The current session id, extending the idle window as a side effect. Returns
 * null on the server, where there is no session to speak of.
 */
export function getSessionId(): string | null {
  if (typeof window === "undefined") return null;

  const now = Date.now();
  const previous = read();
  const stillActive =
    previous !== null && now - previous.lastSeen < SESSION_TIMEOUT_MS;

  const session: StoredSession = stillActive
    ? { id: previous.id, lastSeen: now }
    : { id: newId(), lastSeen: now };

  write(session);
  return session.id;
}
