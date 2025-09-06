import type { Content } from "@prismicio/client";
import type { ReactNode } from "react";

/**
 * Layout Component Types
 *
 * Type definitions for layout components and page structure.
 */

// Main layout component props
export interface LayoutProps {
  settings?: Content.SettingsDocument;
  navigation?: Content.NavLinksDocument | null;
  headContent?: ReactNode;
  children?: ReactNode;
  page?: Content.AllDocumentTypes;
  className?: string;
  wrapperClassName?: string;
  /** @deprecated no longer used */
  hidePageUid?: boolean;
}

// Header component props
export interface HeaderProps {
  navigation?: Content.NavLinksDocument | null;
}

// Footer component props
export interface FooterProps {
  settings?: Content.SettingsDocument;
  navigation?: Content.NavLinksDocument | null;
}

// Layout head component props
export interface LayoutHeadProps {
  page?: Content.AllDocumentTypes;
  settings?: Content.SettingsDocument;
  headContent?: ReactNode;
}
