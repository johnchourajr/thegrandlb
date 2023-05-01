import SliceData from "@/components/dev/SliceData";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `NumbersSection`.
 */
export type NumbersSectionProps =
  SliceComponentProps<Content.NumbersSectionSlice>;

const NumbersSection = ({ slice }: NumbersSectionProps): JSX.Element => (
  <section>
    <SliceData slice={slice} />
  </section>
);

export default NumbersSection;
