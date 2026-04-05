/**
 * Content Cleanup Script
 *
 * Removes Prismic artifacts from static content files:
 *   - Flattens slice.primary.* → slice.*
 *   - Removes empty items: [{}]
 *   - Replaces { link_type: "Any" } / { link_type: "Media" } → null
 *   - Converts simple Document links to Web links (resolved paths)
 *   - Strips gallery fragment document wrappers (keeps data.gallery_items)
 *   - Removes Prismic image metadata (id, edit, copyright)
 *   - Removes null / empty top-level page fields
 *   - Renames slice_type → type, removes slice id
 *   - Converts rich-text-array fields that are always used as plain text → string
 *
 * Run: npx tsx scripts/cleanup-content.ts
 */

import * as fs from "fs";
import * as path from "path";

// ─── Link resolver ──────────────────────────────────────────────────────────

function resolveDocumentLink(link: {
  type?: string;
  uid?: string;
}): { link_type: "Web"; url: string } | null {
  const { type, uid } = link;
  if (!uid && !type) return null;

  let url: string;
  if (uid === "home") {
    url = "/";
  } else if (type === "tour_page") {
    url = `/tour/${uid}`;
  } else if (type === "event_page") {
    url = `/events/${uid}`;
  } else if (type === "menu_page") {
    url = `/menus/${uid}`;
  } else if (type === "offsite_page") {
    url = `/offsite/${uid}`;
  } else if (type === "tour_index_page") {
    url = "/tour";
  } else if (type === "event_index_page") {
    url = "/events";
  } else if (type === "offsite_index_page") {
    url = "/offsite";
  } else if (type === "inquire_page") {
    url = "/inquire";
  } else {
    url = `/${uid}`;
  }

  return { link_type: "Web", url };
}

// ─── Value transformer ──────────────────────────────────────────────────────

/**
 * Fields that should remain as rich-text arrays (used with PrismicRichText).
 * All others will be transformed recursively.
 */
const KEEP_AS_RICH_TEXT = new Set([
  "text",       // LongformTextSection
  "question",   // FaqSection items
  "answer",     // FaqSection items
  "address",    // HomepageLocation
  "body",       // NumberItem (has hyperlinks), NumbersSection items
  "number",     // NumberItem
]);

function isImageObj(v: unknown): boolean {
  if (!v || typeof v !== "object" || Array.isArray(v)) return false;
  const obj = v as Record<string, unknown>;
  return typeof obj.url === "string" && obj.link_type === undefined && obj.dimensions !== undefined;
}

function isEmptyImageObj(v: unknown): boolean {
  if (!v || typeof v !== "object" || Array.isArray(v)) return false;
  const obj = v as Record<string, unknown>;
  const keys = Object.keys(obj);
  return keys.length === 0 || (keys.every((k) => obj[k] === null || obj[k] === undefined) && !obj.url);
}

function cleanImage(img: Record<string, unknown>): Record<string, unknown> | null {
  if (!img.url) return null;
  const { id: _id, edit: _edit, copyright: _copy, ...rest } = img as any;
  return rest;
}

function transformValue(value: unknown, fieldKey?: string): unknown {
  if (value === null || value === undefined) return undefined;
  if (typeof value !== "object") return value;

  if (Array.isArray(value)) {
    // Rich-text arrays: blocks with type/text/spans — keep as-is if field is rich text
    if (
      fieldKey &&
      KEEP_AS_RICH_TEXT.has(fieldKey) &&
      value.length > 0 &&
      typeof (value[0] as any)?.type === "string" &&
      typeof (value[0] as any)?.text === "string"
    ) {
      return value; // keep rich text array untouched
    }
    // Plain rich-text array used as plain text (e.g. headline) → extract string
    if (
      value.length > 0 &&
      typeof (value[0] as any)?.type === "string" &&
      typeof (value[0] as any)?.text === "string"
    ) {
      const text = (value as Array<{ text: string }>)
        .map((b) => b.text)
        .join("\n")
        .trim();
      return text || undefined;
    }
    // Empty rich text array []
    if (value.length === 0) return undefined;

    return value.map((item) => transformValue(item, fieldKey)).filter((v) => v !== undefined);
  }

  const obj = value as Record<string, unknown>;

  // Link stubs
  if (obj.link_type === "Any" || obj.link_type === "Media") return null;

  // Document link with inlined data (fragment_gallery, fragment_number_list, etc.)
  if (obj.link_type === "Document" && obj.data) {
    // Strip the link wrapper, keep data contents
    const cleaned = transformObj(obj.data as Record<string, unknown>);
    return cleaned ? { data: cleaned } : undefined;
  }

  // Simple Document link (nav/button target) → resolve to Web link
  if (obj.link_type === "Document") {
    const resolved = resolveDocumentLink({
      type: obj.type as string | undefined,
      uid: obj.uid as string | undefined,
    });
    return resolved ?? undefined;
  }

  // Web link
  if (obj.link_type === "Web") {
    if (!obj.url) return undefined;
    const result: Record<string, unknown> = { link_type: "Web", url: obj.url };
    if (obj.target) result.target = obj.target;
    return result;
  }

  // Image object
  if (isImageObj(obj)) {
    return cleanImage(obj) ?? undefined;
  }

  // Empty image {}
  if (isEmptyImageObj(obj)) {
    return undefined;
  }

  // Generic object — recurse
  return transformObj(obj);
}

