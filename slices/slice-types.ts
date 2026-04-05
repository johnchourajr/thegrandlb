/**
 * Typed interfaces for all first-party slice types.
 * These match the shape produced by the content cleanup script.
 */

import type { ImageField, LinkField, RtBlock, Slice } from "content/types";

// ─── Shared sub-types ────────────────────────────────────────────────────────

export type GalleryItem = {
  media?: ImageField;
  video_url?: string | null;
  caption?: string | null;
  link?: LinkField;
  video_media?: null;
};

export type GalleryDoc = {
  data: {
    gallery_items: GalleryItem[];
  };
};

// ─── Slice interfaces ────────────────────────────────────────────────────────

export type PageHeroSlice = Slice & {
  type: "page_hero";
  section_id?: string;
  headline?: string;
  media?: ImageField;
  video_url?: string | null;
  video_media?: null;
  primary_action?: string | null;
  primary_action_link?: LinkField;
  secondary_action?: string | null;
  secondary_action_link?: LinkField;
  bottom_spacer?: string | null;
};

export type HeroDetailPageSlice = Slice & {
  type: "hero_detail_page_slice";
  section_id?: string | null;
  title?: string | null;
  headline?: string | null;
  caption?: string | null;
  media?: ImageField;
  video_url?: string | null;
  video_media?: null;
  primary_action?: string | null;
  primary_action_link?: LinkField;
  bottom_spacer?: string | null;
};

export type TextSectionSlice = Slice & {
  type: "text_section";
  section_id?: string;
  eyebrow?: string | null;
  body?: RtBlock[] | string | null;
  primary_action?: string | null;
  primary_action_link?: LinkField;
  secondary_action?: string | null;
  secondary_action_link?: LinkField;
  top_border?: boolean;
  top_spacer?: string | null;
  bottom_border?: boolean;
  bottom_spacer?: string | null;
};

export type FaqItem = {
  question: RtBlock[];
  answer: RtBlock[];
};

export type FaqSectionSlice = Slice & {
  type: "faq_section";
  section_id?: string;
  title?: string | null;
  gallery?: GalleryDoc | null;
  media?: ImageField;
  video_url?: string | null;
  asset_position?: boolean;
  items: FaqItem[];
};

export type TeamMember = {
  name?: string;
  position?: string;
  primary_media?: ImageField;
  secondary_media?: ImageField;
};

export type TeamGallerySlice = Slice & {
  type: "team_gallery";
  section_id?: string;
  top_spacer?: string | null;
  bottom_spacer?: string | null;
  items: TeamMember[];
};

export type TileItemData = {
  media?: ImageField;
  link?: LinkField;
  headline?: string;
  eyebrow?: string | null;
  body?: string | null;
  theme?: string;
  size?: string;
  direction?: string;
  col_start?: string;
  col_span?: string;
  row_start?: string;
  row_span?: string;
  card_fragment?: unknown;
};

export type TileGridSlice = Slice & {
  type: "tile_grid";
  section_id?: string | null;
  headline?: string | null;
  body?: string | null;
  theme?: string;
  top_spacer?: string | null;
  bottom_spacer?: string | null;
  items: TileItemData[];
};

export type NumberItemData = {
  media?: ImageField;
  number?: RtBlock[] | null;
  eyebrow?: string | null;
  body?: RtBlock[] | null;
  action_text?: string | null;
  action_link?: LinkField;
};

export type NumbersSectionSlice = Slice & {
  type: "numbers_section";
  section_id?: string;
  title?: string | null;
  description?: string | null;
  columns?: string;
  inset?: boolean;
  top_border?: boolean;
  top_spacer?: string | null;
  bottom_border?: boolean;
  bottom_spacer?: string | null;
  items: NumberItemData[];
};

export type SplitScrollItem = {
  headline?: RtBlock[] | null;
  eyebrow?: string | null;
  body?: RtBlock[] | null;
};

export type SplitScrollSectionSlice = Slice & {
  type: "split_scroll_section";
  section_id?: string;
  top_spacer?: string;
  bottom_spacer?: string;
  gallery?: GalleryDoc | null;
  media?: ImageField;
  video_url?: string | null;
  asset_position?: boolean;
  items: SplitScrollItem[];
};

export type ScrollTextSlice = Slice & {
  type: "scroll_text";
  section_id?: string;
  top_title?: string | null;
  line_one?: string | null;
  line_two?: string | null;
  bottom_title?: string | null;
  top_spacer?: string | null;
  bottom_spacer?: string | null;
  primary_action?: string | null;
  primary_action_link?: LinkField;
};

export type ImageSectionSlice = Slice & {
  type: "image_section";
  section_id?: string;
  top_spacer?: string | null;
  bottom_spacer?: string | null;
  media?: ImageField;
  video_url?: string | null;
  gallery?: GalleryDoc | null;
};

export type LongformTextSectionSlice = Slice & {
  type: "longform_text_section";
  section_id?: string;
  text?: RtBlock[];
  top_border?: boolean;
  top_spacer?: string | null;
  bottom_border?: boolean;
  bottom_spacer?: string | null;
};

export type NumberListDoc = {
  data: {
    bullet_list?: NumberItemData[];
    numberlist?: NumberItemData[];
    primary_action?: string | null;
    primary_action_link?: LinkField;
  };
};

export type HomepageNumbersSlice = Slice & {
  type: "homepage_numbers";
  section_id?: string;
  title?: string | null;
  top_spacer?: string | null;
  bottom_spacer?: string | null;
  number_list?: NumberListDoc | null;
};

export type HomepageLocationSlice = Slice & {
  type: "homepage_location";
  section_id?: string;
  media?: ImageField;
  video_url?: string | null;
  caption?: string | null;
  title?: string | null;
  description?: string | null;
  top_spacer?: string | null;
  bottom_spacer?: string | null;
  address_label?: string | null;
  address?: RtBlock[];
  action_text?: string | null;
  action_link?: LinkField;
  bullet_list?: NumberListDoc | null;
};

export type SplitGallerySlice = Slice & {
  type: "split_gallery";
  section_id?: string;
  top_spacer?: string | null;
  bottom_spacer?: string | null;
  gallery_left?: GalleryDoc | null;
  gallery_right?: GalleryDoc | null;
};
