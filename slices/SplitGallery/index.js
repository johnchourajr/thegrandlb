import SliceData from "@/components/dev/SliceData";
import { GridSection } from "@/components/GridSection";
import ImageGallery from "@/components/media-frame/ImageGallery";
import MotionBox from "@/components/MotionBox";
import clsx from "clsx";

/**
 * @typedef {import("@prismicio/client").Content.SplitGallerySlice} SplitGallerySlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SplitGallerySlice>} SplitGalleryProps
 * @param { SplitGalleryProps }
 */
const SplitGallery = ({ slice }) => (
  <>
    <GridSection
      bottomSpacer={slice.primary.bottom_spacer}
      topSpacer={slice.primary.top_spacer}
      className={clsx("!gap-0")}
    >
      {slice.primary.gallery_left && (
        <MotionBox
          className={clsx("col-span-full md:col-span-2 xl:col-span-6")}
        >
          <ImageGallery
            images={slice.primary.gallery_left.data.gallery_items}
            cycleDuration={6000}
            controlPosition="Bottom Left"
            outerControls={true}
            className={clsx("aspect-square", "!rounded-br-none")}
          />
        </MotionBox>
      )}
      {slice.primary.gallery_right && (
        <MotionBox
          className={clsx(
            "col-span-full md:col-span-2 md:pt-20 lg:pt-24 xl:col-span-6 xl:pt-28"
          )}
        >
          <ImageGallery
            images={slice.primary.gallery_right.data.gallery_items}
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

export default SplitGallery;
