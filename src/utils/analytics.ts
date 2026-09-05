"use client";

import { track } from "@vercel/analytics";
import type { Arm } from "./experiment";
import { getSessionId } from "./session";

type AllowedPropertyValues = string | number | boolean | null;

/**
 * The experiment arm this visitor is in, set once per page by the server.
 *
 * Held here rather than recomputed in the browser on purpose. Assignment is a
 * pure function of the experiment cookie, so the client *could* work it out —
 * but a Flags Explorer override during QA changes what the server renders
 * without changing the cookie. Recomputing would then report the arm the
 * visitor is not actually seeing, which is worse than not reporting it.
 */
let experimentArm: Arm | null = null;

/** Called by `<ExperimentArm>` with the value the server actually resolved. */
export function setExperimentArm(arm: Arm | null): void {
  experimentArm = arm;
}

export function getExperimentArm(): Arm | null {
  return experimentArm;
}

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
  const stamped: Record<string, AllowedPropertyValues> = { ...properties };
  if (sessionId) stamped.session_id = sessionId;
  // Every event carries its arm, so the funnel can be split by variant without
  // a join — see #217.
  if (experimentArm) stamped.experiment_arm = experimentArm;
  track(name, Object.keys(stamped).length > 0 ? stamped : undefined);
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
