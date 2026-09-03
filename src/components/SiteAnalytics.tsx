"use client";

import { getSessionId, SESSION_QUERY_PARAM } from "@/utils/session";
import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";

/**
 * Attach the first-party session id to every outgoing analytics event.
 *
 * Custom events carry it in their property bag (see `trackEvent`). Pageviews
 * have no property bag, so it rides along as a query parameter — Vercel records
 * the query string separately from the path, so page grouping is unaffected in
 * both the Vercel dashboard and `analytics_events.path`. The drain lifts it
 * back out into `analytics_events.session_uid`.
 */
function attachSession(event: BeforeSendEvent): BeforeSendEvent {
  const sessionId = getSessionId();
  if (!sessionId) return event;

  try {
    const url = new URL(event.url, window.location.origin);
    url.searchParams.set(SESSION_QUERY_PARAM, sessionId);
    return { ...event, url: url.toString() };
  } catch {
    // Never let instrumentation drop an event.
    return event;
  }
}

export default function SiteAnalytics() {
  return <Analytics beforeSend={attachSession} />;
}
