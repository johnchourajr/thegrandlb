"use client";

import type { SliceZoneLike } from "@prismicio/react";
import { SliceZone } from "@prismicio/react";
import { components } from "../../slices";
import type { ClientSliceZoneProps } from "../types/slices";

export default function ClientSliceZone({
  slices,
  context,
}: ClientSliceZoneProps) {
  return (
    <SliceZone
      slices={slices as SliceZoneLike}
      components={components}
      context={context}
    />
  );
}
