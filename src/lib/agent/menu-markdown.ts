import type { MenuCollectionDocument, MenuItemData } from "@/types/menu";
import { richTextToMarkdown, richTextToPlain } from "./rich-text-to-markdown";

function formatPrice(item: MenuItemData): string {
  const { price_min, price_max, price_per } = item;
  if (!price_min && !price_max) return "";
  const per = price_per ? ` ${price_per}` : "";
  if (price_max && price_max !== price_min) {
    return `$${price_min}–$${price_max}${per}`;
  }
  if (price_min) return `$${price_min}${per}`;
  return "";
}

/**
 * Render a menu collection (as returned by `fetchMenuCollection`) as Markdown.
 */
export function menuCollectionToMarkdown(doc: MenuCollectionDocument): string {
  const out: string[] = [];
  const { page_title, page_description, page_disclaimer, group } = doc.data;

  out.push(`# ${page_title}`);
  if (page_description) out.push(page_description);
  if (page_disclaimer) out.push(`> ${page_disclaimer}`);

  for (const g of group) {
    const data = g.menu_link.data;
    if (data.page_title) out.push(`## ${data.page_title}`);
    const groupDesc = richTextToMarkdown(data.page_description);
    if (groupDesc) out.push(groupDesc);

    for (const section of data.body ?? []) {
      const sectionTitle = richTextToPlain(section.primary?.title);
      if (sectionTitle) out.push(`### ${sectionTitle}`);
      const sectionDesc = richTextToMarkdown(section.primary?.description);
      if (sectionDesc) out.push(sectionDesc);

      for (const item of section.items ?? []) {
        const name = richTextToPlain(item.title);
        if (!name) continue;
        const price = formatPrice(item);
        out.push(price ? `#### ${name} — ${price}` : `#### ${name}`);
        const desc = richTextToPlain(item.description);
        if (desc) out.push(desc);
      }

      const caption = richTextToMarkdown(section.primary?.caption);
      if (caption) out.push(`_${caption}_`);
    }

    const groupDisclaimer = richTextToMarkdown(data.page_disclaimer);
    if (groupDisclaimer) out.push(`> ${groupDisclaimer}`);
  }

  return out.join("\n\n") + "\n";
}
