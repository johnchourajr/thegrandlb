import * as prismicH from "@prismicio/helpers";

/**
 * Prismic Helper Utilities
 *
 * Helper functions for extracting values from Prismic fields safely.
 */

/**
 * Safely extracts text value from Prismic KeyTextField
 */
export const getKeyText = (field: any): string | undefined => {
  return field || undefined;
};

/**
 * Safely extracts select value from Prismic SelectField
 */
export const getSelectValue = <T extends string>(field: any): T | undefined => {
  return field || undefined;
};

/**
 * Safely extracts rich text as plain string from Prismic RichTextField
 */
export const getRichTextAsString = (field: any): string => {
  if (!field) return "";
  try {
    return prismicH.asText(field) || "";
  } catch {
    return "";
  }
};

/**
 * Safely extracts image field from Prismic ImageField
 */
export const getImageField = (field: any) => {
  return field && !prismicH.isFilled.image(field) ? undefined : field;
};

/**
 * Safely extracts link field from Prismic LinkField
 */
export const getLinkField = (field: any) => {
  return field && !prismicH.isFilled.link(field) ? undefined : field;
};
