import type { ContentImageField } from "content/types";

export type GridItemLayout = {
  col_span?: string;
  col_start?: string;
  row_span?: string;
  row_start?: string;
  theme?: string;
  size?: string;
  direction?: string;
};

/** A resolved tour space from the tour index page's spaces[] relation field */
export type TourSpaceRef = {
  uid: string;
  data: {
    title?: string | null;
    headline?: string | null;
    max_capacity?: number | null;
    square_feet?: number | null;
    features?: unknown;
    caption?: string | null;
  };
};

export type TourSpaceWithLayout = {
  page: TourSpaceRef;
  page_media: ContentImageField;
  layout: GridItemLayout;
};

/** A resolved event page entry from the event index page's event_pages[] relation field */
export type EventPageRef = {
  uid: string;
  data: {
    title?: string | null;
    headline?: string | null;
    caption?: string | null;
  };
};

export type EventPageWithLayout = {
  page: EventPageRef;
  page_media?: ContentImageField;
  layout: GridItemLayout;
};

export type GridItemData = TourSpaceWithLayout | EventPageWithLayout;

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
