import type { SharedDoc } from "content/types";

export interface HeaderRightProps {
  navigation?: SharedDoc | null;
  isNavOpen: boolean;
  setIsNavOpen: (open: boolean) => void;
  isMobile: boolean;
}

export interface HeaderLeftProps {
  navigation?: SharedDoc | null;
  isNavOpen: boolean;
  setIsNavOpen: (open: boolean) => void;
  isMobile: boolean;
}
