import { GridSection } from "@/components/GridSection";
import Headline from "@/components/Headline";
import { MuxVideoPlayer } from "@/components/media-frame/MuxVideoPlayer";
import MotionBox from "@/components/MotionBox";
import { NumberItem } from "@/components/NumberItem";
import Text from "@/components/Paragraph";
import StringText from "@/components/StringText";
import { Content } from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import { TileItem } from "slices/TileGrid/TileItem";

import communityVideo from "videos/Community Section 30s--final.mp4";

/**
 * Props for `HomepageLocation`.
 */
export type HomepageLocationProps = SliceComponentProps<
  Content.HomepageLocationSlice | any
>;

const HomepageLocation = ({ slice }: HomepageLocationProps): JSX.Element => {
  const {
    section_id,
    gallery,
    video_media,
    media,
    caption,
    title,
    description,
    top_spacer,
    bottom_spacer,
    address_label,
    address,
    action_text,
    action_link,
    bullet_list,
  } = slice.primary;

  const {
    data: { bullet_list: bullet_list_data },
  } = bullet_list as any;

  return (
    <>
      <GridSection id={section_id} topSpacer={top_spacer} bottomSpacer={"None"}>
        <MotionBox
          className={clsx(
            "relative col-span-full col-start-1 flex aspect-square w-full flex-col items-center justify-center gap-10 overflow-hidden rounded-sm bg-black px-4 text-center text-white md:aspect-[16/7] md:rounded-md"
          )}
        >
          {/* <MediaFrame video_media={video_media} media={media} /> */}
          <MuxVideoPlayer
            video={communityVideo}
            className="absolute inset-0 z-0 h-full w-full"
          />
        </MotionBox>
        <MotionBox className="col-span-full pb-0 pt-10 lg:col-span-5 lg:col-start-2 lg:pb-20">
          <Headline size={"xl"} className={"max-w-[7em]"} animateOnce>
            {prismicH.asText(title)}
          </Headline>
        </MotionBox>
        <MotionBox className="col-span-full pb-12 lg:col-span-5 lg:col-start-auto lg:mt-4 lg:pt-16">
          <Text paragraph className="max-w-[35em]">
            {prismicH.asText(description)}
          </Text>
        </MotionBox>
      </GridSection>
      <GridSection
        id={`${section_id}-2`}
        topSpacer={"None"}
        bottomSpacer={"None"}
        className={clsx("border-b-2 border-t-2 border-white !py-12 lg:!py-0")}
        overflowHidden={false}
      >
        <MotionBox className="col-span-full self-center lg:col-span-3 lg:col-start-2">
          {address_label && (
            <StringText
              size={"small"}
              className={"mb-4 max-w-[7em]"}
              uppercase
              bold
            >
              {address_label}
            </StringText>
          )}
          {prismicH.asText(address) && (
            <PrismicRichText
              field={address}
              components={{
                paragraph: ({ children }) => (
                  <Text
                    size="large"
                    paragraph
                    className="max-w-[35em] whitespace-normal "
                  >
                    {children}
                  </Text>
                ),
              }}
            />
          )}
        </MotionBox>
        {action_link && action_text && (
          <TileItem
            link={action_link}
            headline={action_text}
            theme={"Outlined"}
            className={
              "3lg:!h-56 relative z-10 col-span-full mb-[-2px] mt-[-2px] !h-[12vw] !border-red lg:col-span-7 lg:col-start-auto "
            }
          />
        )}
      </GridSection>
      <GridSection
        id={`${section_id}-3`}
        topSpacer={"Small"}
        bottomSpacer={bottom_spacer}
        className={"pt-10 lg:pt-20"}
      >
        {bullet_list_data && (
          <MotionBox className="col-span-full flex flex-col items-center justify-evenly gap-10 lg:col-span-8 lg:col-start-3 lg:flex-row lg:gap-6">
            {bullet_list_data.map(
              (
                { media, number, eyebrow, body, action_text, action_link }: any,
                i: number
              ) => {
                return (
                  <NumberItem
                    key={i}
                    media={media}
                    number={number}
                    eyebrow={eyebrow}
                    body={body}
                    action_text={action_text}
                    action_link={action_link}
                  />
                );
              }
            )}
          </MotionBox>
        )}
      </GridSection>
    </>
  );
};

export default HomepageLocation;
