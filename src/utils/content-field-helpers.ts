import { toText } from "./rich-text";

/**
 * Helper utilities for extracting values from static content fields safely.
 */

/**
 * Safely extracts text value from a key/text field.
 */
export const getKeyText = (field: any): string | undefined => {
  return field || undefined;
};

/**
 * Safely extracts select value from a select field.
 */
export const getSelectValue = <T extends string>(field: any): T | undefined => {
  return field || undefined;
};

/**
 * Safely extracts rich text as plain string.
 */
export const getRichTextAsString = (field: any): string => {
  return toText(field);
};

/**
 * Safely extracts image field — returns undefined if no url present.
 */
export const getImageField = (field: any) => {
  if (!field || typeof field !== "object") return undefined;
  if ("url" in field && field.url) return field;
  return undefined;
};

/**
 * Safely extracts link field — returns undefined if no link_type present.
 */
export const getLinkField = (field: any) => {
  if (!field || typeof field !== "object") return undefined;
  if ("link_type" in field) return field;
  return undefined;
};