function transformObj(
  obj: Record<string, unknown>
): Record<string, unknown> | undefined {
  const result: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    const transformed = transformValue(v, k);
    if (transformed !== undefined) {
      result[k] = transformed;
    }
  }
  return Object.keys(result).length ? result : undefined;
}

// ─── Slice transformer ──────────────────────────────────────────────────────

function isEmptyItem(item: unknown): boolean {
  if (!item || typeof item !== "object" || Array.isArray(item)) return false;
  const obj = item as Record<string, unknown>;
  return Object.values(obj).every(
    (v) =>
      v === null ||
      v === undefined ||
      (typeof v === "object" &&
        !Array.isArray(v) &&
        Object.keys(v as object).length === 0)
  );
}

function transformSlice(slice: Record<string, unknown>): Record<string, unknown> {
  const {
    id: _id,
    slice_type,
    primary = {},
    items = [],
    ...rest
  } = slice as any;

  const cleanedPrimary = transformObj(primary as Record<string, unknown>) ?? {};

  const cleanedItems = (items as unknown[])
    .filter((item) => !isEmptyItem(item))
    .map((item) => transformValue(item))
    .filter(Boolean) as Record<string, unknown>[];

  const result: Record<string, unknown> = {
    type: slice_type,
    ...cleanedPrimary,
  };

  if (cleanedItems.length > 0) {
    result.items = cleanedItems;
  }

  // Merge any unexpected top-level fields (rare)
  const cleanedRest = transformObj(rest as Record<string, unknown>);
  if (cleanedRest) Object.assign(result, cleanedRest);

  return result;
}

// ─── Page transformer ───────────────────────────────────────────────────────

/** Top-level PageData fields that are often null/empty and can be omitted. */
const OMIT_IF_EMPTY_PAGE_FIELDS = new Set([
  "gallery",
  "video_media",
  "meta_image",
]);

/** These nullable page fields should be kept even if null (used explicitly). */
const KEEP_NULLABLE_PAGE_FIELDS = new Set([
  "video_url",
  "headline",
  "body",
  "caption",
  "subhead",
  "meta_title",
  "meta_description",
]);

function cleanPageData(data: Record<string, unknown>): Record<string, unknown> {
  const { slices = [], ...rest } = data as any;

  const cleanedData: Record<string, unknown> = {};

  for (const [k, v] of Object.entries(rest)) {
    if (v === null) {
      if (KEEP_NULLABLE_PAGE_FIELDS.has(k)) cleanedData[k] = null;
      continue;
    }
    if (Array.isArray(v) && v.length === 0 && OMIT_IF_EMPTY_PAGE_FIELDS.has(k)) continue;
    if (
      typeof v === "object" &&
      !Array.isArray(v) &&
      v !== null &&
      Object.keys(v).length === 0
    ) {
      continue; // skip {} objects (empty media etc)
    }

    const transformed = transformValue(v, k);
    if (transformed !== undefined) {
      cleanedData[k] = transformed;
    }
  }

  const cleanedSlices = (slices as Record<string, unknown>[]).map(transformSlice);

  return { ...cleanedData, slices: cleanedSlices };
}

function cleanPage(page: { uid: string; data: Record<string, unknown> }) {
  return {
    uid: page.uid,
    data: cleanPageData(page.data),
  };
}

// ─── File writer ─────────────────────────────────────────────────────────────

function serialize(value: unknown, indent = 2): string {
  return JSON.stringify(value, null, indent);
}

function writeContentFile(
  filePath: string,
  header: string,
  exportName: string,
  typeName: string,
  value: unknown
): void {
  const content = [
    header,
    `import type { PageDoc } from "content/types";`,
    "",
    `export const ${exportName}: ${typeName} = ${serialize(value)};`,
    "",
  ].join("\n");

  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`✓ Wrote ${path.relative(process.cwd(), filePath)}`);
}

function writeContentFileWithExtra(
  filePath: string,
  header: string,
  content: string
): void {
  fs.writeFileSync(filePath, header + "\n" + content, "utf-8");
  console.log(`✓ Wrote ${path.relative(process.cwd(), filePath)}`);
}

// ─── Dynamic imports ─────────────────────────────────────────────────────────

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SITE = path.join(ROOT, "src/app/(site)");

async function processHomePage(): Promise<void> {
  const mod = await import("../src/app/(site)/content.js" as any).catch(
    () => import("../src/app/(site)/content.ts" as any)
  );
  const cleaned = cleanPage(mod.homePage);
  writeContentFile(
    path.join(SITE, "content.ts"),
    `// Home page content\n`,
    "homePage",
    "PageDoc",
    cleaned
  );
}

async function processAboutPage(): Promise<void> {
  const mod = await import("../src/app/(site)/about/content.js" as any).catch(
    () => import("../src/app/(site)/about/content.ts" as any)
  );
  const cleaned = cleanPage(mod.aboutPage);
  writeContentFile(
    path.join(SITE, "about/content.ts"),
    `// About page content\n`,
    "aboutPage",
    "PageDoc",
    cleaned
  );
}

