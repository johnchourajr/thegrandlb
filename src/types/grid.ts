import type { Content } from "@prismicio/client";

/**
 * Grid Component Types
 *
 * Type definitions for grid-based layouts that display Prismic content items.
 */

// Base layout configuration for grid items
export type GridItemLayout = {
  col_span?: string;
  col_start?: string;
  row_span?: string;
  row_start?: string;
  theme?: string;
  size?: string;
  direction?: string;
};

// Tour index specific types - properly resolved from Prismic relations
export type TourSpaceWithLayout = {
  page: Content.TourPageDocument;
  page_media: Content.TourIndexPageDocumentDataSpacesItem["page_media"];
  layout: GridItemLayout;
};

// Event index specific types - properly resolved from Prismic relations
export type EventPageWithLayout =
  Content.EventIndexPageDocumentDataEventPagesItem & {
    layout: GridItemLayout;
  };

// Generic grid item that can handle different Prismic content types
export type GridItemData = TourSpaceWithLayout | EventPageWithLayout;

// Grid component props
export type GridBaseProps = {
  uid?: string;
  sectionId: string;
  items: GridItemData[];
  layoutLoader?: boolean;
};

export type GridItemProps = {
  space: GridItemData;
  parentUid?: string;
};
