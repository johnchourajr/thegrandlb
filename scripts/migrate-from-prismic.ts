/**
 * Prismic → Static Content Migration Script
 *
 * Fetches all content from the Prismic CMS and writes TypeScript
 * content files colocated with each route. After running this script,
 * the page components can be updated to import from the generated
 * content files instead of querying Prismic at request time.
 *
 * Run: npx tsx scripts/migrate-from-prismic.ts
 *
 * NOTE: Menus (grandmenus) are intentionally excluded — they stay on Prismic.
 */

import * as prismic from "@prismicio/client";
import * as fs from "fs";
import * as path from "path";

// ─── Config ────────────────────────────────────────────────────────────────

const REPO = "the-grand";

const FETCH_LINKS = [
  "fragment_number_list.numberlist",
  "fragment_number_list.bullet_list",
  "fragment_number_list.primary_action",
  "fragment_number_list.primary_action_link",
  "fragment_gallery.gallery_items",
  "fragment_media.media",
  "fragment_media.caption",
  "fragment_textblock.media",
  "fragment_textblock.eyebrow",
  "fragment_textblock.number",
  "fragment_textblock.body",
  "fragment_textblock.action_text",
  "fragment_textblock.action_link",
  "fragment_card.media",
  "fragment_card.eyebrow",
  "fragment_card.headline",
  "fragment_card.body",
  "fragment_card.link",
  "fragment_card.theme",
  "fragment_card.size",
  "fragment_card.direction",
  "fragment_card.col_start",
  "fragment_card.col_span",
  "fragment_card.row_start",
  "fragment_card.row_span",
  "fragment_cta_footer.headline",
  "fragment_cta_footer.media",
  "fragment_cta_footer.inquire_card",
  "fragment_cta_footer.top_spacer",
  "fragment_cta_footer.bottom_spacer",
  "tour_page.title",
  "tour_page.headline",
  "tour_page.max_capacity",
  "tour_page.square_feet",
  "tour_page.features",
  "event_page.title",
  "event_page.headline",
  "event_page.caption",
  "page.title",
];

const ROOT = path.resolve(process.cwd());
const SRC_SITE = path.join(ROOT, "src/app/(site)");
const CONTENT_DIR = path.join(ROOT, "content");

// ─── Stripping helpers ─────────────────────────────────────────────────────
//
// These remove the Prismic CMS envelope (id, type, lang, href, tags, dates…)
// and slice authoring metadata (variation, version, id, slice_label) so the
// content files only carry data the app actually uses.

type Stripped = { uid: string; data: Record<string, unknown> };
type SharedStripped = { uid?: string; data: Record<string, unknown> };

/**
 * Strip a full Prismic page/index document down to { uid, data }.
 * Slices in data are also stripped; nested resolved documents in
 * relation fields (e.g. spaces[].page, event_pages[].page) are stripped too.
 */
function stripDoc(doc: any): Stripped {
  return {
    uid: doc.uid as string,
    data: stripData(doc.data),
  };
}

/**
 * Strip a Prismic fragment/singleton document (settings, nav, cta, card).
 * uid is optional since singletons sometimes lack it at the API level.
 */
function stripSharedDoc(doc: any): SharedStripped {
  return {
    uid: doc.uid ?? undefined,
    data: stripData(doc.data),
  };
}

/** Single image fields — normalize empty link stubs to null. */
const SINGLE_IMAGE_FIELDS = new Set(["media", "icon_media", "page_media", "meta_image", "video_media", "og_image", "site_image"]);
/** Array gallery fields — normalize to [] when Prismic returns an empty link stub. */
const GALLERY_FIELDS = new Set(["gallery"]);

