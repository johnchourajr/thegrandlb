/**
 * Map Component Types
 */

export type MapItem = {
  key: string;
  letter: string;
  name: string;
  attributes: string[];
};

export type MapItemKey = string | null;

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

export type TourSpace = {
  page?: {
    uid?: string | null;
    data?: {
      title?: string | null;
      max_capacity?: number | null;
      features?: { feature?: string | null }[];
    };
  } | null;
};

export type MapContainerProps = {
  tourSpaces?: TourSpace[];
  [key: string]: unknown;
};

export type MapComponentProps = {
  className?: string;
  hoveredItemKey: MapItemKey;
  onMapAreaHover: (itemKey: MapItemKey) => void;
  selectedItemKey: MapItemKey;
  onItemSelect: (itemKey: string) => void;
};

export type ConvertToMapItemFn = (space: TourSpace, letter: string) => MapItem | null;
