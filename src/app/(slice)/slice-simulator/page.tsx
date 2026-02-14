"use client";

import { SliceZone } from "@prismicio/react";
import { SliceSimulator } from "@slicemachine/adapter-next/simulator";
import { useEffect, useMemo, useState } from "react";
import { components } from "../../../../slices";
import { SliceSimulatorErrorBoundary } from "./SliceSimulatorErrorBoundary";

type SliceLike = { slice_type?: string; type?: string; id?: string };

function wrapSliceComponents(
  comps: Record<string, React.ComponentType<any>>
): Record<string, React.ComponentType<any>> {
  const wrapped: Record<string, React.ComponentType<any>> = {};
  for (const [type, Comp] of Object.entries(comps)) {
    wrapped[type] = function WrappedSlice(props: {
      slice: SliceLike;
      index?: number;
      slices?: unknown[];
      context?: unknown;
    }) {
      const sliceType = props.slice?.slice_type ?? props.slice?.type ?? type;
      const sliceId = props.slice?.id;
      return (
        <SliceSimulatorErrorBoundary sliceType={sliceType} sliceId={sliceId}>
          <Comp {...props} />
        </SliceSimulatorErrorBoundary>
      );
    };
  }
  return wrapped;
}

export default function SliceSimulatorPage() {
  const [mounted, setMounted] = useState(false);
  const wrappedComponents = useMemo(() => wrapSliceComponents(components), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="text-gray-600 flex min-h-[50vh] items-center justify-center font-sans">
        Loading slice simulator…
      </div>
    );
  }

  return (
    <SliceSimulatorErrorBoundary>
      <div className="min-h-[500px]">
        <SliceSimulator
          sliceZone={({ slices }) => (
            <SliceZone slices={slices} components={wrappedComponents} />
          )}
        />
      </div>
    </SliceSimulatorErrorBoundary>
  );
}
