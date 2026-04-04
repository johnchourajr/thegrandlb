import type { Slice, PageDoc } from "content/types";

export interface SliceZoneProps {
  slices: Slice[];
  context?: PageDoc;
}

export interface ClientSliceZoneProps {
  slices: Slice[];
  context?: PageDoc;
}

export type SliceComponentProps<T = unknown> = {
  slice: T;
  context?: PageDoc;
};

export interface SliceDataProps {
  slice?: { slice_type?: string; [key: string]: unknown };
  hidden?: boolean;
}
