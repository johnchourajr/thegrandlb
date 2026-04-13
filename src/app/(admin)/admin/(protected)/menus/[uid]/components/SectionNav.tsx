"use client";

import type { MenuGroup } from "@/types/menu";
import clsx from "clsx";
import { reorderBtnCls } from "../utils/classes";
import { rtRead } from "../utils/rt";

export function SectionNav({
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
                  groupVisible ? "text-black" : "text-black/40 hover:text-black",
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
