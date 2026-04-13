import type { MenuDoc } from "@/types/menu";
import { rtRead } from "./rt";

// ─── Inline word diff ─────────────────────────────────────────────────────────

export type DiffPart = { text: string; kind: "same" | "add" | "del" };

export function inlineDiff(before: string, after: string): DiffPart[] {
  const tok = (s: string) => s.match(/\S+|\s+/g) ?? (s === "" ? [] : [s]);
  const a = tok(before);
  const b = tok(after);
  const m = a.length;
  const n = b.length;

  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0),
  );
  for (let i = m - 1; i >= 0; i--)
    for (let j = n - 1; j >= 0; j--)
      dp[i][j] =
        a[i] === b[j]
          ? dp[i + 1][j + 1] + 1
          : Math.max(dp[i + 1][j], dp[i][j + 1]);

  const parts: DiffPart[] = [];
  let i = 0,
    j = 0;
  while (i < m || j < n) {
    if (i < m && j < n && a[i] === b[j]) {
      parts.push({ text: a[i], kind: "same" });
      i++;
      j++;
    } else if (j < n && (i >= m || dp[i][j + 1] >= dp[i + 1][j])) {
      parts.push({ text: b[j], kind: "add" });
      j++;
    } else {
      parts.push({ text: a[i], kind: "del" });
      i++;
    }
  }
  return parts;
}

// ─── Menu doc diff ────────────────────────────────────────────────────────────

export type ChangeKind = "modified" | "added" | "removed";

export type ChangeEntry = {
  path: string;
  before: string;
  after: string;
  kind: ChangeKind;
};

export function diffMenuDocs(
  original: MenuDoc,
  current: MenuDoc,
): ChangeEntry[] {
  const changes: ChangeEntry[] = [];

  function field(path: string, before: string, after: string) {
    if (before !== after)
      changes.push({ path, before, after, kind: "modified" });
  }

  field("Page / Title", original.page_title, current.page_title);
  field("Page / Description", original.page_description, current.page_description);
  field("Page / Disclaimer", original.page_disclaimer, current.page_disclaimer);

  const maxGroups = Math.max(original.groups.length, current.groups.length);
  for (let gi = 0; gi < maxGroups; gi++) {
    const og = original.groups[gi];
    const cg = current.groups[gi];
    const groupLabel = og?.title ?? cg?.title ?? `Group ${gi + 1}`;

    if (!og) { changes.push({ path: groupLabel, before: "", after: "(group added)", kind: "added" }); continue; }
    if (!cg) { changes.push({ path: groupLabel, before: "(group existed)", after: "", kind: "removed" }); continue; }

    field(`${groupLabel} / Description`, og.description, cg.description);
    field(`${groupLabel} / Disclaimer`, og.disclaimer, cg.disclaimer);

    const maxSections = Math.max(og.sections.length, cg.sections.length);
    for (let si = 0; si < maxSections; si++) {
      const os = og.sections[si];
      const cs = cg.sections[si];
      const sectionLabel =
        rtRead(os?.primary?.title ?? []) ||
        rtRead(cs?.primary?.title ?? []) ||
        `Section ${si + 1}`;

      if (!os) { changes.push({ path: `${groupLabel} / ${sectionLabel}`, before: "", after: "(section added)", kind: "added" }); continue; }
      if (!cs) { changes.push({ path: `${groupLabel} / ${sectionLabel}`, before: "(section existed)", after: "", kind: "removed" }); continue; }

      field(`${groupLabel} / ${sectionLabel} / Title`, rtRead(os.primary.title), rtRead(cs.primary.title));
      field(`${groupLabel} / ${sectionLabel} / Description`, rtRead(os.primary.description), rtRead(cs.primary.description));
      field(`${groupLabel} / ${sectionLabel} / Caption`, rtRead(os.primary.caption), rtRead(cs.primary.caption));

      const maxItems = Math.max(os.items.length, cs.items.length);
      for (let ii = 0; ii < maxItems; ii++) {
        const oi = os.items[ii];
        const ci = cs.items[ii];
        const itemLabel =
          rtRead(oi?.title ?? []) || rtRead(ci?.title ?? []) || `Item ${ii + 1}`;
        const itemPath = `${groupLabel} / ${sectionLabel} / ${itemLabel}`;

        if (!oi) { changes.push({ path: itemPath, before: "", after: "(item added)", kind: "added" }); continue; }
        if (!ci) { changes.push({ path: itemPath, before: "(item existed)", after: "", kind: "removed" }); continue; }

        field(`${itemPath} / Name`, rtRead(oi.title), rtRead(ci.title));
        field(`${itemPath} / Description`, rtRead(oi.description), rtRead(ci.description));
        field(`${itemPath} / Price Per`, oi.price_per, ci.price_per);
        if (oi.price_min !== ci.price_min)
          changes.push({ path: `${itemPath} / Min Price`, before: String(oi.price_min), after: String(ci.price_min), kind: "modified" });
        if (oi.price_max !== ci.price_max)
          changes.push({ path: `${itemPath} / Max Price`, before: String(oi.price_max), after: String(ci.price_max), kind: "modified" });
      }
    }
  }

  return changes;
}
