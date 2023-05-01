import SliceData from "@/components/dev/SliceData";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `TextSection`.
 */
export type TextSectionProps = SliceComponentProps<Content.TextSectionSlice>;

const TextSection = ({ slice }: TextSectionProps): JSX.Element => (
  <section>
    <SliceData slice={slice} />
  </section>
);

export default TextSection;
