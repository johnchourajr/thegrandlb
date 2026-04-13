"use client";

import type {
  MenuDoc,
  MenuGroup,
  MenuItemData,
  MenuSectionData,
  RtBlock,
} from "@/types/menu";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// ─── RtBlock helpers ────────────────────────────────────────────────────────

function rtRead(blocks: RtBlock[]): string {
  return blocks[0]?.text ?? "";
}

function rtWrite(value: string, original: RtBlock[]): RtBlock[] {
  if (original.length === 0) {
    return [{ type: "paragraph", text: value, spans: [] }];
  }
  return [{ ...original[0], text: value }, ...original.slice(1)];
}

// ─── New item template ───────────────────────────────────────────────────────

function newItem(): MenuItemData {
  return {
    title: [{ type: "paragraph", text: "", spans: [] }],
    description: [{ type: "paragraph", text: "", spans: [] }],
    price_per: "per person",
    price_min: 0,
    price_max: 0,
  };
}

// ─── Shared input/textarea classes ───────────────────────────────────────────

const inputCls = clsx(
  "w-full rounded border border-black/15 bg-white px-3 py-2 text-paragraph-small text-black placeholder-black/30 focus:border-black/40 focus:outline-none focus:ring-1 focus:ring-black/20 transition-colors",
);

const labelCls = clsx(
  "block text-string-default font-medium text-black/50 mb-1",
);

// ─── Reorder controls ────────────────────────────────────────────────────────

const reorderBtnCls = clsx(
  "w-6 h-6 flex items-center justify-center rounded border border-black/10 bg-white",
  "text-black/30 text-string-small leading-none",
  "hover:text-black hover:border-black/25 disabled:opacity-0 transition-colors",
);

