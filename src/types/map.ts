import type { Content } from "@prismicio/client";

/**
 * Map Component Types
 *
 * Type definitions for the interactive venue map functionality.
 * These types work with both hardcoded fallback data and Prismic tour space data.
 */

// Core map item structure
export type MapItem = {
  key: string;
  letter: string;
  name: string;
  attributes: string[];
};

export type MapItemKey = string | null;

// Component prop types
export type ItemSelectedProps = {
  filteredItem: MapItem | false;
};

export type ItemListProps = {
  items: MapItem[];
  hoveredItemKey: MapItemKey;
  onItemHover: (itemKey: MapItemKey) => void;
  selectedItemKey: MapItemKey;
  onItemSelect: (itemKey: string) => void;
};

export type MapContainerProps = {
  // Allow for future extension with Prismic data
  tourSpaces?: Content.TourIndexPageDocumentDataSpacesItem[];
  // Additional props for integration with Prismic
  [key: string]: unknown;
};

export type MapComponentProps = {
  className?: string;
  hoveredItemKey: MapItemKey;
  onMapAreaHover: (itemKey: MapItemKey) => void;
  selectedItemKey: MapItemKey;
  onItemSelect: (itemKey: string) => void;
};

// Prismic integration types
export type PrismicTourSpace = Content.TourIndexPageDocumentDataSpacesItem;
export type PrismicTourPage = Content.TourPageDocument;

// Utility function type for converting Prismic data
export type ConvertPrismicToMapItemFn = (
  prismicSpace: PrismicTourSpace,
  letter: string
) => MapItem | null;
