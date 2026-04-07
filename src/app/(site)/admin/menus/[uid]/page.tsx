"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { MenuDoc, MenuGroup, MenuSectionData, MenuItemData, RtBlock } from "@/types/menu";

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

// ─── Sub-components ──────────────────────────────────────────────────────────

function ItemRow({
  item,
  onChange,
  onRemove,
}: {
  item: MenuItemData;
  onChange: (updated: MenuItemData) => void;
  onRemove: () => void;
}) {
  return (
    <div className="grid gap-3 p-4 rounded-lg border border-neutral-200 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-neutral-500 mb-1">
            Item Name
          </label>
          <input
            type="text"
            value={rtRead(item.title)}
            onChange={(e) =>
              onChange({ ...item, title: rtWrite(e.target.value, item.title) })
            }
            className="w-full rounded border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
            placeholder="Item name"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-neutral-500 mb-1">
            Price Per
          </label>
          <input
            type="text"
            value={item.price_per}
            onChange={(e) => onChange({ ...item, price_per: e.target.value })}
            className="w-full rounded border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
            placeholder="per person"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-neutral-500 mb-1">
          Description
        </label>
        <textarea
          value={rtRead(item.description)}
          onChange={(e) =>
            onChange({
              ...item,
              description: rtWrite(e.target.value, item.description),
            })
          }
          rows={2}
          className="w-full rounded border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 resize-y"
          placeholder="Item description"
        />
      </div>

      <div className="flex items-end gap-3">
        <div className="flex-1">
          <label className="block text-xs font-medium text-neutral-500 mb-1">
            Min Price ($)
          </label>
          <input
            type="number"
            min={0}
            step={0.01}
            value={item.price_min}
            onChange={(e) =>
              onChange({ ...item, price_min: parseFloat(e.target.value) || 0 })
            }
            className="w-full rounded border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-medium text-neutral-500 mb-1">
            Max Price ($)
          </label>
          <input
            type="number"
            min={0}
            step={0.01}
            value={item.price_max}
            onChange={(e) =>
              onChange({ ...item, price_max: parseFloat(e.target.value) || 0 })
            }
            className="w-full rounded border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
          />
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="mb-0.5 px-3 py-2 rounded border border-red-200 bg-red-50 text-xs font-medium text-red-600 hover:bg-red-100 hover:border-red-300 transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

function SectionBlock({
  section,
  onChange,
}: {
  section: MenuSectionData;
  onChange: (updated: MenuSectionData) => void;
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

  function addItem() {
    onChange({ ...section, items: [...section.items, newItem()] });
  }

  function updatePrimary(field: "description" | "caption", value: string) {
    onChange({
      ...section,
      primary: {
        ...section.primary,
        [field]: rtWrite(value, section.primary[field]),
      },
    });
  }

  return (
    <div className="mt-6">
      <h4 className="text-sm font-semibold text-neutral-700 uppercase tracking-wide mb-3">
        {sectionTitle || <span className="italic text-neutral-400">Untitled Section</span>}
      </h4>

      <div className="grid gap-3 mb-4">
        <div>
          <label className="block text-xs font-medium text-neutral-500 mb-1">
            Section Description
          </label>
          <textarea
            value={rtRead(section.primary.description)}
            onChange={(e) => updatePrimary("description", e.target.value)}
            rows={2}
            className="w-full rounded border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 resize-y"
            placeholder="Section description"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-neutral-500 mb-1">
            Section Caption
          </label>
          <input
            type="text"
            value={rtRead(section.primary.caption)}
            onChange={(e) => updatePrimary("caption", e.target.value)}
            className="w-full rounded border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
            placeholder="Section caption"
          />
        </div>
      </div>

      {section.items.length === 0 && (
        <p className="text-xs text-neutral-400 italic mb-3">No items yet.</p>
      )}

      <div className="flex flex-col gap-3">
        {section.items.map((item, i) => (
          <ItemRow
            key={i}
            item={item}
            onChange={(updated) => updateItem(i, updated)}
            onRemove={() => removeItem(i)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={addItem}
        className="mt-3 px-4 py-2 rounded border border-dashed border-neutral-300 text-xs font-medium text-neutral-500 hover:border-neutral-400 hover:text-neutral-700 hover:bg-neutral-50 transition-colors w-full"
      >
        + Add Item
      </button>
    </div>
  );
}

function GroupPanel({
  group,
  onChange,
}: {
  group: MenuGroup;
  onChange: (updated: MenuGroup) => void;
}) {
  const [open, setOpen] = useState(true);

  function updateSection(index: number, updated: MenuSectionData) {
    const sections = [...group.sections];
    sections[index] = updated;
    onChange({ ...group, sections });
  }

  return (
    <div className="rounded-xl border border-neutral-200 bg-neutral-50 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-neutral-100 transition-colors"
      >
        <span className="font-semibold text-neutral-900">{group.title}</span>
        <span className="text-neutral-400 text-xs select-none">
          {open ? "▲ Collapse" : "▼ Expand"}
        </span>
      </button>

      {open && (
        <div className="px-6 pb-6 border-t border-neutral-200">
          <div className="mt-4 grid gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-1">
                Group Description
              </label>
              <textarea
                value={group.description}
                onChange={(e) =>
                  onChange({ ...group, description: e.target.value })
                }
                rows={2}
                className="w-full rounded border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 resize-y"
                placeholder="Group description"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-1">
                Group Disclaimer
              </label>
              <textarea
                value={group.disclaimer}
                onChange={(e) =>
                  onChange({ ...group, disclaimer: e.target.value })
                }
                rows={2}
                className="w-full rounded border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 resize-y"
                placeholder="Group disclaimer"
              />
            </div>
          </div>

          {group.sections.map((section, i) => (
            <SectionBlock
              key={i}
              section={section}
              onChange={(updated) => updateSection(i, updated)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Toast ───────────────────────────────────────────────────────────────────

type ToastState = { type: "success" | "error"; message: string } | null;

function Toast({ toast, onDismiss }: { toast: ToastState; onDismiss: () => void }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium shadow-lg transition-all ${
        toast.type === "success"
          ? "bg-green-600 text-white"
          : "bg-red-600 text-white"
      }`}
    >
      <span>{toast.message}</span>
      <button
        type="button"
        onClick={onDismiss}
        className="opacity-70 hover:opacity-100 transition-opacity text-xs"
      >
        ✕
      </button>
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

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/admin/menus/${uid}`);
        if (!res.ok) throw new Error(`Failed to load menu (${res.status})`);
        const data: MenuDoc = await res.json();
        setDoc(data);
      } catch (err) {
        setLoadError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [uid]);

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
      setToast({ type: "success", message: "Menu saved successfully." });
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

  // ── Render states ──

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-neutral-400 text-sm">
        Loading menu…
      </div>
    );
  }

  if (loadError || !doc) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <p className="text-red-500 text-sm font-medium">
          {loadError ?? "Menu not found."}
        </p>
        <a href="/admin" className="text-xs text-neutral-400 hover:text-white underline">
          ← Back to admin
        </a>
      </div>
    );
  }

  return (
    <>
      {/* Header row */}
      <div className="flex items-start justify-between gap-4 mb-8 sticky top-0 z-10 bg-neutral-950/95 backdrop-blur py-4 -mt-4 -mx-6 px-6 border-b border-neutral-800">
        <div>
          <a
            href="/admin"
            className="text-xs text-neutral-500 hover:text-white transition-colors mb-1 inline-block"
          >
            ← Menus
          </a>
          <h1 className="text-xl font-semibold tracking-tight text-white">
            {doc.page_title || uid}
          </h1>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="shrink-0 px-5 py-2.5 rounded-lg bg-white text-neutral-900 text-sm font-semibold hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </div>

      {/* Page-level meta fields */}
      <div className="mb-8 grid gap-4 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
          Page Meta
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-neutral-400 mb-1">
              Page Title
            </label>
            <input
              type="text"
              value={doc.page_title}
              onChange={(e) => setDoc({ ...doc, page_title: e.target.value })}
              className="w-full rounded border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white placeholder-neutral-500 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-400 mb-1">
              Page Description
            </label>
            <input
              type="text"
              value={doc.page_description}
              onChange={(e) =>
                setDoc({ ...doc, page_description: e.target.value })
              }
              className="w-full rounded border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white placeholder-neutral-500 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-neutral-400 mb-1">
            Page Disclaimer
          </label>
          <textarea
            value={doc.page_disclaimer}
            onChange={(e) =>
              setDoc({ ...doc, page_disclaimer: e.target.value })
            }
            rows={2}
            className="w-full rounded border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white placeholder-neutral-500 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 resize-y"
          />
        </div>
      </div>

      {/* Groups */}
      <div className="flex flex-col gap-4">
        {doc.groups.map((group, i) => (
          <GroupPanel
            key={i}
            group={group}
            onChange={(updated) => updateGroup(i, updated)}
          />
        ))}
      </div>

      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </>
  );
}
