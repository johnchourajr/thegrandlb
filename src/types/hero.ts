import type { Content } from "@prismicio/client";

/**
 * Hero Component Types
 *
 * Type definitions for hero sections and page headers.
 */

// Hero category page props (for index pages like tour, events)
export interface HeroCategoryPageProps {
  headline?: string;
  gallery?: Content.PageDocument["data"]["gallery"];
  video_media?: Content.PageDocument["data"]["video_media"];
  media?: Content.PageDocument["data"]["media"];
  icon_media?: Content.TourIndexPageDocument["data"]["icon_media"];
  subhead?: string;
  body?: string;
}

// Hero detail page props (for individual pages)
export interface HeroDetailPageProps {
  uid?: string;
  title?: string | null;
  headline?: string | null;
  caption?: string | null;
  media?: Content.TourPageDocument["data"]["media"];
  video_media?: Content.TourPageDocument["data"]["video_media"];
  subhead?: string | null;
  body?: string | null;
  primary_action?: string;
  primary_action_link?: any; // Link field type - complex union
  bottomSpacer?: "None" | "Small" | "Medium" | "Large";
}

// Headline item props for category pages
export interface HeadlineItemProps {
  headline: string;
  scrollYProgress: any; // MotionValue from framer-motion
  media?: any; // Media can be various types
}
