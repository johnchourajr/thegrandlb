import type { Content } from "@prismicio/client";
import type * as prismicT from "@prismicio/types";

// Menu item data structure (used in MenuItem component)
export type MenuItemData = {
  title: prismicT.RichTextField;
  description: prismicT.RichTextField;
  price_per: string;
  price_min: number;
  price_max: number;
};

// Menu section body structure (from external Prismic repo)
export type MenuSectionBody = {
  items?: MenuItemData[];
  primary: {
    title: prismicT.RichTextField;
    description: prismicT.RichTextField;
    caption: prismicT.RichTextField;
  };
};

// Menu link data structure (represents a menu section from external repo)
export type ExternalMenuLinkData = {
  page_title?: string;
  page_description: prismicT.RichTextField;
  page_disclaimer: prismicT.RichTextField;
  body: MenuSectionBody[];
};

// External menu group item structure (from external Prismic repo)
// Based on console output, the group items have menu_link with data containing the section info
export type ExternalMenuGroupItem = {
  menu_link: {
    data: ExternalMenuLinkData;
  };
};

// Legacy menu group item structure (for internal fallback)
export type InternalMenuGroupItem = {
  menu_link: {
    data: {
      page_title?: string;
      page_description: prismicT.RichTextField;
      page_disclaimer: prismicT.RichTextField;
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

// Internal menu page document with group data (fallback)
export type InternalMenuPageDocument = Content.MenuPageDocument & {
  data: Content.MenuPageDocument["data"] & {
    group?: InternalMenuGroupItem[];
    page_title?: string;
    page_description?: string | prismicT.RichTextField;
    page_disclaimer?: string | prismicT.RichTextField;
  };
};

// Extended menu page document that includes the group field
// This can be either the external MenuCollectionDocument or internal MenuPageDocument
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
  return page.type === "menu_collection";
}

export function isInternalMenuPageDocument(
  page: MenuPageDocumentWithGroup
): page is InternalMenuPageDocument {
  return page.type === "menu_page";
}

export function isExternalMenuGroupItem(
  item: MenuGroupItem
): item is ExternalMenuGroupItem {
  // External items come from menu collections which have string fields
  return typeof item.menu_link?.data?.page_title === "string";
}
