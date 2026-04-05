import type { Slice, PageDoc } from "content/types";

export interface SliceZoneProps {
  slices: Slice[];
  context?: PageDoc;
}

export interface ClientSliceZoneProps {
  slices: Slice[];
  context?: PageDoc;
}

export type SliceComponentProps<T = Slice> = {
  slice: T;
  context?: PageDoc;
};

export interface SliceDataProps {
  slice?: { type?: string; [key: string]: unknown };
  hidden?: boolean;
}
