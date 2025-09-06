/**
 * Modal Component Types
 *
 * Type definitions for modal overlays and form interactions.
 */

// Form overlay props
export interface FormOverlayProps {
  className?: string;
  toggleModalOverlay?: () => void;
  // Allow for additional props from page data
  [key: string]: unknown;
}

// Modal context types
export interface ModalContextType {
  modalOverlay: boolean;
  toggleModalOverlay: () => void;
}

// Form overlay content types based on pathname
export type FormOverlayContentType = "inquire" | "thanks" | "map" | "default";
