import SliceData from "@/components/dev/SliceData";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `StarSection`.
 */
export type StarSectionProps = SliceComponentProps<Content.StarSectionSlice>;

const StarSection = ({ slice }: StarSectionProps): JSX.Element => (
  <section>
    <SliceData slice={slice} />
  </section>
);

export default StarSection;
