import SliceData from "@/components/dev/SliceData";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `StarSection`.
 */
export type StarSectionProps = SliceComponentProps<Content.StarSectionSlice>;

/**
 * @todo Implement `StarSection` component.
 */
const StarSection = ({ slice }: StarSectionProps): JSX.Element => (
  <>
    <SliceData slice={slice} hidden />
  </>
);

export default StarSection;
