import type { Content } from "@prismicio/client";
import { MotionValue } from "framer-motion";

/**
 * Footer Component Types
 *
 * Type definitions for footer and CTA footer components.
 */

// CTA Footer component props
export interface CtaFooterProps {
  data?: Content.FragmentCtaFooterDocument | null;
}

// CTA Footer headline item props
export interface CtaFooterHeadlineItemProps {
  word: string;
  index: number;
  scrollProgress: MotionValue<number>;
  array?: string[];
  media?: any;
}

// Navigation link item props
export interface NavLinkItemProps {
  stringTextSize?: "default" | "small" | "large";
  link_source: Content.NavLinksDocument["data"]["slices"][number]["primary"]["link_source"];
  link_title: string;
  className?: string;
  [key: string]: unknown;
}

// Main footer props
export interface FooterProps {
  settings?: Content.SettingsDocument;
  navigation?: Content.NavLinksDocument;
}
