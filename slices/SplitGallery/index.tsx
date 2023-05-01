import SliceData from "@/components/dev/SliceData";
import { GridSection } from "@/components/GridSection";
import ImageGallery from "@/components/media-frame/ImageGallery";
import MotionBox from "@/components/MotionBox";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";

/**
 * Props for `SplitGallery`.
 */
export type SplitGalleryProps = SliceComponentProps<Content.SplitGallerySlice>;

const SplitGallery = ({ slice }: SplitGalleryProps): JSX.Element => {
  const { gallery_left, gallery_right } = slice.primary;
  const { data: galleryLeftData } = gallery_left as any;
  const { data: galleryRightData } = gallery_right as any;

  return (
    <>
      <GridSection
        id={slice.primary.section_id}
        bottomSpacer={slice.primary.bottom_spacer}
        topSpacer={slice.primary.top_spacer}
        className={clsx("!gap-0")}
      >
        {gallery_left && (
          <MotionBox
            className={clsx("col-span-full md:col-span-2 xl:col-span-6")}
          >
            <ImageGallery
              images={galleryLeftData.gallery_items}
              cycleDuration={6000}
              controlPosition="Bottom Left"
              outerControls={true}
              className={clsx("aspect-square", "!rounded-br-none")}
            />
          </MotionBox>
        )}
        {gallery_right && (
          <MotionBox
            className={clsx(
              "col-span-full md:col-span-2 md:pt-20 lg:pt-24 xl:col-span-6 xl:pt-28"
            )}
          >
            <ImageGallery
              images={galleryRightData.gallery_items}
              delayStart={6000 / 2}
              cycleDuration={6000}
              autoPlay={false}
              controlPosition="Top Right"
              outerControls={true}
              className={clsx("aspect-square", "!rounded-tl-none")}
            />
          </MotionBox>
        )}
      </GridSection>
      <SliceData slice={slice} hidden />
    </>
  );
};

export default SplitGallery;
