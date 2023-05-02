import SliceData from "@/components/dev/SliceData";
import { GridSection } from "@/components/GridSection";
import MediaFrame from "@/components/media-frame";
import MotionBox from "@/components/MotionBox";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";

/**
 * Props for `ImageSection`.
 */
export type ImageSectionProps = SliceComponentProps<Content.ImageSectionSlice>;

/**
 * Component for "ImageSection" Slices.
 */
const ImageSection = ({ slice }: ImageSectionProps): JSX.Element => {
  const {
    data: { gallery_items },
  } = slice.primary.gallery as any;

  return (
    <>
      <GridSection
        id={slice.primary.section_id}
        bottomSpacer={slice.primary.bottom_spacer}
        topSpacer={slice.primary.top_spacer}
      >
        <MotionBox
          className={clsx(
            "relative col-span-full col-start-1 flex aspect-square w-full flex-col items-center justify-center gap-10 overflow-hidden rounded-sm bg-black px-4 text-center text-white lg:aspect-[16/7] lg:rounded-md"
          )}
        >
          <MediaFrame
            media={slice.primary.media}
            video_media={slice.primary.video_media}
            gallery={gallery_items}
            className="absolute inset-0 h-full w-full"
          />
        </MotionBox>
      </GridSection>
      <SliceData slice={slice} hidden />
    </>
  );
};

export default ImageSection;
