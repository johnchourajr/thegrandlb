import type { SharedDoc } from "content/types";
import type { PreviewData } from "./page-props";

export type ExtraData = {
  navigation: SharedDoc | null;
  settings: SharedDoc;
  cta: SharedDoc | null;
  footer_cards: SharedDoc[];
};

export type GetExtraParams = {
  previewData?: PreviewData;
};

export type BasePageData = {
  page: import("../../content/types").PageDoc;
  settings: SharedDoc;
  navigation: SharedDoc | null;
  cta: SharedDoc | null;
  footer_cards: SharedDoc[];
};
