import type { Content } from "@prismicio/client";
import type { PreviewData } from "./page-props";

/**
 * Service Layer Types
 *
 * Type definitions for service functions that fetch and process Prismic data.
 */

// Return type for getExtra service
export type ExtraData = {
  navigation: Content.NavLinksDocument | null;
  settings: Content.SettingsDocument;
  cta: Content.FragmentCtaFooterDocument | null;
  footer_cards: Content.FragmentCardDocument[];
};

// Parameters for getExtra service
export type GetExtraParams = {
  previewData?: PreviewData;
};

// Generic page data structure that most pages follow
export type BasePageData = {
  page:
    | Content.PageDocument
    | Content.TourIndexPageDocument
    | Content.EventIndexPageDocument;
  settings: Content.SettingsDocument;
  navigation: Content.NavLinksDocument[];
  cta: Content.FragmentCtaFooterDocument[];
  footer_cards: Content.FragmentCardDocument[];
};
