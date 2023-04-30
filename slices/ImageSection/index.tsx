import SliceData from "@/components/dev/SliceData";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ImageSection`.
 */
export type ImageSectionProps = SliceComponentProps<Content.ImageSectionSlice>;

/**
 * Component for "ImageSection" Slices.
 */
const ImageSection = ({ slice }: ImageSectionProps): JSX.Element => {
  return (
    <section>
      <SliceData slice={slice} />
    </section>
  );
};

export default ImageSection;
