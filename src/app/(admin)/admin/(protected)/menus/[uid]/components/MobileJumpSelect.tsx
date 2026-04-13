"use client";

import type { MenuGroup } from "@/types/menu";
import { rtRead } from "../utils/rt";

export function MobileJumpSelect({
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
