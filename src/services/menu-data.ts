import { readMenuDoc } from "@/services/menu-files";
import type { RtBlock } from "content/types";
import type { MenuDoc, MenuGroup } from "content/types";
import type { MenuCollectionDocument, ExternalMenuGroupItem } from "@/types/menu";

// ─── Menu document helpers ────────────────────────────────────────────────────────

function readSharedGroups(): MenuGroup[] {
  return readMenuDoc("shared")?.groups ?? [];
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
 * Reads merged menu JSON from disk / API-backed content.
 */
export async function fetchMenuCollection(
  menuApiUid: string
): Promise<MenuCollectionDocument> {
  const doc = readMenuDoc(menuApiUid);
  if (!doc) throw new Error(`Menu not found: ${menuApiUid}`);
  return menuDocToCollectionDocument(doc);
}
