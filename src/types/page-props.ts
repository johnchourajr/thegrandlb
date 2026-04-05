import type { PageDoc, SharedDoc } from "content/types";

export type PageProps = {
  page: PageDoc;
  settings: SharedDoc;
  navigation: SharedDoc | null;
  cta: SharedDoc | null;
  footer_cards: SharedDoc[];
};

export type InquirePageProps = {
  page: PageDoc;
  settings: SharedDoc;
  navigation: SharedDoc | null;
  cta: SharedDoc | null;
  footer_cards: SharedDoc[];
};

export type PreviewData = {
  ref: string;
  token: string;
};

export type GetStaticPropsParams = {
  params?: {
    uid?: string;
  };
  previewData?: PreviewData;
};
