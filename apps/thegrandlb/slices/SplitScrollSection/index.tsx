import { GridSection } from "@/components/GridSection";
import MediaFrame from "@/components/media-frame";
import MotionBox from "@/components/MotionBox";
import { NumberItem } from "@/components/NumberItem";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import { Fragment } from "react";

/**
 * @typedef {import("@prismicio/client").Content.SplitScrollSectionSlice} SplitScrollSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SplitScrollSectionSlice>} SplitScrollSectionProps
 * @param { SplitScrollSectionProps }
 */

/**
 * Props for `SplitScrollSection`.
 */
export type SplitScrollSectionProps = SliceComponentProps<
  Content.SplitScrollSectionSlice | any
>;

const SplitScrollSection = ({
  slice,
}: SplitScrollSectionProps): JSX.Element => {
  const {
    section_id,
    top_spacer = "Medium",
    bottom_spacer = "",
    gallery,
    video_media,
    media,
    asset_position,
  } = slice.primary;
  const { items } = slice;

  const getAssetPosition = (asset_position: boolean) => {
    switch (asset_position) {
      case true:
        return "lg:col-start-7";
      case false:
        return "lg:col-start-1";
      default:
        return "lg:col-start-7";
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
        <MotionBox className="padding-top-lg padding-bottom-lg gap-y-lg col-span-full flex flex-col items-center justify-center lg:col-span-6 lg:col-start-auto lg:row-start-1">
          {items.map((item: any, index: number) => {
            return (
              <Fragment key={index}>
                <NumberItem number={item.headline} {...(item as any)} />
                {index != items.length - 1 && (
                  <div
                    key={index + 10}
                    className={
                      "padding-top-lg padding-bottom-lg w-[3px] flex-grow rotate-45 rounded-md bg-white"
                    }
                  />
                )}
              </Fragment>
            );
          })}
        </MotionBox>
        <MotionBox
          className={clsx(
            "relative col-span-full row-start-1 aspect-square overflow-hidden rounded-sm bg-black md:aspect-[4/3] md:rounded-md lg:sticky lg:top-[9.5rem] lg:col-span-6 lg:aspect-auto lg:h-[100vh] lg:max-h-[calc(100vh-9rem-2rem)] ",
            getAssetPosition(asset_position)
          )}
        >
          <MediaFrame
            gallery={gallery}
            video_media={video_media}
            media={media}
            className="absolute inset-0 h-full w-full overflow-hidden"
          />
        </MotionBox>
      </GridSection>
    </>
  );
};

export default SplitScrollSection;
