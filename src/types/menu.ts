// Menu types — re-exported from content/types for component use.
export type {
  RtBlock,
  MenuDoc,
  MenuGroup,
  MenuSectionData,
  MenuItemData,
} from "content/types";

import type { RtBlock } from "content/types";

// ─── Legacy menu types (used by MenuPageContent + public menu pages) ────────

export type MenuSectionBody = {
  items?: Array<{
    title: RtBlock[];
    description: RtBlock[];
    price_per: string;
    price_min: number;
    price_max: number;
  }>;
  primary: {
    title: RtBlock[];
    description: RtBlock[];
    caption: RtBlock[];
  };
};

export type ExternalMenuLinkData = {
  page_title?: string;
  page_description: RtBlock[];
  page_disclaimer: RtBlock[];
  body: MenuSectionBody[];
};

export type ExternalMenuGroupItem = {
  menu_link: {
    data: ExternalMenuLinkData;
  };
};

export type InternalMenuGroupItem = {
  menu_link: {
    data: {
      page_title?: string;
      page_description: RtBlock[] | string;
      page_disclaimer: RtBlock[] | string;
      body: MenuSectionBody[];
    };
  };
};

export type MenuGroupItem = ExternalMenuGroupItem | InternalMenuGroupItem;

export type MenuCollectionDocument = {
  id: string;
  uid: string;
  url: string | null;
  type: "menu_collection";
  href: string;
  tags: string[];
  first_publication_date: string;
  last_publication_date: string;
  slugs: string[];
  linked_documents: unknown[];
  lang: string;
  alternate_languages: unknown[];
  data: {
    path: string;
    page_title: string;
    page_description: string;
    page_disclaimer: string;
    group: ExternalMenuGroupItem[];
  };
};

export type InternalMenuPageDocument = {
  uid: string;
  type?: "menu_page";
  data: {
    title?: string;
    page_title?: string;
    page_description?: string | RtBlock[];
    page_disclaimer?: string | RtBlock[];
    group?: InternalMenuGroupItem[];
    menu_api_uid?: string;
    [key: string]: unknown;
  };
};

export type MenuPageDocumentWithGroup =
  | MenuCollectionDocument
  | InternalMenuPageDocument;

export type MenuPageContentProps = {
  page: MenuPageDocumentWithGroup;
};

export type MenuSectionProps = {
  uid?: string;
  group?: MenuGroupItem[] | null;
};

export type MenuSectionNavProps = {
  uid?: string;
  group?: MenuGroupItem[] | null;
};

export type MenuItemProps = {
  data: {
    title: RtBlock[];
    description: RtBlock[];
    price_per: string;
    price_min: number;
    price_max: number;
  };
};

// ─── Type guards ────────────────────────────────────────────────────────────

export function isMenuCollectionDocument(
  page: MenuPageDocumentWithGroup,
): page is MenuCollectionDocument {
  return (page as MenuCollectionDocument).type === "menu_collection";
}

export function isInternalMenuPageDocument(
  page: MenuPageDocumentWithGroup,
): page is InternalMenuPageDocument {
  return (page as InternalMenuPageDocument).type === "menu_page";
}

export function isExternalMenuGroupItem(
  item: MenuGroupItem,
): item is ExternalMenuGroupItem {
  return typeof item.menu_link?.data?.page_title === "string";
}
