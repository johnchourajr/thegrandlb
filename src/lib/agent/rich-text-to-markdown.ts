import type { RtBlock, RtSpan } from "content/types";

/**
 * Serialize a single rich-text block to Markdown, applying inline spans
 * (emphasis / strong). Spans use absolute character offsets into `text`.
 */
function blockText(block: RtBlock): string {
  const text = block.text ?? "";
  const spans = (block.spans ?? []).filter(
    (s) => s.type === "em" || s.type === "strong",
  );

  if (spans.length === 0) return text;

  // Insert markers from the end so earlier offsets stay valid.
  const markerFor = (type: RtSpan["type"]) => (type === "strong" ? "**" : "*");
  const edits = [...spans].sort((a, b) => b.start - a.start);
  let out = text;
  for (const span of edits) {
    const marker = markerFor(span.type);
    const start = Math.max(0, Math.min(span.start, out.length));
    const end = Math.max(start, Math.min(span.end, out.length));
    out = out.slice(0, start) + marker + out.slice(start, end) + marker + out.slice(end);
  }
  return out;
}

const HEADING_PREFIX: Record<string, string> = {
  heading1: "# ",
  heading2: "## ",
  heading3: "### ",
  heading4: "#### ",
  heading5: "##### ",
  heading6: "###### ",
};

/**
 * Convert a rich-text block array to Markdown. Headings become Markdown
 * headings; list items become bullets; everything else becomes a paragraph.
 */
export function richTextToMarkdown(blocks: RtBlock[] | undefined | null): string {
  if (!blocks || blocks.length === 0) return "";
  const lines: string[] = [];
  for (const block of blocks) {
    const text = blockText(block).trim();
    if (!text) continue;
    const prefix = HEADING_PREFIX[block.type];
    if (prefix) {
      lines.push(`${prefix}${text}`);
    } else if (block.type === "list-item" || block.type === "o-list-item") {
      lines.push(`- ${text}`);
    } else {
      lines.push(text);
    }
  }
  return lines.join("\n\n");
}

/** Plain-text rendering of a rich-text array (first-line oriented, no markers). */
export function richTextToPlain(blocks: RtBlock[] | undefined | null): string {
  if (!blocks || blocks.length === 0) return "";
  return blocks
    .map((b) => (b.text ?? "").trim())
    .filter(Boolean)
    .join(" ");
}
