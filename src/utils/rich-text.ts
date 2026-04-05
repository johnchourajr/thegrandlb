import type { RtBlock } from "content/types";

/**
 * Extract plain text from a rich text field (RtBlock[]) or a plain string/number.
 */
export function toText(field: unknown): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (typeof field === "number") return String(field);
  if (Array.isArray(field)) {
    return field
      .map((block: unknown) => {
        if (block && typeof block === "object" && !Array.isArray(block)) {
          const text = (block as Record<string, unknown>).text;
          return typeof text === "string" ? text : "";
        }
        return "";
      })
      .join(" ")
      .trim();
  }
  return "";
}

/**
 * Convert a rich text field to a simple HTML string (for use in JSON-LD, meta tags, etc.).
 */
export function toHtml(field: unknown): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (Array.isArray(field)) {
    return field
      .map((block) => {
        if (!block || typeof block !== "object") return "";
        const b = block as RtBlock;
        const text = (b.text || "")
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
        switch (b.type) {
          case "paragraph":
            return `<p>${text}</p>`;
          case "heading1":
            return `<h1>${text}</h1>`;
          case "heading2":
            return `<h2>${text}</h2>`;
          case "heading3":
            return `<h3>${text}</h3>`;
          case "heading4":
            return `<h4>${text}</h4>`;
          case "heading5":
            return `<h5>${text}</h5>`;
          case "heading6":
            return `<h6>${text}</h6>`;
          case "list-item":
            return `<li>${text}</li>`;
          case "o-list-item":
            return `<li>${text}</li>`;
          case "preformatted":
            return `<pre>${text}</pre>`;
          default:
            return text;
        }
      })
      .join("\n");
  }
  return "";
}
