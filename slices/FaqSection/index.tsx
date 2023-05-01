import SliceData from "@/components/dev/SliceData";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `FaqSection`.
 */
export type FaqSectionProps = SliceComponentProps<Content.FaqSectionSlice>;

const FaqSection = ({ slice }: FaqSectionProps): JSX.Element => (
  <section>
    <SliceData slice={slice} />
  </section>
);

export default FaqSection;