/** Recursively strip data fields, handling slices and nested relation docs. */
function stripData(data: any): Record<string, unknown> {
  if (!data || typeof data !== "object") return data;

  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (key === "slices") {
      result.slices = (value as any[]).map(stripSlice);
    } else if (GALLERY_FIELDS.has(key)) {
      // Gallery fields must always be arrays — normalize empty Prismic link stubs to [].
      result[key] = Array.isArray(value)
        ? (value as any[]).map(normalizeField).filter(Boolean)
        : [];
    } else if (SINGLE_IMAGE_FIELDS.has(key)) {
      // Single image fields — normalize empty Prismic link stubs to null.
      result[key] = normalizeField(value);
    } else if (Array.isArray(value)) {
      // Relation group fields (e.g. spaces, event_pages) contain items with
      // a `page` key that holds a resolved nested document.
      result[key] = value.map((item: any) => {
        if (item && typeof item === "object" && "page" in item && item.page?.uid) {
          return { ...item, page: stripNestedDoc(item.page) };
        }
        return item;
      });
    } else {
      result[key] = value;
    }
  }
  return result;
}

/** Strip a slice — keep id (required by @prismicio/react for React keys), drop authoring metadata. */
function stripSlice(slice: any): { id: string; slice_type: string; primary: Record<string, unknown>; items: Record<string, unknown>[] } {
  return {
    id: slice.id as string,
    slice_type: slice.slice_type as string,
    primary: slice.primary ?? {},
    items: (slice.items ?? []) as Record<string, unknown>[],
  };
}

/**
 * Normalize a Prismic image/gallery field.
 * Prismic returns `{ link_type: "Any" }` for unset image/gallery fields —
 * convert these to empty values so our typed data is always a clean shape.
 */
function normalizeField(value: any): any {
  if (value === null || value === undefined) return value;
  // Empty Prismic link / unset field stub
  if (typeof value === "object" && !Array.isArray(value) && value.link_type) {
    return null;
  }
  return value;
}

/**
 * Strip a nested relation document (resolved via fetchLinks).
 * These appear inside group fields like spaces[].page or event_pages[].page.
 */
function stripNestedDoc(doc: any): { uid: string; data: Record<string, unknown> } {
  return { uid: doc.uid as string, data: doc.data ?? {} };
}

// ─── Serialise helpers ─────────────────────────────────────────────────────

function serialize(data: unknown): string {
  // U+2028 (LINE SEPARATOR) and U+2029 (PARAGRAPH SEPARATOR) are valid JSON
  // but TypeScript treats them as line terminators inside string literals.
  return JSON.stringify(data, null, 2)
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeTs(filePath: string, content: string) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`  ✓  ${path.relative(ROOT, filePath)}`);
}

