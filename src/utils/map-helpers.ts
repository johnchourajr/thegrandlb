import type { MapItem, TourSpace } from "../types/map";

/**
 * Converts tour space data to MapItem format.
 */
export const convertPrismicToMapItem = (
  space: TourSpace,
  letter: string
): MapItem | null => {
  const page = space.page;
  if (!page || !page.uid || !page.data?.title) return null;

  const attributes: string[] = [];

  if (page.data.max_capacity) {
    attributes.push(`${page.data.max_capacity} Max Guests`);
  }

  if (page.data.features) {
    for (const item of page.data.features) {
      if (item.feature) attributes.push(item.feature);
    }
  }

  return {
    key: page.uid,
    letter,
    name: page.data.title,
    attributes,
  };
};

/**
 * Generates letter identifiers for map items (A, B, C, etc.)
 */
export const generateMapLetter = (index: number): string => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return letters[index] || `${Math.floor(index / 26)}${letters[index % 26]}`;
};
