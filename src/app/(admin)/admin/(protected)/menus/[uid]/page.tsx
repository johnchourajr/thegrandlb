"use client";

import type { MenuDoc, MenuGroup } from "@/types/menu";
import clsx from "clsx";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { DeployStatusBanner } from "./components/DeployStatusBanner";
import { DraftBanner } from "./components/DraftBanner";
import { GroupPanel } from "./components/GroupPanel";
import { HistoryPanel } from "./components/HistoryPanel";
import { MobileJumpSelect } from "./components/MobileJumpSelect";
import { ReviewModal } from "./components/ReviewModal";
import { SectionNav } from "./components/SectionNav";
import type { ToastState } from "./components/Toast";
import { Toast } from "./components/Toast";
import { inputCls, labelCls } from "./utils/classes";
import { diffMenuDocs } from "./utils/diff";

export default function MenuEditorPage() {
  const { uid } = useParams<{ uid: string }>();
  const [doc, setDoc] = useState<MenuDoc | null>(null);
  const originalDoc = useRef<MenuDoc | null>(null);
  const publishedJson = useRef<string>("");
  const stickyHeaderRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(144);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [deployCommitSha, setDeployCommitSha] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState>(null);
  const [openGroups, setOpenGroups] = useState<Set<number>>(new Set([0]));
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());
  const [draftDoc, setDraftDoc] = useState<MenuDoc | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/admin/menus/${uid}`);
        if (!res.ok) throw new Error(`Failed to load menu (${res.status})`);
        const data: MenuDoc = await res.json();
        setDoc(data);
        originalDoc.current = data;
        publishedJson.current = JSON.stringify(data);
        setOpenGroups(new Set());

        // Check sessionStorage for an unsaved draft from a previous session
        const saved = sessionStorage.getItem(`menu-draft-${uid}`);
        if (saved && saved !== publishedJson.current) {
          try {
            setDraftDoc(JSON.parse(saved));
          } catch {
            sessionStorage.removeItem(`menu-draft-${uid}`);
          }
        }
      } catch (err) {
        setLoadError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [uid]);

  // Measure sticky header height and expose as a CSS custom property
  useEffect(() => {
    const el = stickyHeaderRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScrollOffset(Math.round(entry.contentRect.height) + 16);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Persist draft to sessionStorage whenever doc changes
  useEffect(() => {
    if (!doc) return;
    const currentJson = JSON.stringify(doc);
    if (currentJson !== publishedJson.current) {
      sessionStorage.setItem(`menu-draft-${uid}`, currentJson);
    } else {
      sessionStorage.removeItem(`menu-draft-${uid}`);
    }
  }, [doc, uid]);

  // Warn before browser close/refresh when there are unsaved changes
  useEffect(() => {
    if (!doc) return;
    const isDirty = JSON.stringify(doc) !== publishedJson.current;
    if (!isDirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [doc]);

  const handleRestoreDraft = useCallback(() => {
    if (draftDoc) {
      setDoc(draftDoc);
      setDraftDoc(null);
    }
  }, [draftDoc]);

  const handleDiscardDraft = useCallback(() => {
    sessionStorage.removeItem(`menu-draft-${uid}`);
    setDraftDoc(null);
  }, [uid]);

  // Track which groups/sections are currently visible in the viewport
  useEffect(() => {
    if (!doc) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleIds((prev) => {
          const next = new Set(prev);
          for (const entry of entries) {
            if (entry.isIntersecting) {
              next.add(entry.target.id);
            } else {
              next.delete(entry.target.id);
            }
          }
          return next;
        });
      },
      { rootMargin: "-80px 0px -20% 0px", threshold: 0.1 },
    );

    const t = setTimeout(() => {
      doc.groups.forEach((group, gi) => {
        const groupEl = document.getElementById(`group-${gi}`);
        if (groupEl) observer.observe(groupEl);
        group.sections.forEach((_, si) => {
          const sectionEl = document.getElementById(
            `section-group-${gi}-${si}`,
          );
          if (sectionEl) observer.observe(sectionEl);
        });
      });
    }, 100);

    return () => {
      clearTimeout(t);
      observer.disconnect();
    };
  }, [doc, openGroups]);

  function scrollToId(id: string) {
    const sectionMatch = id.match(/^section-group-(\d+)-/);
    if (sectionMatch) {
      const gi = parseInt(sectionMatch[1]);
      setOpenGroups((prev) => new Set([...prev, gi]));
    }
    setTimeout(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  function toggleGroupOpen(groupIndex: number) {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      next.has(groupIndex) ? next.delete(groupIndex) : next.add(groupIndex);
      return next;
    });
  }

  function navigateToGroupFromSidebar(groupIndex: number) {
    const gid = `group-${groupIndex}`;
    const expanding = !openGroups.has(groupIndex);
    setOpenGroups((prev) => new Set([...prev, groupIndex]));
    const run = () => {
      const root = document.getElementById(gid);
      const headerBtn = document.getElementById(
        `${gid}-panel-header`,
      ) as HTMLButtonElement | null;
      root?.scrollIntoView({ behavior: "smooth", block: "start" });
      headerBtn?.focus({ preventScroll: true });
    };
    if (expanding) {
      requestAnimationFrame(() => {
        requestAnimationFrame(run);
      });
    } else {
      setTimeout(run, 0);
    }
  }

  async function handleSave() {
    if (!doc) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/menus/${uid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doc),
      });
      if (!res.ok) {
        const body = await res.text();
        throw new Error(body || `Save failed (${res.status})`);
      }
      const result = await res.json();
      originalDoc.current = doc;
      publishedJson.current = JSON.stringify(doc);
      sessionStorage.removeItem(`menu-draft-${uid}`);
      setDeployCommitSha(result.commit ?? null);
      setShowReview(false);
      setToast({
        type: "success",
        message:
          "Published! Updates are deploying and should be live in a few minutes.",
      });
    } catch (err) {
      setToast({
        type: "error",
        message: err instanceof Error ? err.message : "Save failed.",
      });
    } finally {
      setSaving(false);
    }
  }

  function updateGroup(index: number, updated: MenuGroup) {
    if (!doc) return;
    const groups = [...doc.groups];
    groups[index] = updated;
    setDoc({ ...doc, groups });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-black/30 text-paragraph-small">
        Loading menu…
      </div>
    );
  }

  if (loadError || !doc) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <p className="text-red text-paragraph-small font-medium">
          {loadError ?? "Menu not found."}
        </p>
        <a
          href="/admin"
          className="text-string-default text-black/40 hover:text-black underline"
        >
          ← Back to admin
        </a>
      </div>
    );
  }

  return (
    <div
      style={{ "--scroll-offset": `${scrollOffset}px` } as React.CSSProperties}
    >
      {/* Sticky page header */}
      <div
        ref={stickyHeaderRef}
        className="sticky top-0 z-20 bg-cream/95 backdrop-blur py-3 -mt-3 border-b border-black/10 mb-6"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="font-serif text-headline-sm italic text-black/40 hover:text-black transition-colors inline-block"
            >
              Menus
            </Link>
            <span className="text-string-default text-black/40">/</span>
            <h1 className="font-serif text-headline-sm italic text-black">
              {doc.page_title || uid}
            </h1>
            {uid !== "shared" && (
              <a
                href={`https://thegrandlb.com/menus/${uid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/30 hover:text-black transition-colors"
                title="View live menu"
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
                  <path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            )}
          </div>
          <div className="flex items-center gap-2">
            <DeployStatusBanner uid={uid} commitSha={deployCommitSha} />
            <button
              type="button"
              onClick={() => setShowHistory(true)}
              className="shrink-0 px-4 py-2.5 rounded-lg border border-black/15 text-paragraph-small font-medium text-black/60 hover:text-black hover:border-black/30 transition-colors"
            >
              History
            </button>
            <button
              type="button"
              onClick={() => setShowReview(true)}
              className="shrink-0 px-5 py-2.5 rounded-lg bg-black text-white text-paragraph-small font-semibold hover:bg-black/80 transition-colors"
            >
              Review Changes
            </button>
          </div>
        </div>
      </div>

      {draftDoc && (
        <DraftBanner
          onRestore={handleRestoreDraft}
          onDiscard={handleDiscardDraft}
        />
      )}

      {/* Two-column layout */}
      <div className="flex gap-10">
        {/* Sidebar */}
        <aside className="hidden lg:block w-48 shrink-0">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-1">
            <SectionNav
              groups={doc.groups}
              visibleIds={visibleIds}
              openGroups={openGroups}
              onToggleGroup={toggleGroupOpen}
              onGroupNavigate={navigateToGroupFromSidebar}
              onSelect={scrollToId}
            />
          </div>
        </aside>

        {/* Content */}
        <div className="flex flex-col flex-1 gap-4">
          <MobileJumpSelect groups={doc.groups} onSelect={scrollToId} />

          {/* Page meta */}
          {uid !== "shared" && (
            <div className="grid gap-3 rounded-xl border border-black/10 bg-white p-6">
              <h2 className="text-string-extra-small font-semibold uppercase tracking-widest text-black/40">
                Page Meta
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Page Title</label>
                  <input
                    type="text"
                    value={doc.page_title}
                    onChange={(e) =>
                      setDoc({ ...doc, page_title: e.target.value })
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Page Description</label>
                  <input
                    type="text"
                    value={doc.page_description}
                    onChange={(e) =>
                      setDoc({ ...doc, page_description: e.target.value })
                    }
                    className={inputCls}
                  />
                </div>
              </div>
              <div>
                <label className={labelCls}>Page Disclaimer</label>
                <textarea
                  value={doc.page_disclaimer}
                  onChange={(e) =>
                    setDoc({ ...doc, page_disclaimer: e.target.value })
                  }
                  rows={2}
                  className={clsx(inputCls, "resize-y")}
                />
              </div>
            </div>
          )}

          {/* Groups */}
          <div className="flex flex-col gap-2">
            {doc.groups.map((group, i) => (
              <GroupPanel
                key={i}
                groupId={`group-${i}`}
                group={group}
                open={openGroups.has(i)}
                onToggle={() =>
                  setOpenGroups((prev) => {
                    const next = new Set(prev);
                    next.has(i) ? next.delete(i) : next.add(i);
                    return next;
                  })
                }
                onChange={(updated) => updateGroup(i, updated)}
              />
            ))}
          </div>
        </div>
      </div>

      <Toast toast={toast} onDismiss={() => setToast(null)} />

      {showReview && (
        <ReviewModal
          changes={diffMenuDocs(originalDoc.current ?? doc, doc)}
          saving={saving}
          onConfirm={handleSave}
          onCancel={() => setShowReview(false)}
        />
      )}

      <HistoryPanel
        uid={uid}
        open={showHistory}
        onClose={() => setShowHistory(false)}
      />
    </div>
  );
}