async function processContactPage(): Promise<void> {
  const mod = await import("../src/app/(site)/contact/content.js" as any).catch(
    () => import("../src/app/(site)/contact/content.ts" as any)
  );
  const cleaned = cleanPage(mod.contactPage);
  writeContentFile(
    path.join(SITE, "contact/content.ts"),
    `// Contact page content\n`,
    "contactPage",
    "PageDoc",
    cleaned
  );
}

async function processEventsPage(): Promise<void> {
  const mod = await import("../src/app/(site)/events/content.js" as any).catch(
    () => import("../src/app/(site)/events/content.ts" as any)
  );
  const cleaned = cleanPage(mod.eventIndexPage);
  writeContentFile(
    path.join(SITE, "events/content.ts"),
    `// Events index page content\n`,
    "eventIndexPage",
    "PageDoc",
    cleaned
  );
}

async function processEventPages(): Promise<void> {
  const mod = await import("../src/app/(site)/events/[uid]/content.js" as any).catch(
    () => import("../src/app/(site)/events/[uid]/content.ts" as any)
  );
  const cleaned: Record<string, unknown> = {};
  for (const [uid, page] of Object.entries(mod.eventPages as Record<string, any>)) {
    cleaned[uid] = cleanPage(page);
  }
  const uids = mod.eventPageUids ?? Object.keys(cleaned);
  const fileContent = [
    `import type { PageDoc } from "content/types";\n`,
    `export const eventPages: Record<string, PageDoc> = ${serialize(cleaned)};\n`,
    `\n/** UIDs for generateStaticParams */`,
    `export const eventPageUids = ${serialize(uids)};`,
    "",
  ].join("\n");
  writeContentFileWithExtra(
    path.join(SITE, "events/[uid]/content.ts"),
    `// Event detail pages — uid-keyed map\n`,
    fileContent
  );
}

async function processMenusPage(): Promise<void> {
  const mod = await import("../src/app/(site)/menus/content.js" as any).catch(
    () => import("../src/app/(site)/menus/content.ts" as any)
  );
  const cleaned = cleanPage(mod.menuIndexPage);
  writeContentFile(
    path.join(SITE, "menus/content.ts"),
    `// Menus index page content\n`,
    "menuIndexPage",
    "PageDoc",
    cleaned
  );
}

async function processTourPage(): Promise<void> {
  const mod = await import("../src/app/(site)/tour/content.js" as any).catch(
    () => import("../src/app/(site)/tour/content.ts" as any)
  );
  const cleaned = cleanPage(mod.tourIndexPage);
  writeContentFile(
    path.join(SITE, "tour/content.ts"),
    `// Tour index page content\n`,
    "tourIndexPage",
    "PageDoc",
    cleaned
  );
}

async function processTourPages(): Promise<void> {
  const mod = await import("../src/app/(site)/tour/[uid]/content.js" as any).catch(
    () => import("../src/app/(site)/tour/[uid]/content.ts" as any)
  );
  const cleaned: Record<string, unknown> = {};
  for (const [uid, page] of Object.entries(mod.tourPages as Record<string, any>)) {
    cleaned[uid] = cleanPage(page);
  }
  const uids = mod.tourPageUids ?? Object.keys(cleaned);
  const fileContent = [
    `import type { PageDoc } from "content/types";\n`,
    `export const tourPages: Record<string, PageDoc> = ${serialize(cleaned)};\n`,
    `\n/** UIDs for generateStaticParams */`,
    `export const tourPageUids = ${serialize(uids)};`,
    "",
  ].join("\n");
  writeContentFileWithExtra(
    path.join(SITE, "tour/[uid]/content.ts"),
    `// Tour detail pages — uid-keyed map\n`,
    fileContent
  );
}

async function processGeneralPages(): Promise<void> {
  const mod = await import("../src/app/(site)/[uid]/content.js" as any).catch(
    () => import("../src/app/(site)/[uid]/content.ts" as any)
  );
  const cleaned: Record<string, unknown> = {};
  for (const [uid, page] of Object.entries(mod.generalPages as Record<string, any>)) {
    cleaned[uid] = cleanPage(page);
  }
  const uids = mod.generalPageUids ?? Object.keys(cleaned);
  const fileContent = [
    `import type { PageDoc } from "content/types";\n`,
    `export const generalPages: Record<string, PageDoc> = ${serialize(cleaned)};\n`,
    `\n/** UIDs for generateStaticParams */`,
    `export const generalPageUids = ${serialize(uids)};`,
    "",
  ].join("\n");
  writeContentFileWithExtra(
    path.join(SITE, "[uid]/content.ts"),
    `// General pages — uid-keyed map\n`,
    fileContent
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log("Cleaning up content files…\n");
  await processHomePage();
  await processAboutPage();
  await processContactPage();
  await processEventsPage();
  await processEventPages();
  await processMenusPage();
  await processTourPage();
  await processTourPages();
  await processGeneralPages();
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
