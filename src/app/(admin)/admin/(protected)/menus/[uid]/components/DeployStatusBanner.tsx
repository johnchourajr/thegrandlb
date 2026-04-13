"use client";

import { useEffect, useRef, useState } from "react";
import type { DeployStatus } from "@/app/(site)/api/admin/menus/[uid]/deploy-status/route";

const POLL_INTERVAL_MS = 8_000;
const TERMINAL_STATES = new Set(["READY", "ERROR", "CANCELED"]);

export function DeployStatusBanner({
  uid,
  commitSha,
}: {
  uid: string;
  commitSha: string | null;
}) {
  const [status, setStatus] = useState<DeployStatus>({ state: null, url: null });
  const [justWentLive, setJustWentLive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!commitSha) return;

    let cancelled = false;

    async function poll() {
      const res = await fetch(
        `/api/admin/menus/${uid}/deploy-status?sha=${commitSha}`,
        { cache: "no-store" },
      ).catch(() => null);

      if (!res?.ok || cancelled) return;

      const data: DeployStatus = await res.json();
      setStatus(data);

      if (data.state === "READY") {
        setJustWentLive(true);
        // Clear "just went live" message after 6 s
        timerRef.current = setTimeout(() => setJustWentLive(false), 6_000);
      }

      if (data.state && TERMINAL_STATES.has(data.state)) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }

    // Immediate first poll, then on interval
    poll();
    intervalRef.current = setInterval(poll, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [uid, commitSha]);

  // Nothing to show
  if (!commitSha || (!status.state && !justWentLive)) return null;

  // Silently hide canceled / unknown
  if (status.state === "CANCELED" || status.state === null) return null;

  if (justWentLive || status.state === "READY") {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/5 text-string-default text-black/60">
        <span className="w-2 h-2 rounded-full bg-black/40 shrink-0" />
        Live
      </div>
    );
  }

  if (status.state === "ERROR") {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red/10 text-string-default text-red">
        <span className="w-2 h-2 rounded-full bg-red shrink-0" />
        Deploy failed
      </div>
    );
  }

  // BUILDING or QUEUED
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gold/15 text-string-default text-black/70">
      <span className="w-2 h-2 rounded-full bg-gold shrink-0 animate-pulse" />
      {status.state === "QUEUED" ? "Queued…" : "Deploying…"}
    </div>
  );
}
