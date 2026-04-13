"use client";

import type { MenuGroup, MenuSectionData } from "@/types/menu";
import clsx from "clsx";
import { inputCls, labelCls } from "../utils/classes";
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
              <textarea
                value={group.description}
                onChange={(e) => onChange({ ...group, description: e.target.value })}
                rows={2}
                className={clsx(inputCls, "resize-y")}
                placeholder="Group description"
              />
            </div>
            <div>
              <label className={labelCls}>Group Disclaimer</label>
              <textarea
                value={group.disclaimer}
                onChange={(e) => onChange({ ...group, disclaimer: e.target.value })}
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
                i < group.sections.length - 1 ? () => moveSection(i, i + 1) : undefined
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
