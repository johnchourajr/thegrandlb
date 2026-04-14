import * as fs from "fs";
import * as path from "path";
import type { RtBlock } from "content/types";
import type { MenuDoc, MenuGroup } from "content/types";
import type { MenuCollectionDocument, ExternalMenuGroupItem } from "@/types/menu";

// ─── Local file helpers ────────────────────────────────────────────────────────

function menuFilePath(uid: string) {
  return path.join(process.cwd(), "content", "menus", `${uid}.menu.json`);
}

function readMenuJson(uid: string): MenuDoc | null {
  try {
    const p = menuFilePath(uid);
    if (!fs.existsSync(p)) return null;
    return JSON.parse(fs.readFileSync(p, "utf-8")) as MenuDoc;
  } catch {
    return null;
  }
}

function readSharedGroups(): MenuGroup[] {
  return readMenuJson("shared")?.groups ?? [];
}

/** Merge shared groups into a MenuDoc's groups array */
function mergeShared(doc: MenuDoc): MenuGroup[] {
  const own = doc.groups;
  if (!doc.shared_group_refs?.length) return own;
  const shared = readSharedGroups();
  const merged = doc.shared_group_refs
    .map((title) => shared.find((g) => g.title === title))
    .filter((g): g is MenuGroup => !!g);
  return [...own, ...merged];
}

function stringToRtBlocks(text: string): RtBlock[] {
  if (!text) return [];
  return [{ type: "paragraph", text, spans: [] }];
}

/** Convert our flat MenuDoc format to the shape MenuSection/MenuSectionNav expect */
function menuDocToCollectionDocument(doc: MenuDoc): MenuCollectionDocument {
  const groups = mergeShared(doc);

  const group: ExternalMenuGroupItem[] = groups.map((g) => ({
    menu_link: {
      data: {
        page_title: g.title,
        page_description: stringToRtBlocks(g.description),
        page_disclaimer: stringToRtBlocks(g.disclaimer),
        body: g.sections,
      },
    },
  }));

  return {
    id: doc.uid,
    uid: doc.uid,
    url: null,
    type: "menu_collection",
    href: "",
    tags: [],
    first_publication_date: "",
    last_publication_date: "",
    slugs: [],
    linked_documents: [],
    lang: "en-us",
    alternate_languages: [],
    data: {
      path: doc.uid,
      page_title: doc.page_title,
      page_description: doc.page_description,
      page_disclaimer: doc.page_disclaimer,
      group,
    },
  };
}

// ─── Public API ────────────────────────────────────────────────────────────────

/**
 * Fetch a menu from the local JSON files (with shared groups merged in).
 * Replaces the old Prismic fetchMenuCollection call.
 */
export async function fetchMenuCollection(
  menuApiUid: string
): Promise<MenuCollectionDocument> {
  const doc = readMenuJson(menuApiUid);
  if (!doc) throw new Error(`Menu not found: ${menuApiUid}`);
  return menuDocToCollectionDocument(doc);
}
