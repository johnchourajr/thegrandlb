import type { Content } from "@prismicio/client";

/**
 * Header Component Types
 *
 * Type definitions for header navigation components.
 */

// Header right component props
export interface HeaderRightProps {
  navigation?: Content.NavLinksDocument | null;
  isNavOpen: boolean;
  setIsNavOpen: (open: boolean) => void;
  isMobile: boolean;
}

// Header left component props
export interface HeaderLeftProps {
  navigation?: Content.NavLinksDocument | null;
  isNavOpen: boolean;
  setIsNavOpen: (open: boolean) => void;
  isMobile: boolean;
}
