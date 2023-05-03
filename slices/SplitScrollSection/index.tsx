import SliceData from "@/components/dev/SliceData";
import { GridSection } from "@/components/GridSection";
import MediaFrame from "@/components/media-frame";
import MotionBox from "@/components/MotionBox";
import { NumberItem } from "@/components/NumberItem";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";

/**
 * @typedef {import("@prismicio/client").Content.SplitScrollSectionSlice} SplitScrollSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SplitScrollSectionSlice>} SplitScrollSectionProps
 * @param { SplitScrollSectionProps }
 */

/**
 * Props for `SplitScrollSection`.
 */
export type SplitScrollSectionProps =
  SliceComponentProps<Content.SplitScrollSectionSlice>;

const SplitScrollSection = ({
  slice,
}: SplitScrollSectionProps): JSX.Element => {
  const {
    section_id,
    top_spacer,
    bottom_spacer,
    gallery,
    video_media,
    media,
    asset_position,
  } = slice.primary;
  const { items } = slice;

  // true is right

  const getAssetPosition = (asset_position: boolean) => {
    switch (asset_position) {
      case true:
        return "xl:col-start-7";
      case false:
        return "xl:col-start-1";
      default:
        return "xl:col-start-7";
    }
  };

  return (
    <>
      <GridSection
        id={section_id || slice.id}
        bottomSpacer={bottom_spacer || "Medium"}
        topSpacer={top_spacer || "Medium"}
        overflowHidden={false}
      >
        <MotionBox className="padding-top-lg padding-bottom-lg gap-y-md col-span-full flex flex-col items-center justify-center xl:col-span-6 xl:col-start-auto xl:row-start-1">
          {items.map((item, index: number) => {
            return (
              <>
                <NumberItem
                  number={item.headline}
                  {...(item as any)}
                  key={index}
                />
                {index != items.length - 1 && (
                  <div
                    key={index + 10}
                    className={
                      "padding-top-lg padding-bottom-lg w-[3px] flex-grow rotate-45 rounded-md bg-white"
                    }
                  />
                )}
              </>
            );
          })}
        </MotionBox>
        <MediaFrame
          className={clsx(
            "top-[9.5rem] col-span-full row-start-1 aspect-square overflow-hidden rounded-sm bg-white lg:max-h-[calc(100vh-9rem-2rem)] lg:rounded-md xl:sticky xl:col-span-6 xl:aspect-auto xl:h-[100vh]",
            getAssetPosition(asset_position)
          )}
          gallery={gallery}
          video_media={video_media}
          media={media}
        />
      </GridSection>
      <SliceData slice={slice} hidden />
    </>
  );
};

export default SplitScrollSection;
