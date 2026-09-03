"use client";

import { track } from "@vercel/analytics";
import { getSessionId } from "./session";

type AllowedPropertyValues = string | number | boolean | null;

/**
 * Send a custom event to Vercel Web Analytics, stamped with the first-party
 * session id so it can be joined to the rest of that visit.
 *
 * Prefer this over importing `track` directly. An event sent without a session
 * id can only be analysed at visitor level, which is the limitation the
 * funnel audit ran into — see `analysis/funnel-analysis.sql`.
 */
export function trackEvent(
  name: string,
  properties?: Record<string, AllowedPropertyValues>,
): void {
  const sessionId = getSessionId();
  track(
    name,
    sessionId ? { ...properties, session_id: sessionId } : properties,
  );
}

/** Bare hostname (sans leading `www.`), for grouping outbound destinations. */
export function hostOf(url: string): string | null {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}
