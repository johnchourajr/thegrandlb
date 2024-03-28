import { GridSection } from "@/components/GridSection";
import Headline from "@/components/Headline";
import ImageBox from "@/components/media-frame/ImageBox";
import StringText from "@/components/StringText";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";

/**
 * Props for `TeamGallery`.
 */
export type TeamGalleryProps = SliceComponentProps<
  Content.TeamGallerySlice | any
>;

/**
 * Component for "TeamGallery" Slices.
 */
const TeamGallery = ({ slice }: TeamGalleryProps): JSX.Element => {
  const { items, primary } = slice as any;
  const { section_id, top_spacer, bottom_spacer } = primary as any;
  return (
    <>
      <GridSection
        id={section_id}
        className={clsx("max-w-[2000px] flex-col gap-8 md:gap-12")}
        topSpacer={top_spacer}
        bottomSpacer={bottom_spacer}
      >
        {items &&
          items.map(
            (
              { name, position, primary_media, secondary_media }: any,
              index: number
            ) => {
              return (
                <div
                  key={index}
                  className={clsx(
                    "3lg:col-span-3 group relative col-span-full flex flex-col items-center gap-6 p-4 text-center sm:col-span-2 md:p-4 lg:col-span-4",
                    "after:absolute after:inset-0 after:z-0 after:rounded-xl after:bg-white after:transition-all after:duration-500 after:ease-out-expo after:content-['']",
                    "hover:after:inset-[-2px]"
                  )}
                >
                  <div
                    className={clsx(
                      "relative aspect-[3/4] h-auto w-full overflow-hidden rounded-sm bg-black"
                    )}
                  >
                    {primary_media?.url && (
                      <ImageBox
                        media={primary_media}
                        className={clsx(
                          "absolute z-20 h-full w-full object-cover transition-all duration-500 ease-out-expo",
                          "group-hover:scale-[1.05]",
                          secondary_media?.url &&
                            "group-hover:invisible group-hover:opacity-0"
                        )}
                      />
                    )}
                    {secondary_media?.url && (
                      <ImageBox
                        media={secondary_media}
                        className={clsx(
                          "absolute z-10 h-full w-full object-cover transition-all duration-500 ease-out-expo",
                          "group-hover:scale-[1.05]",
                          "group-hover:visible"
                        )}
                      />
                    )}
                    <div className="noise" />
                  </div>
                  <div className="relative z-10 flex flex-col items-center gap-4 pb-3">
                    <Headline disableMotion size={"sm"} uppercase>
                      {name}
                    </Headline>
                    <StringText size={"default"} uppercase>
                      {position}
                    </StringText>
                  </div>
                </div>
              );
            }
          )}
      </GridSection>
    </>
  );
};

export default TeamGallery;
