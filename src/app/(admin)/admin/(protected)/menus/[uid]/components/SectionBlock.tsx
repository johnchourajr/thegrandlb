"use client";

import type { MenuItemData, MenuSectionData } from "@/types/menu";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { inputCls, labelCls } from "../utils/classes";
import { newItem } from "../utils/newItem";
import { rtRead, rtWrite } from "../utils/rt";
import { ItemRow } from "./ItemRow";
import { ReorderControls } from "./ReorderControls";

export function SectionBlock({
  sectionId,
  section,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  sectionId: string;
  section: MenuSectionData;
  onChange: (updated: MenuSectionData) => void;
  onRemove?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}) {
  const [confirmingRemove, setConfirmingRemove] = useState(false);
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
    <div
      id={sectionId}
      className="my-4 py-4 border-t border-primary/10 flex gap-1.5 scroll-mt-[var(--scroll-offset,9rem)]"
    >
      <ReorderControls
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        label="section"
      />

      <div className="flex-1 min-w-0 pl-4">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h4 className="text-paragraph-default">
            {sectionTitle || (
              <span className="text-black/30">Untitled Section</span>
            )}
          </h4>

          {onRemove && (
            <button
              type="button"
              onClick={() => {
                if (confirmingRemove) {
                  onRemove();
                } else {
                  setConfirmingRemove(true);
                }
              }}
              onBlur={() => setConfirmingRemove(false)}
              className={clsx(
                "shrink-0 px-3 py-1 rounded border text-string-default font-medium transition-colors",
                confirmingRemove
                  ? "border-red bg-red text-white hover:bg-red/80"
                  : "border-red/30 bg-red/5 text-red hover:bg-red/10",
              )}
            >
              {confirmingRemove
                ? "Confirm removal"
                : `Remove "${sectionTitle || "Untitled Section"}"`}
            </button>
          )}
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
          <AnimatePresence initial={false}>
            {section.items.map((item, i) => {
              const stableKey = item.title[0]?.text || String(i);
              return (
                <motion.div
                  key={stableKey}
                  layout
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <ItemRow
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
                </motion.div>
              );
            })}
          </AnimatePresence>
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
