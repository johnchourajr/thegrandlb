/**
 * Local content types for static TypeScript content files.
 *
 * These describe the shape of data in the static content files.
 */

// ─── Rich text ─────────────────────────────────────────────────────────────

export type RtSpan = {
  start: number;
  end: number;
  type: string;
  data?: unknown;
};

export type RtBlock = {
  type: string;
  text: string;
  spans: RtSpan[];
};

// ─── Images ────────────────────────────────────────────────────────────────

export type ImageField =
  | {
      url: string;
      alt?: string | null;
      dimensions?: { width: number; height: number };
    }
  | null
  | undefined;

/** Image-shaped field as stored in static content (includes legacy empty-object form). */
export type ContentImageField =
  | {
      url: string;
      alt?: string | null;
      copyright?: string | null;
      dimensions?: { width: number; height: number };
      id?: string;
      edit?: { x: number; y: number; zoom: number; background: string };
    }
  | Record<string, never>;

// ─── Links ─────────────────────────────────────────────────────────────────

export type WebLink = {
  link_type: "Web";
  url: string;
  target?: string;
};

/** Kept for nav/legacy usage — prefer WebLink in first-party content */
export type DocumentLink = {
  link_type: "Document";
  uid?: string;
  type?: string;
  id?: string;
  lang?: string;
  slug?: string;
  isBroken?: boolean;
  key?: string;
};

export type AnyLink = { link_type: "Any" };

export type LinkField = WebLink | DocumentLink | AnyLink | null | undefined;

// ─── Slices ────────────────────────────────────────────────────────────────

/**
 * A flat content slice. First-party slices have `type`; legacy nav slices
 * may still carry `slice_type`. The index signature covers all field values.
 */
export type Slice = {
  type?: string;
  slice_type?: string;
  [key: string]: unknown;
};

// ─── Documents ─────────────────────────────────────────────────────────────

export type PageData = {
  slices: Slice[];
  meta_title?: string | null;
  meta_description?: string | null;
  title?: string | null;
  // Common hero / detail-page fields
  headline?: string | null;
  caption?: string | null;
  subhead?: string | null;
  body?: string | null;
  video_url?: string | null;
  media?: ImageField;
  [key: string]: unknown;
};

export type PageDoc = {
  uid: string;
  data: PageData;
};

export type SharedDoc = {
  uid?: string;
  data: {
    slices?: Slice[];
    [key: string]: unknown;
  };
};

// ─── Menus ─────────────────────────────────────────────────────────────────

export type MenuItemData = {
  title: RtBlock[];
  description: RtBlock[];
  price_per: string;
  price_min: number;
  price_max: number;
};

export type MenuSectionData = {
  primary: {
    title: RtBlock[];
    description: RtBlock[];
    caption: RtBlock[];
  };
  items: MenuItemData[];
};

export type MenuGroup = {
  title: string;
  description: string;
  disclaimer: string;
  sections: MenuSectionData[];
  /** Set at runtime by the API when this group comes from shared.menu.json */
  _shared?: boolean;
};

export type MenuDoc = {
  uid: string;
  page_title: string;
  page_description: string;
  page_disclaimer: string;
  groups: MenuGroup[];
  /** Titles of groups inherited from shared.menu.json, appended after own groups */
  shared_group_refs?: string[];
};
