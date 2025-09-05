"use client";

import { SliceZone } from "@prismicio/react";
import { components } from "../../slices";

type ClientSliceZoneProps = {
  slices: any[];
  context?: any;
};

export default function ClientSliceZone({ slices, context }: ClientSliceZoneProps) {
  return <SliceZone slices={slices} components={components} context={context} />;
}
