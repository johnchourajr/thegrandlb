/**
 * Local content types — no dependency on @prismicio/client.
 *
 * These describe the shape of data in the static content files.
 * The underlying values were serialized from Prismic documents but
 * the types are fully owned by this project.
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

export type PrismicImageLike =
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
  key?: string;
};

export type DocumentLink = {
  link_type: "Document";
  uid: string;
  type: string;
  id?: string;
  lang?: string;
  slug?: string;
  isBroken?: boolean;
  key?: string;
};

export type AnyLink = { link_type: "Any" };

export type LinkField = WebLink | DocumentLink | AnyLink;

// ─── Slices ────────────────────────────────────────────────────────────────

/**
 * A stripped content slice.
 * Prismic authoring metadata (variation, version, id, slice_label) is omitted.
 */
export type Slice<
  TPrimary = Record<string, unknown>,
  TItem = Record<string, unknown>,
> = {
  /** Prismic-generated slice ID — required by @prismicio/react SliceZone for React keys. */
  id: string;
  slice_type: string;
  primary: TPrimary;
  items: TItem[];
};

// ─── Documents ─────────────────────────────────────────────────────────────

/**
 * Common fields every page document has.
 * The index signature allows arbitrary additional data fields per page type
 * while still giving typed access to the fields all pages share.
 */
export type PageData = {
  // Slice zone — every page has this
  slices: Slice[];
  // SEO fields
  meta_title?: string | null;
  meta_description?: string | null;
  meta_image?: PrismicImageLike;
  // Common content fields shared across page types
  title?: string | null;
  headline?: string | null;
  caption?: string | null;
  subhead?: string | null;
  body?: string | null;
  // Media fields used by index and detail pages
  media?: PrismicImageLike | null;
  gallery?: PrismicImageLike[];
  icon_media?: PrismicImageLike | null;
  video_url?: string | null;
  // Arbitrary additional fields per page type
  [key: string]: unknown;
};

/**
 * A stripped page document.
 * Prismic CMS envelope (id, type, href, lang, tags, dates…) removed.
 */
export type PageDoc = {
  uid: string;
  data: PageData;
};

/**
 * Shared/fragment document (settings, navigation, CTA footer, footer cards).
 * Navigation has slices; settings and other fragments do not.
 */
export type SharedDoc = {
  uid?: string;
  data: {
    slices?: Slice[];
    [key: string]: unknown;
  };
};
