"use client";

import type { MenuGroup, MenuSectionData } from "@/types/menu";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { inputCls, labelCls } from "../utils/classes";
import { AutoTextarea } from "./AutoTextarea";
import { newSection } from "../utils/newItem";
import { SectionBlock } from "./SectionBlock";

export function GroupPanel({
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

  function removeSection(index: number) {
    const sections = group.sections.filter((_, i) => i !== index);
    onChange({ ...group, sections });
  }

  function moveSection(from: number, to: number) {
    const sections = [...group.sections];
    const [moved] = sections.splice(from, 1);
    sections.splice(to, 0, moved);
    onChange({ ...group, sections });
  }

  function addSection() {
    onChange({ ...group, sections: [...group.sections, newSection()] });
  }

  // ─── Shared group — read-only, links to shared editor ──────────────────────
  if (group._shared) {
    return (
      <div
        id={groupId}
        className="relative h-fit flex flex-col border border-black/10 rounded-xl bg-black/[0.02]"
        style={{ scrollMarginTop: "var(--scroll-offset, 9rem)" }}
      >
        <div className={clsx("sticky top-[68px] z-[5] rounded-xl bg-black/[0.02]")}>
          <div className="w-full flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-black/50 text-paragraph-default">
                {group.title}
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-black/10 text-black/40">
                Shared
              </span>
            </div>
            <a
              href="/admin/menus/shared"
              className="text-string-small font-medium text-black/40 hover:text-black underline underline-offset-2 transition-colors"
            >
              Edit shared content →
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ─── Normal editable group ──────────────────────────────────────────────────
  return (
    <div
      id={groupId}
      className="relative h-fit flex flex-col border border-black/10 rounded-xl"
      style={{ scrollMarginTop: "var(--scroll-offset, 9rem)" }}
    >
      <div
        className={clsx(
          "sticky top-[68px] z-[5] bg-white",
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
              <AutoTextarea
                value={group.description}
                onChange={(e) => onChange({ ...group, description: e.target.value })}
                className={inputCls}
                placeholder="Group description"
              />
            </div>
            <div>
              <label className={labelCls}>Group Disclaimer</label>
              <AutoTextarea
                value={group.disclaimer}
                onChange={(e) => onChange({ ...group, disclaimer: e.target.value })}
                className={inputCls}
                placeholder="Group disclaimer"
              />
            </div>
          </div>

          <AnimatePresence initial={false}>
            {group.sections.map((section, i) => {
              const stableKey = section.primary.title[0]?.text || String(i);
              return (
                <motion.div
                  key={stableKey}
                  layout
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <SectionBlock
                    sectionId={`section-${groupId}-${i}`}
                    section={section}
                    onChange={(updated) => updateSection(i, updated)}
                    onRemove={() => removeSection(i)}
                    onMoveUp={i > 0 ? () => moveSection(i, i - 1) : undefined}
                    onMoveDown={
                      i < group.sections.length - 1 ? () => moveSection(i, i + 1) : undefined
                    }
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>

          <button
            type="button"
            onClick={addSection}
            className="mt-5 w-full px-3 py-2 rounded border border-dashed border-black/20 text-string-default font-medium text-black/40 hover:border-black/40 hover:text-black/70 hover:bg-black/5 transition-colors"
          >
            + Add Section
          </button>
        </div>
      )}
    </div>
  );
}
