"use client";

import { useEffect, useState } from "react";
import type { GlobalCommitRecord } from "@/app/(site)/api/admin/menus/changes/route";
import type { ChangeEntry } from "@/app/(admin)/admin/(protected)/menus/[uid]/utils/diff";
import { inlineDiff } from "@/app/(admin)/admin/(protected)/menus/[uid]/utils/diff";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60_000);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  if (days === 0 && hrs === 0 && mins < 2) return "Just now";
  if (days === 0 && hrs === 0) return `${mins} minute${mins !== 1 ? "s" : ""} ago`;
  if (days === 0) return `${hrs} hour${hrs !== 1 ? "s" : ""} ago`;
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function firstName(email: string, name: string): string {
  if (name && name.trim()) return name.split(" ")[0];
  return email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// "Classic Packages / Lunch and Dinner Packages / The Ruby / Min Price"
// → breadcrumb with last segment highlighted
function PathBreadcrumb({ path }: { path: string }) {
  const parts = path.split(" / ");
  const last = parts[parts.length - 1];
  const crumbs = parts.slice(0, -1);
  return (
    <p className="text-string-default text-black/30 mb-1">
      {crumbs.map((c, i) => (
        <span key={i}>{c} <span className="opacity-40">/</span> </span>
      ))}
      <span className="font-semibold text-black/60">{last}</span>
    </p>
  );
}

// ─── Diff row ─────────────────────────────────────────────────────────────────

function DiffRow({ entry }: { entry: ChangeEntry }) {
  const parts = entry.kind === "modified" ? inlineDiff(entry.before, entry.after) : null;

  return (
    <div className="py-3 border-b border-black/5 last:border-0">
      <PathBreadcrumb path={entry.path} />
      {entry.kind === "added" && (
        <p className="text-string-default text-green-700 bg-green-50 rounded px-2.5 py-1.5">
          Added: {entry.after}
        </p>
      )}
      {entry.kind === "removed" && (
        <p className="text-string-default text-red bg-red/5 rounded px-2.5 py-1.5 line-through">
          {entry.before}
        </p>
      )}
      {entry.kind === "modified" && parts && (
        <p className="text-string-default leading-relaxed break-words">
          {parts.map((p, i) =>
            p.kind === "same" ? (
              <span key={i} className="text-black/60">{p.text}</span>
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

function CommitRow({ commit, isLast }: { commit: GlobalCommitRecord; isLast: boolean }) {
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
        `/api/admin/menus/changes/${commit.sha}?uid=${commit.menuUid}`,
        { cache: "no-store" }
      );
      const data = await res.json();
      if (data.error) setError(data.error);
      else setChanges(data.changes ?? []);
    } catch {
      setError("Something went wrong loading the details.");
    } finally {
      setLoading(false);
    }
  }

  const author = firstName(commit.authorEmail, commit.authorName);
  const changeCount = changes?.length ?? null;

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
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-black/10 text-black shrink-0">
                {commit.menuLabel}
              </span>
              <p className="text-paragraph-small font-medium text-black">
                {commit.menuLabel} menu updated
              </p>
            </div>
            <p className="text-string-default text-black/40">
              Published by {author} · {formatDate(commit.date)}
            </p>
            {commit.deploy && (
              <p className="text-string-extra-small text-black/30 mt-0.5">
                {commit.deploy.state === "READY"
                  ? "Changes are live"
                  : commit.deploy.state === "BUILDING"
                  ? "Deploying now…"
                  : commit.deploy.state === "ERROR"
                  ? "Deploy failed"
                  : null}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={loadDiff}
            className="shrink-0 text-string-default text-black/40 hover:text-black underline underline-offset-2 transition-colors mt-0.5 whitespace-nowrap"
          >
            {expanded ? "Hide details" : changeCount !== null ? `${changeCount} change${changeCount !== 1 ? "s" : ""}` : "See what changed"}
          </button>
        </div>

        {expanded && (
          <div className="mt-3 rounded-lg border border-black/10 bg-black/[0.02] px-4 py-1">
            {loading && (
              <p className="text-string-default text-black/30 py-4 text-center">
                Loading changes…
              </p>
            )}
            {error && (
              <p className="text-string-default text-red py-4 text-center">{error}</p>
            )}
            {!loading && !error && changes?.length === 0 && (
              <p className="text-string-default text-black/40 italic py-4 text-center">
                No content changes recorded for this publish.
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

export function ChangesClient() {
  const [commits, setCommits] = useState<GlobalCommitRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/menus/changes", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        setCommits(data.commits ?? []);
      })
      .catch(() => setError("Couldn't load the change log. Try refreshing the page."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="font-serif text-headline-sm italic mb-2">Change Log</h1>
      <p className="text-black/50 text-sm mb-8">
        A history of every menu update — who made it, when, and exactly what changed.
      </p>

      {loading && (
        <p className="text-paragraph-small text-black/30 text-center py-16">
          Loading history…
        </p>
      )}

      {!loading && error && (
        <p className="text-paragraph-small text-red text-center py-16">{error}</p>
      )}

      {!loading && !error && commits.length === 0 && (
        <p className="text-paragraph-small text-black/40 italic text-center py-16">
          No menu updates have been published yet.
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