function ReorderControls({
  onMoveUp,
  onMoveDown,
  label,
}: {
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  label?: string;
}) {
  return (
    <div className="shrink-0 flex flex-col gap-0.5">
      {onMoveUp && (
        <button
          type="button"
          onClick={onMoveUp}
          disabled={!onMoveUp}
          className={reorderBtnCls}
          title={`Move ${label ?? "item"} up`}
        >
          ↑
        </button>
      )}
      {onMoveDown && (
        <button
          type="button"
          onClick={onMoveDown}
          disabled={!onMoveDown}
          className={reorderBtnCls}
          title={`Move ${label ?? "item"} down`}
        >
          ↓
        </button>
      )}
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function ItemRow({
  item,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  item: MenuItemData;
  onChange: (updated: MenuItemData) => void;
  onRemove: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}) {
  return (
    <div className="flex gap-2">
      <ReorderControls
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        label="item"
      />
      <div className="flex-1 min-w-0 grid gap-3 p-4 rounded-lg border border-black/10 bg-cream/30">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Item Name</label>
            <input
              type="text"
              value={rtRead(item.title)}
              onChange={(e) =>
                onChange({
                  ...item,
                  title: rtWrite(e.target.value, item.title),
                })
              }
              className={inputCls}
              placeholder="Item name"
            />
          </div>
          <div>
            <label className={labelCls}>Price Per</label>
            <input
              type="text"
              value={item.price_per}
              onChange={(e) => onChange({ ...item, price_per: e.target.value })}
              className={inputCls}
              placeholder="per person"
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>Description</label>
          <textarea
            value={rtRead(item.description)}
            onChange={(e) =>
              onChange({
                ...item,
                description: rtWrite(e.target.value, item.description),
              })
            }
            rows={2}
            className={clsx(inputCls, "resize-y")}
            placeholder="Item description"
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="w-28">
            <label className={labelCls}>Min Price ($)</label>
            <input
              type="number"
              min={0}
              step={0.01}
              value={item.price_min}
              onChange={(e) =>
                onChange({
                  ...item,
                  price_min: parseFloat(e.target.value) || 0,
                })
              }
              className={inputCls}
            />
          </div>
          <div className="w-28">
            <label className={labelCls}>Max Price ($)</label>
            <input
              type="number"
              min={0}
              step={0.01}
              value={item.price_max}
              onChange={(e) =>
                onChange({
                  ...item,
                  price_max: parseFloat(e.target.value) || 0,
                })
              }
              className={inputCls}
            />
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="mt-4 px-3 py-2 rounded border border-red/30 bg-red/5 text-string-default font-medium text-red hover:bg-red/10 transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

function SectionBlock({
  sectionId,
  section,
  onChange,
  onMoveUp,
  onMoveDown,
}: {
  sectionId: string;
  section: MenuSectionData;
  onChange: (updated: MenuSectionData) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}) {
  const sectionTitle = rtRead(section.primary.title);

  function updateItem(index: number, updated: MenuItemData) {
    const items = [...section.items];
    items[index] = updated;
    onChange({ ...section, items });
  }

  function removeItem(index: number) {
    const items = section.items.filter((_, i) => i !== index);
    onChange({ ...section, items });
  }

  function moveItem(from: number, to: number) {
    const items = [...section.items];
    const [moved] = items.splice(from, 1);
    items.splice(to, 0, moved);
    onChange({ ...section, items });
  }

  function addItem() {
    onChange({ ...section, items: [...section.items, newItem()] });
  }

  function updatePrimary(
    field: "title" | "description" | "caption",
    value: string,
  ) {
    onChange({
      ...section,
      primary: {
        ...section.primary,
        [field]: rtWrite(value, section.primary[field]),
      },
    });
  }

  return (
    <div id={sectionId} className="mt-4 scroll-mt-20 flex gap-1.5">
      <ReorderControls
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        label="section"
      />

      {/* Content with left border */}
      <div className="flex-1 min-w-0  pl-4">
        {/* Sticky section header */}
        <div className="">
          <h4 className="text-paragraph-default">
            {sectionTitle || <span className="">Untitled Section</span>}
          </h4>
        </div>

        <div className="grid gap-2 my-4">
          <div>
            <label className={labelCls}>Section Title</label>
            <input
              type="text"
              value={rtRead(section.primary.title)}
              onChange={(e) => updatePrimary("title", e.target.value)}
              className={inputCls}
              placeholder="Section title"
            />
          </div>
          <div>
            <label className={labelCls}>Section Description</label>
            <textarea
              value={rtRead(section.primary.description)}
              onChange={(e) => updatePrimary("description", e.target.value)}
              rows={2}
              className={clsx(inputCls, "resize-y")}
              placeholder="Section description"
            />
          </div>
          <div>
            <label className={labelCls}>Section Caption</label>
            <input
              type="text"
              value={rtRead(section.primary.caption)}
              onChange={(e) => updatePrimary("caption", e.target.value)}
              className={inputCls}
              placeholder="Section caption"
            />
          </div>
        </div>

        {section.items.length === 0 && (
          <p className="text-string-default text-black/30 italic">
            No items yet.
          </p>
        )}

        <div className="flex flex-col gap-3">
          {section.items.map((item, i) => (
            <ItemRow
              key={i}
              item={item}
              onChange={(updated) => updateItem(i, updated)}
              onRemove={() => removeItem(i)}
              onMoveUp={i > 0 ? () => moveItem(i, i - 1) : undefined}
              onMoveDown={
                i < section.items.length - 1
                  ? () => moveItem(i, i + 1)
                  : undefined
              }
            />
          ))}
        </div>

        <button
          type="button"
          onClick={addItem}
          className="mt-3 px-3 py-1.5 rounded border border-dashed border-black/20 text-string-default font-medium text-black/40 hover:border-black/40 hover:text-black/70 hover:bg-black/5 transition-colors"
        >
          + Add Item
        </button>
      </div>
    </div>
  );
}

function GroupPanel({
  groupId,
  group,
  open,
  onToggle,
  onChange,
}: {
  groupId: string;
  group: MenuGroup;
  open: boolean;
  onToggle: () => void;
  onChange: (updated: MenuGroup) => void;
}) {
  function updateSection(index: number, updated: MenuSectionData) {
    const sections = [...group.sections];
    sections[index] = updated;
    onChange({ ...group, sections });
  }

  function moveSection(from: number, to: number) {
    const sections = [...group.sections];
    const [moved] = sections.splice(from, 1);
    sections.splice(to, 0, moved);
    onChange({ ...group, sections });
  }

  return (
    <div
      id={groupId}
      className="scroll-mt-20 relative h-fit flex flex-col border border-black/10 rounded-xl"
    >
      {/* Sticky header — sibling to content so it spans the full group height */}
      <div
        className={clsx(
          "sticky top-20 z-[5] bg-white",
          open ? "rounded-t-xl" : "rounded-xl",
        )}
      >
        <button
          id={`${groupId}-panel-header`}
          type="button"
          onClick={onToggle}
          className={clsx(
            "w-full flex items-center justify-between px-5 py-3 text-left transition-colors hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/20",
            open ? "rounded-t-xl" : "rounded-xl",
          )}
        >
          <span className="font-semibold text-black text-paragraph-default">
            {group.title}
          </span>
          <span className="text-black/30 text-string-small select-none">
            {open ? "- Collapse" : "+ Expand"}
          </span>
        </button>
      </div>

      {open && (
        <div className="rounded-b-xl bg-white px-5 pb-5">
          <div className="mt-3 grid gap-2">
            <div>
              <label className={labelCls}>Group Description</label>
              <textarea
                value={group.description}
                onChange={(e) =>
                  onChange({ ...group, description: e.target.value })
                }
                rows={2}
                className={clsx(inputCls, "resize-y")}
                placeholder="Group description"
              />
            </div>
            <div>
              <label className={labelCls}>Group Disclaimer</label>
              <textarea
                value={group.disclaimer}
                onChange={(e) =>
                  onChange({ ...group, disclaimer: e.target.value })
                }
                rows={2}
                className={clsx(inputCls, "resize-y")}
                placeholder="Group disclaimer"
              />
            </div>
          </div>

          {group.sections.map((section, i) => (
            <SectionBlock
              key={i}
              sectionId={`section-${groupId}-${i}`}
              section={section}
              onChange={(updated) => updateSection(i, updated)}
              onMoveUp={i > 0 ? () => moveSection(i, i - 1) : undefined}
              onMoveDown={
                i < group.sections.length - 1
                  ? () => moveSection(i, i + 1)
                  : undefined
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Toast ───────────────────────────────────────────────────────────────────

type ToastState = { type: "success" | "error"; message: string } | null;

function Toast({
  toast,
  onDismiss,
}: {
  toast: ToastState;
  onDismiss: () => void;
}) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <div
      className={clsx(
        "fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg px-4 py-3 text-paragraph-small font-medium shadow-lg transition-all",
        toast.type === "success" ? "bg-black text-white" : "bg-red text-white",
      )}
    >
      <span>{toast.message}</span>
      <button
        type="button"
        onClick={onDismiss}
        className="opacity-60 hover:opacity-100 transition-opacity text-string-small"
      >
        ✕
      </button>
    </div>
  );
}

// ─── Sidebar nav ─────────────────────────────────────────────────────────────

function SectionNav({
  groups,
  visibleIds,
  openGroups,
  onToggleGroup,
  onGroupNavigate,
  onSelect,
}: {
  groups: MenuGroup[];
  visibleIds: Set<string>;
  openGroups: Set<number>;
  onToggleGroup: (groupIndex: number) => void;
  onGroupNavigate: (groupIndex: number) => void;
  onSelect: (id: string) => void;
}) {
  return (
    <nav className="text-paragraph-default">
      <p className="text-string-extra-small font-medium uppercase tracking-widest text-black/50 mb-3">
        Sections
      </p>
      {groups.map((group, gi) => {
        const gid = `group-${gi}`;
        const groupVisible = visibleIds.has(gid);
        const expanded = openGroups.has(gi);
        return (
          <div key={gi} className="mb-4">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onGroupNavigate(gi)}
                className={clsx(
                  "min-w-0 flex-1 truncate rounded py-1 text-left text-string-default font-semibold uppercase tracking-wide transition-colors",
                  groupVisible
                    ? "text-black"
                    : "text-black/40 hover:text-black",
                )}
              >
                {group.title}
              </button>
              <button
                type="button"
                aria-expanded={expanded}
                aria-label={expanded ? "Collapse group" : "Expand group"}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleGroup(gi);
                }}
                className={reorderBtnCls}
              >
                <span aria-hidden className="select-none">
                  {expanded ? "−" : "+"}
                </span>
              </button>
            </div>
            {expanded && (
              <div className="mt-0.5 flex flex-col gap-0.5">
                {group.sections.map((section, si) => {
                  const id = `section-group-${gi}-${si}`;
                  const title = rtRead(section.primary.title) || "(untitled)";
                  const visible = visibleIds.has(id);
                  return (
                    <button
                      key={si}
                      type="button"
                      onClick={() => onSelect(id)}
                      className={clsx(
                        "truncate rounded px-2 py-1 text-left text-paragraph-small transition-colors",
                        visible
                          ? "bg-black/10 font-medium text-black"
                          : "text-black/35 hover:text-black",
                      )}
                      title={title}
                    >
                      {title}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

// ─── Mobile jump select ───────────────────────────────────────────────────────

function MobileJumpSelect({
  groups,
  onSelect,
}: {
  groups: MenuGroup[];
  onSelect: (id: string) => void;
}) {
  return (
    <div className="lg:hidden mb-6">
      <select
        defaultValue=""
        onChange={(e) => {
          if (e.target.value) onSelect(e.target.value);
        }}
        className="w-full rounded border border-black/15 bg-white px-3 py-2 text-paragraph-small text-black focus:outline-none focus:border-black/40"
      >
        <option value="" disabled>
          Jump to section…
        </option>
        {groups.map((group, gi) => (
          <optgroup key={gi} label={group.title}>
            {group.sections.map((section, si) => {
              const id = `section-group-${gi}-${si}`;
              const title = rtRead(section.primary.title) || "(untitled)";
              return (
                <option key={si} value={id}>
                  {title}
                </option>
              );
            })}
          </optgroup>
        ))}
      </select>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function MenuEditorPage() {
  const { uid } = useParams<{ uid: string }>();
  const [doc, setDoc] = useState<MenuDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);
  const [openGroups, setOpenGroups] = useState<Set<number>>(new Set([0]));
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/admin/menus/${uid}`);
        if (!res.ok) throw new Error(`Failed to load menu (${res.status})`);
        const data: MenuDoc = await res.json();
        setDoc(data);
        setOpenGroups(new Set([0]));
      } catch (err) {
        setLoadError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    load();
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

    // Observe after a tick so the DOM has rendered open groups
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
      setToast({ type: "success", message: "Menu saved." });
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
    <>
      {/* Sticky page header */}
      <div className="sticky top-0 z-20 bg-cream/95 backdrop-blur py-3 -mt-8 border-b border-black/10 mb-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <a
              href="/admin"
              className="text-string-default text-black/40 hover:text-black transition-colors mb-1.5 inline-block"
            >
              ← Menus
            </a>
            <h1 className="font-serif text-2xl italic text-black">
              {doc.page_title || uid}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="shrink-0 px-5 py-2.5 rounded-lg bg-black text-white text-paragraph-small font-semibold hover:bg-black/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex gap-10">
        {/* Sidebar */}
        <aside className="hidden lg:block w-48 shrink-0">
          <div className="sticky top-24">
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
    </>
  );
}
