import { GridSection } from "@/components/GridSection";
import MediaFrame from "@/components/media-frame";
import MotionBox from "@/components/MotionBox";
import type { SliceComponentProps } from "@/types/slices";
import type { ImageSectionSlice } from "../slice-types";
import clsx from "clsx";

const ImageSection = ({
  slice,
}: SliceComponentProps<ImageSectionSlice>): JSX.Element => {
  const { section_id, top_spacer, bottom_spacer, media, video_url, gallery } =
    slice;
  return (
    <>
      <GridSection
        id={section_id}
        topSpacer={top_spacer}
        bottomSpacer={bottom_spacer}
      >
        <MotionBox
          className={clsx(
            "relative col-span-full col-start-1 flex aspect-square w-full flex-col items-center justify-center gap-10 overflow-hidden rounded-sm bg-black px-4 text-center text-white md:aspect-[16/7] md:rounded-md"
          )}
        >
          <MediaFrame
            media={media}
            video_url={video_url}
            gallery={gallery}
            className="absolute inset-0 h-full w-full"
          />
        </MotionBox>
      </GridSection>
    </>
  );
};

export default ImageSection;
