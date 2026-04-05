"use client";

import { components } from "../../slices";
import type { ClientSliceZoneProps } from "../types/slices";
import type { Slice, PageDoc } from "content/types";

type SliceComponent = (props: { slice: Slice; context?: PageDoc }) => JSX.Element | null;
const componentMap = components as unknown as Record<string, SliceComponent | undefined>;

export default function ClientSliceZone({
  slices,
  context,
}: ClientSliceZoneProps) {
  return (
    <>
      {slices.map((slice, i) => {
        if (!slice.type) return null;
        const Component = componentMap[slice.type];
        if (!Component) return null;
        return (
          <Component
            key={(slice.section_id as string) || slice.type + i}
            slice={slice}
            context={context}
          />
        );
      })}
    </>
  );
}
