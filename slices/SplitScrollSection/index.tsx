import SliceData from "@/components/dev/SliceData";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.SplitScrollSectionSlice} SplitScrollSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SplitScrollSectionSlice>} SplitScrollSectionProps
 * @param { SplitScrollSectionProps }
 */

/**
 * Props for `SplitScrollSection`.
 */
export type SplitScrollSectionProps =
  SliceComponentProps<Content.SplitScrollSectionSlice>;

const SplitScrollSection = ({
  slice,
}: SplitScrollSectionProps): JSX.Element => (
  <section>
    <SliceData slice={slice} />
  </section>
);

export default SplitScrollSection;
