import type {
  FragmentCardDocument,
  FragmentCtaFooterDocument,
  InquirePageDocument,
  NavLinksDocument,
  PageDocument,
  SettingsDocument,
} from "../../prismicio-types";

export type PageProps = {
  page: PageDocument;
  settings: SettingsDocument;
  navigation: NavLinksDocument | null;
  cta: FragmentCtaFooterDocument | null;
  footer_cards: FragmentCardDocument[];
};

export type InquirePageProps = {
  page: InquirePageDocument;
  settings: SettingsDocument;
  navigation: NavLinksDocument | null;
  cta: FragmentCtaFooterDocument | null;
  footer_cards: FragmentCardDocument[];
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
