import type { Content } from "@prismicio/client";

/**
 * Slice Component Types
 *
 * Type definitions for slice zone rendering and slice components.
 */

// Generic slice zone props
export interface SliceZoneProps {
  slices:
    | Content.PageDocument["data"]["slices"]
    | Content.TourIndexPageDocument["data"]["slices"]
    | Content.EventIndexPageDocument["data"]["slices"]
    | Content.TourPageDocument["data"]["slices"]
    | Content.EventPageDocument["data"]["slices"];
  context?: Content.AllDocumentTypes;
}

// Client-side slice zone props
export interface ClientSliceZoneProps {
  slices:
    | Content.PageDocument["data"]["slices"]
    | Content.TourIndexPageDocument["data"]["slices"]
    | Content.EventIndexPageDocument["data"]["slices"]
    | Content.TourPageDocument["data"]["slices"]
    | Content.EventPageDocument["data"]["slices"];
  context?: Content.AllDocumentTypes;
}

// Individual slice component base props
export type SliceComponentProps<T = unknown> = {
  slice: T;
  context?: Content.AllDocumentTypes;
};

// Development slice data component
export interface SliceDataProps {
  slice?: { slice_type?: string; [key: string]: unknown };
  hidden?: boolean;
}
