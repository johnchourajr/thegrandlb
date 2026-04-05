import type { RtBlock } from "content/types";

// Menu item data structure (used in MenuItem component)
export type MenuItemData = {
  title: RtBlock[];
  description: RtBlock[];
  price_per: string;
  price_min: number;
  price_max: number;
};

// Menu section body structure (from external menu repo)
export type MenuSectionBody = {
  items?: MenuItemData[];
  primary: {
    title: RtBlock[];
    description: RtBlock[];
    caption: RtBlock[];
  };
};

// Menu link data structure (represents a menu section from external repo)
export type ExternalMenuLinkData = {
  page_title?: string;
  page_description: RtBlock[];
  page_disclaimer: RtBlock[];
  body: MenuSectionBody[];
};

// External menu group item structure (from external menu repo)
export type ExternalMenuGroupItem = {
  menu_link: {
    data: ExternalMenuLinkData;
  };
};

// Internal menu group item structure (for internal fallback)
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

// Union type for menu group items
export type MenuGroupItem = ExternalMenuGroupItem | InternalMenuGroupItem;

// External menu collection document structure (from grandmenus repo)
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
  linked_documents: any[];
  lang: string;
  alternate_languages: any[];
  data: {
    path: string;
    page_title: string;
    page_description: string;
    page_disclaimer: string;
    group: ExternalMenuGroupItem[];
  };
};

// Internal menu page document (first-party)
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

// Extended menu page document that includes the group field
export type MenuPageDocumentWithGroup =
  | MenuCollectionDocument
  | InternalMenuPageDocument;

// Props for MenuPageContent component
export type MenuPageContentProps = {
  page: MenuPageDocumentWithGroup;
};

// Props for MenuSection component
export type MenuSectionProps = {
  uid?: string;
  group?: MenuGroupItem[] | null;
};

// Props for MenuSectionNav component
export type MenuSectionNavProps = {
  uid?: string;
  group?: MenuGroupItem[] | null;
};

// Props for MenuItem component
export type MenuItemProps = {
  data: MenuItemData;
};

// Type guards
export function isMenuCollectionDocument(
  page: MenuPageDocumentWithGroup
): page is MenuCollectionDocument {
  return (page as MenuCollectionDocument).type === "menu_collection";
}

export function isInternalMenuPageDocument(
  page: MenuPageDocumentWithGroup
): page is InternalMenuPageDocument {
  return (page as InternalMenuPageDocument).type === "menu_page";
}

export function isExternalMenuGroupItem(
  item: MenuGroupItem
): item is ExternalMenuGroupItem {
  return typeof item.menu_link?.data?.page_title === "string";
}
