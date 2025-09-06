import type { Content } from "@prismicio/client";
import type { MapItem, PrismicTourSpace } from "../types/map";

/**
 * Map Utility Functions
 *
 * Helper functions for converting between Prismic data and map item formats.
 */

/**
 * Converts Prismic tour space data to MapItem format
 * @param prismicSpace - Prismic tour space data
 * @param letter - Letter identifier for the space (A, B, C, etc.)
 * @returns MapItem or null if conversion fails
 */
export const convertPrismicToMapItem = (
  prismicSpace: PrismicTourSpace,
  letter: string
): MapItem | null => {
  const tourPage = prismicSpace.page as unknown as Content.TourPageDocument;
  if (!tourPage || !tourPage.uid || !tourPage.data.title) {
    return null;
  }

  const attributes: string[] = [];

  // Add max capacity if available
  if (tourPage.data.max_capacity) {
    attributes.push(`${tourPage.data.max_capacity} Max Guests`);
  }

  // Add features if available
  if (tourPage.data.features) {
    tourPage.data.features.forEach((featureItem) => {
      if (featureItem.feature) {
        attributes.push(featureItem.feature);
      }
    });
  }

  return {
    key: tourPage.uid,
    letter,
    name: tourPage.data.title,
    attributes,
  };
};

/**
 * Generates letter identifiers for map items (A, B, C, etc.)
 * @param index - Zero-based index
 * @returns Letter string
 */
export const generateMapLetter = (index: number): string => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return letters[index] || `${Math.floor(index / 26)}${letters[index % 26]}`;
};
