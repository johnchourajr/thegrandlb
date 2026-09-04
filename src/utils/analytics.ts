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

/**
 * Viewport dimensions, for slicing form behaviour by available screen height
 * rather than by device class. A large phone in landscape and a small laptop
 * window share a problem that "mobile vs desktop" cannot express.
 */
export function viewportProps(): { viewport_w: number; viewport_h: number } {
  if (typeof window === "undefined") return { viewport_w: 0, viewport_h: 0 };
  return {
    viewport_w: Math.round(window.innerWidth),
    viewport_h: Math.round(window.innerHeight),
  };
}

/** Bare hostname (sans leading `www.`), for grouping outbound destinations. */
export function hostOf(url: string): string | null {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}
