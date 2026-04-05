import type { SharedDoc } from "content/types";
import { MotionValue } from "framer-motion";

export interface CtaFooterProps {
  data?: SharedDoc | null;
}

export interface CtaFooterHeadlineItemProps {
  word: string;
  index: number;
  scrollProgress: MotionValue<number>;
  array?: string[];
  media?: any;
}

export interface NavLinkItemProps {
  stringTextSize?: "default" | "small" | "large";
  link_source: unknown;
  link_title: string;
  className?: string;
  [key: string]: unknown;
}

export interface FooterProps {
  settings?: SharedDoc;
  navigation?: SharedDoc | null;
}
