import type { ContentImageField, LinkField } from "content/types";

export interface HeroCategoryPageProps {
  headline?: string | null;
  gallery?: ContentImageField[];
  video_url?: string | null;
  media?: ContentImageField;
  icon_media?: ContentImageField;
  subhead?: string | null;
  body?: string | null;
}

export interface HeroDetailPageProps {
  uid?: string;
  title?: string | null;
  headline?: string | null;
  caption?: string | null;
  /** Optional Tailwind classes for the caption line (e.g. max width on event detail heroes) */
  captionClassName?: string;
  media?: ContentImageField | null;
  video_url?: string | null;
  subhead?: string | null;
  body?: string | null;
  primary_action?: string | null;
  primary_action_link?: LinkField | Record<string, unknown>;
  bottomSpacer?: "None" | "Small" | "Medium" | "Large";
}

export interface HeadlineItemProps {
  headline: string;
  scrollYProgress: any;
  media?: ContentImageField;
}
