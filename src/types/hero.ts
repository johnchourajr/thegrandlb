import type { PrismicImageLike, LinkField } from "content/types";

export interface HeroCategoryPageProps {
  headline?: string | null;
  gallery?: PrismicImageLike[];
  video_url?: string | null;
  media?: PrismicImageLike;
  icon_media?: PrismicImageLike;
  subhead?: string | null;
  body?: string | null;
}

export interface HeroDetailPageProps {
  uid?: string;
  title?: string | null;
  headline?: string | null;
  caption?: string | null;
  media?: PrismicImageLike | null;
  video_url?: string | null;
  subhead?: string | null;
  body?: string | null;
  primary_action?: string;
  primary_action_link?: LinkField | Record<string, unknown>;
  bottomSpacer?: "None" | "Small" | "Medium" | "Large";
}

export interface HeadlineItemProps {
  headline: string;
  scrollYProgress: any;
  media?: PrismicImageLike;
}
