"use client";

import { useEffect, useState } from "react";
import type { GlobalCommitRecord } from "@/app/(site)/api/admin/menus/changes/route";
import type { ChangeEntry } from "@/app/(admin)/admin/(protected)/menus/[uid]/utils/diff";
import { inlineDiff } from "@/app/(admin)/admin/(protected)/menus/[uid]/utils/diff";

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

const MENU_COLORS: Record<string, string> = {
  classic: "bg-black/10 text-black",
  corporate: "bg-black/10 text-black",
  milestones: "bg-black/10 text-black",
  weddings: "bg-black/10 text-black",
  shared: "bg-black/5 text-black/50",
};

// ─── Diff row ─────────────────────────────────────────────────────────────────

function DiffRow({ entry }: { entry: ChangeEntry }) {
  const parts = entry.kind === "modified" ? inlineDiff(entry.before, entry.after) : null;

  return (
    <div className="py-2.5 border-b border-black/5 last:border-0">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-black/30 mb-1">
        {entry.path}
      </p>
      {entry.kind === "added" && (
        <p className="text-string-default text-green-700 bg-green-50 rounded px-2 py-1">
          + {entry.after}
        </p>
      )}
      {entry.kind === "removed" && (
        <p className="text-string-default text-red bg-red/5 rounded px-2 py-1 line-through">
          {entry.before}
        </p>
      )}
      {entry.kind === "modified" && parts && (
        <p className="text-string-default leading-relaxed font-mono break-words">
          {parts.map((p, i) =>
            p.kind === "same" ? (
              <span key={i} className="text-black/50">{p.text}</span>
            ) : p.kind === "add" ? (
              <span key={i} className="bg-green-100 text-green-800 rounded px-0.5">{p.text}</span>
            ) : (
              <span key={i} className="bg-red/10 text-red rounded px-0.5 line-through">{p.text}</span>
            )
          )}
        </p>
      )}
    </div>
  );
}

// ─── Commit row ───────────────────────────────────────────────────────────────

function CommitRow({
  commit,
  isLast,
}: {
  commit: GlobalCommitRecord;
  isLast: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [changes, setChanges] = useState<ChangeEntry[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadDiff() {
    if (changes !== null) { setExpanded((v) => !v); return; }
    setExpanded(true);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/admin/menus/changes/${commit.sha}?uid=${commit.menuUid}`
      );
      const data = await res.json();
      if (data.error) setError(data.error);
      else setChanges(data.changes ?? []);
    } catch {
      setError("Failed to load diff");
    } finally {
      setLoading(false);
    }
  }

  return (
    <li className="flex gap-4 pb-6 relative">
      {!isLast && (
        <div className="absolute left-[11px] top-6 bottom-0 w-px bg-black/10" />
      )}

      <div className="shrink-0 mt-1 w-6 h-6 rounded-full border-2 border-black/20 bg-white flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-black/30" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
              <span
                className={[
                  "px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider shrink-0",
                  MENU_COLORS[commit.menuUid] ?? "bg-black/10 text-black",
                ].join(" ")}
              >
                {commit.menuLabel}
              </span>
              <p className="text-paragraph-small font-medium text-black truncate">
                {commit.message}
              </p>
            </div>
            <p className="text-string-default text-black/40">
              {commit.authorEmail} · {timeAgo(commit.date)}
            </p>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <a
                href={commit.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-string-extra-small text-black/30 hover:text-black transition-colors"
              >
                {commit.shortSha}
              </a>
              {commit.deploy && (
                <span className="px-1.5 py-0.5 rounded text-string-extra-small font-medium bg-black/10 text-black">
                  {commit.deploy.state === "READY" ? "Live" : commit.deploy.state}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={loadDiff}
            className="shrink-0 text-string-default text-black/30 hover:text-black transition-colors mt-0.5"
          >
            {expanded ? "▲ Hide" : "▼ Details"}
          </button>
        </div>

        {expanded && (
          <div className="mt-3 rounded-lg border border-black/10 bg-black/[0.02] px-4 py-1">
            {loading && (
              <p className="text-string-default text-black/30 py-3 text-center">
                Loading diff…
              </p>
            )}
            {error && (
              <p className="text-string-default text-red py-3 text-center">{error}</p>
            )}
            {!loading && !error && changes?.length === 0 && (
              <p className="text-string-default text-black/30 italic py-3 text-center">
                No tracked changes detected.
              </p>
            )}
            {!loading && changes && changes.length > 0 && (
              <div>
                {changes.map((entry, i) => (
                  <DiffRow key={i} entry={entry} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </li>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ChangesPage() {
  const [commits, setCommits] = useState<GlobalCommitRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/menus/changes")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        setCommits(data.commits ?? []);
      })
      .catch(() => setError("Failed to load changes"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="font-serif text-headline-sm italic mb-2">Change Log</h1>
      <p className="text-black/50 text-sm mb-8">
        All menu publishes across every menu, with change details.
      </p>

      {loading && (
        <p className="text-paragraph-small text-black/30 text-center py-16">
          Loading…
        </p>
      )}

      {!loading && error && (
        <p className="text-paragraph-small text-red text-center py-16">{error}</p>
      )}

      {!loading && !error && commits.length === 0 && (
        <p className="text-paragraph-small text-black/30 italic text-center py-16">
          No publishes found.
        </p>
      )}

      {!loading && commits.length > 0 && (
        <ol className="flex flex-col gap-px">
          {commits.map((c, i) => (
            <CommitRow key={c.sha} commit={c} isLast={i === commits.length - 1} />
          ))}
        </ol>
      )}
    </div>
  );
}

export const metadata = {
  title: "Change Log — The Grand LB Admin",
};
