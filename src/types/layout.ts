import type { PageDoc, SharedDoc } from "content/types";
import type { ReactNode } from "react";

export interface LayoutProps {
  settings?: SharedDoc;
  navigation?: SharedDoc | null;
  headContent?: ReactNode;
  children?: ReactNode;
  page?: PageDoc | { uid: string; data: Record<string, unknown> };
  className?: string;
  wrapperClassName?: string;
  /** @deprecated no longer used */
  hidePageUid?: boolean;
}

export interface HeaderProps {
  navigation?: SharedDoc | null;
}

export interface FooterProps {
  settings?: SharedDoc;
  navigation?: SharedDoc | null;
}

export interface LayoutHeadProps {
  page?: PageDoc | { uid?: string; data?: Record<string, unknown> };
  settings?: SharedDoc;
  headContent?: ReactNode;
}