function header(note?: string) {
  return [
    "// Auto-generated by scripts/migrate-from-prismic.ts",
    "// To regenerate: npx tsx scripts/migrate-from-prismic.ts",
    note ? `// ${note}` : "",
    "",
  ]
    .filter((l, i) => l !== "" || i === 3)
    .join("\n");
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function main() {
  console.log("\n🚀  Starting Prismic migration...\n");

  const client = prismic.createClient(REPO);

  // ── Fetch everything in parallel ──────────────────────────────────────────

  console.log("  Fetching from Prismic...");

  const [
    navigationResult,
    settings,
    ctaResult,
    tourCard,
    eventsCard,
    menusCard,
    homePage,
    aboutPage,
    contactPage,
    menuIndexPage,
    tourIndexPage,
    eventIndexPage,
    offsiteIndexPage,
    tourPages,
    eventPages,
    offsitePages,
    generalPages,
  ] = await Promise.all([
    client.getByType("nav_links"),
    client.getByUID("settings", "settings"),
    client.getByType("fragment_cta_footer", { fetchLinks: FETCH_LINKS }),
    client.getByUID("fragment_card", "tour-card", { fetchLinks: FETCH_LINKS }),
    client.getByUID("fragment_card", "events-card", { fetchLinks: FETCH_LINKS }),
    client.getByUID("fragment_card", "menus-card", { fetchLinks: FETCH_LINKS }),
    client.getByUID("page", "home", { fetchLinks: FETCH_LINKS }),
    client.getByUID("page", "about", { fetchLinks: FETCH_LINKS }),
    client.getByUID("page", "contact", { fetchLinks: FETCH_LINKS }),
    client.getByUID("page", "menus", { fetchLinks: FETCH_LINKS }),
    client.getByUID("tour_index_page", "tour", { fetchLinks: FETCH_LINKS }),
    client.getByUID("event_index_page", "events", { fetchLinks: FETCH_LINKS }),
    client.getByUID("offsite_index_page", "offsite", { fetchLinks: FETCH_LINKS }),
    client.getAllByType("tour_page", { fetchLinks: FETCH_LINKS }),
    client.getAllByType("event_page", { fetchLinks: FETCH_LINKS }),
    client.getAllByType("offsite_page", { fetchLinks: FETCH_LINKS }),
    client.getAllByType("page", { fetchLinks: FETCH_LINKS }),
  ]);

  const navigation = navigationResult.results[0] ?? null;
  const cta = ctaResult.results[0] ?? null;

  console.log("\n  Writing content files...\n");

  // ── 1. content/shared.constants.ts ──────────────────────────────────────

  ensureDir(CONTENT_DIR);

  writeTs(
    path.join(CONTENT_DIR, "shared.constants.ts"),
    `${header("Global data shared across all routes (replaces getExtra)")}
import type { SharedDoc } from "content/types";

/** Global site settings (favicon, SEO defaults, etc.) */
export const settings: SharedDoc = ${serialize(stripSharedDoc(settings))};

/** Primary navigation links */
export const navigation: SharedDoc | null = ${serialize(navigation ? stripSharedDoc(navigation) : null)};

/** CTA footer fragment (bottom-of-page call-to-action) */
export const ctaFooter: SharedDoc | null = ${serialize(cta ? stripSharedDoc(cta) : null)};

/** Footer tile cards — tour, events, menus */
export const footerCards: SharedDoc[] = ${serialize([tourCard, eventsCard, menusCard].map(stripSharedDoc))};
`
  );

  // ── 2. Home page ──────────────────────────────────────────────────────────

  writeTs(
    path.join(SRC_SITE, "content.ts"),
    `${header("Home page content")}
import type { PageDoc } from "content/types";

export const homePage: PageDoc = ${serialize(stripDoc(homePage))};
`
  );

  // ── 3. About page ─────────────────────────────────────────────────────────

  writeTs(
    path.join(SRC_SITE, "about/content.ts"),
    `${header("About page content")}
import type { PageDoc } from "content/types";

export const aboutPage: PageDoc = ${serialize(stripDoc(aboutPage))};
`
  );

  // ── 4. Contact page ───────────────────────────────────────────────────────

  writeTs(
    path.join(SRC_SITE, "contact/content.ts"),
    `${header("Contact page content")}
import type { PageDoc } from "content/types";

export const contactPage: PageDoc = ${serialize(stripDoc(contactPage))};
`
  );

  // ── 5. Menus index page ───────────────────────────────────────────────────

  writeTs(
    path.join(SRC_SITE, "menus/content.ts"),
    `${header("Menus index page content")}
import type { PageDoc } from "content/types";

export const menuIndexPage: PageDoc = ${serialize(stripDoc(menuIndexPage))};
`
  );

  // ── 6. Tour index page ────────────────────────────────────────────────────

  writeTs(
    path.join(SRC_SITE, "tour/content.ts"),
    `${header("Tour index page content")}
import type { PageDoc } from "content/types";

export const tourIndexPage: PageDoc = ${serialize(stripDoc(tourIndexPage))};
`
  );

  // ── 7. Events index page ──────────────────────────────────────────────────

  writeTs(
    path.join(SRC_SITE, "events/content.ts"),
    `${header("Events index page content")}
import type { PageDoc } from "content/types";

export const eventIndexPage: PageDoc = ${serialize(stripDoc(eventIndexPage))};
`
  );

  // ── 8. Offsite index page ─────────────────────────────────────────────────

  writeTs(
    path.join(SRC_SITE, "offsite/content.ts"),
    `${header("Offsite index page content")}
import type { PageDoc } from "content/types";

export const offsiteIndexPage: PageDoc = ${serialize(stripDoc(offsiteIndexPage))};
`
  );

  // ── 9. Tour detail pages (uid-keyed map) ──────────────────────────────────

  const tourPageMap: Record<string, Stripped> = {};
  for (const p of tourPages) tourPageMap[p.uid] = stripDoc(p);

  writeTs(
    path.join(SRC_SITE, "tour/[uid]/content.ts"),
    `${header("Tour detail pages — uid-keyed map")}
import type { PageDoc } from "content/types";

export const tourPages: Record<string, PageDoc> = ${serialize(tourPageMap)};

/** UIDs for generateStaticParams */
export const tourPageUids = ${serialize(tourPages.map((p) => p.uid))};
`
  );

  // ── 10. Event detail pages (uid-keyed map) ────────────────────────────────

  const eventPageMap: Record<string, Stripped> = {};
  for (const p of eventPages) eventPageMap[p.uid] = stripDoc(p);

  writeTs(
    path.join(SRC_SITE, "events/[uid]/content.ts"),
    `${header("Event detail pages — uid-keyed map")}
import type { PageDoc } from "content/types";

export const eventPages: Record<string, PageDoc> = ${serialize(eventPageMap)};

/** UIDs for generateStaticParams */
export const eventPageUids = ${serialize(eventPages.map((p) => p.uid))};
`
  );

  // ── 11. Offsite detail pages (uid-keyed map) ──────────────────────────────

  const offsitePageMap: Record<string, Stripped> = {};
  for (const p of offsitePages) offsitePageMap[p.uid] = stripDoc(p);

  writeTs(
    path.join(SRC_SITE, "offsite/[uid]/content.ts"),
    `${header("Offsite detail pages — uid-keyed map")}
import type { PageDoc } from "content/types";

export const offsitePages: Record<string, PageDoc> = ${serialize(offsitePageMap)};

/** UIDs for generateStaticParams */
export const offsitePageUids = ${serialize(offsitePages.map((p) => p.uid))};
`
  );

  // ── 12. General pages (uid-keyed map for /:uid catch-all) ─────────────────

  const EXCLUDED = new Set(["home", "about", "contact", "menus"]);
  const generalPageMap: Record<string, Stripped> = {};
  for (const p of generalPages) {
    if (!EXCLUDED.has(p.uid)) generalPageMap[p.uid] = stripDoc(p);
  }

  ensureDir(path.join(SRC_SITE, "[uid]"));
  writeTs(
    path.join(SRC_SITE, "[uid]/content.ts"),
    `${header("General pages — uid-keyed map")}
import type { PageDoc } from "content/types";

export const generalPages: Record<string, PageDoc> = ${serialize(generalPageMap)};

/** UIDs for generateStaticParams */
export const generalPageUids = ${serialize(Object.keys(generalPageMap))};
`
  );

  // ── Summary ───────────────────────────────────────────────────────────────

  console.log("\n✅  Migration complete!\n");
  console.log("  Content files written:");
  console.log(`    • content/shared.constants.ts`);
  console.log(`    • src/app/(site)/content.ts`);
  console.log(`    • src/app/(site)/about/content.ts`);
  console.log(`    • src/app/(site)/contact/content.ts`);
  console.log(`    • src/app/(site)/menus/content.ts`);
  console.log(`    • src/app/(site)/tour/content.ts`);
  console.log(`    • src/app/(site)/events/content.ts`);
  console.log(`    • src/app/(site)/offsite/content.ts`);
  console.log(`    • src/app/(site)/tour/[uid]/content.ts  (${tourPages.length} spaces)`);
  console.log(`    • src/app/(site)/events/[uid]/content.ts  (${eventPages.length} events)`);
  console.log(`    • src/app/(site)/offsite/[uid]/content.ts  (${offsitePages.length} offsites)`);
  console.log(`    • src/app/(site)/[uid]/content.ts  (${Object.keys(generalPageMap).length} general pages)\n`);
}

main().catch((err) => {
  console.error("\n❌  Migration failed:", err);
  process.exit(1);
});
