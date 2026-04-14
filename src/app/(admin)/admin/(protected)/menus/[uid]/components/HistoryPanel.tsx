"use client";

import { useEffect, useState } from "react";
import type { CommitRecord } from "@/app/(site)/api/admin/menus/[uid]/history/route";

const STATE_LABELS: Record<string, string> = {
  READY: "Live",
  BUILDING: "Building",
  ERROR: "Failed",
  CANCELED: "Canceled",
  QUEUED: "Queued",
};

const STATE_CLS: Record<string, string> = {
  READY: "bg-black/10 text-black",
  BUILDING: "bg-gold/20 text-black/70",
  ERROR: "bg-red/10 text-red",
  CANCELED: "bg-black/5 text-black/30",
  QUEUED: "bg-black/5 text-black/40",
};

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const mins = Math.floor(diff / 60_000);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  if (days > 30) return new Date(isoDate).toLocaleDateString();
  if (days > 0) return `${days}d ago`;
  if (hrs > 0) return `${hrs}h ago`;
  if (mins > 0) return `${mins}m ago`;
  return "just now";
}

export function HistoryPanel({
  uid,
  open,
  onClose,
}: {
  uid: string;
  open: boolean;
  onClose: () => void;
}) {
  const [commits, setCommits] = useState<CommitRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setError(null);
    fetch(`/api/admin/menus/${uid}/history`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        setCommits(data.commits ?? []);
      })
      .catch(() => setError("Failed to load history"))
      .finally(() => setLoading(false));
  }, [open, uid]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9998] bg-black/20 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal — matches ReviewModal layout */}
      <div className="fixed inset-0 z-[9999] overflow-y-auto flex items-start justify-center p-4 pt-16">
        <div className="w-full max-w-2xl rounded-xl border border-black/10 bg-white shadow-2xl flex flex-col min-h-[calc(100vh-64px)] max-h-[calc(100vh-64px)]">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 shrink-0">
            <div>
              <h2 className="font-semibold text-black text-paragraph-default">
                Publish History
              </h2>
              <p className="text-string-default text-black/40 mt-0.5">
                {commits.length > 0
                  ? `${commits.length} publish${commits.length !== 1 ? "es" : ""} found`
                  : "Recent changes to this menu"}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-black/30 hover:text-black transition-colors text-string-default"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {loading && (
              <p className="text-paragraph-small text-black/30 text-center py-12">
                Loading history…
              </p>
            )}

            {!loading && error && (
              <p className="text-paragraph-small text-red text-center py-12">{error}</p>
            )}

            {!loading && !error && commits.length === 0 && (
              <p className="text-paragraph-small text-black/30 italic text-center py-12">
                No publish history found.
              </p>
            )}

            {!loading && commits.length > 0 && (
              <ol className="flex flex-col gap-px">
                {commits.map((c, i) => (
                  <li key={c.sha} className="flex gap-4 pb-6 relative">
                    {/* Timeline line */}
                    {i < commits.length - 1 && (
                      <div className="absolute left-[11px] top-6 bottom-0 w-px bg-black/10" />
                    )}

                    {/* Dot */}
                    <div className="shrink-0 mt-1 w-6 h-6 rounded-full border-2 border-black/20 bg-white flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-black/30" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-paragraph-small font-medium text-black truncate">
                        {c.message}
                      </p>
                      <p className="text-string-default text-black/40 mt-0.5">
                        {c.authorEmail} · {timeAgo(c.date)}
                      </p>

                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <a
                          href={c.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-string-extra-small text-black/40 hover:text-black transition-colors"
                        >
                          {c.shortSha}
                        </a>

                        {c.deploy && (
                          <a
                            href={`https://${c.deploy.url}/menus/${uid}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={[
                              "px-1.5 py-0.5 rounded text-string-extra-small font-medium transition-opacity hover:opacity-70",
                              STATE_CLS[c.deploy.state] ?? STATE_CLS.CANCELED,
                            ].join(" ")}
                          >
                            {STATE_LABELS[c.deploy.state] ?? c.deploy.state}
                          </a>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end px-6 py-4 border-t border-black/10 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-black/15 text-paragraph-small font-medium text-black/60 hover:text-black hover:border-black/30 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
