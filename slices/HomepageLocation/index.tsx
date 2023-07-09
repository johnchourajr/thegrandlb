import SliceData from "@/components/dev/SliceData";
import { GridSection } from "@/components/GridSection";
import Headline from "@/components/Headline";
import MediaFrame from "@/components/media-frame";
import MotionBox from "@/components/MotionBox";
import { NumberItem } from "@/components/NumberItem";
import Text from "@/components/Paragraph";
import StringText from "@/components/StringText";
import { Content } from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import { TileItem } from "slices/TileGrid/TileItem";

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
            "relative col-span-full col-start-1 flex aspect-square w-full flex-col items-center justify-center gap-10 overflow-hidden rounded-sm bg-black px-4 text-center text-white lg:aspect-[16/7] lg:rounded-md"
          )}
        >
          <MediaFrame video_media={video_media} media={media} />
        </MotionBox>
        <MotionBox className="col-span-full pt-10 pb-0 xl:col-span-5 xl:col-start-2 xl:pb-20">
          <Headline size={"xl"} className={"max-w-[7em]"} animateOnce>
            {prismicH.asText(title)}
          </Headline>
        </MotionBox>
        <MotionBox className="col-span-full pb-12 xl:col-span-5 xl:col-start-auto xl:mt-4 xl:pt-16">
          <Text paragraph className="max-w-[35em]">
            {prismicH.asText(description)}
          </Text>
        </MotionBox>
      </GridSection>
      <GridSection
        id={`${section_id}-2`}
        topSpacer={"None"}
        bottomSpacer={"None"}
        className={clsx("border-t-2 border-b-2 border-white !py-12 xl:!py-0")}
        overflowHidden={false}
      >
        <MotionBox className="col-span-full self-center xl:col-span-3 xl:col-start-2">
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
              "relative z-10 col-span-full mt-[-2px] mb-[-2px] !h-[12vw] !border-red xl:col-span-7 xl:col-start-auto 3xl:!h-56 "
            }
          />
        )}
      </GridSection>
      <GridSection
        id={`${section_id}-3`}
        topSpacer={"Small"}
        bottomSpacer={bottom_spacer}
        className={"pt-10 xl:pt-20"}
      >
        {bullet_list_data && (
          <MotionBox className="col-span-full flex flex-col items-center justify-evenly gap-10 xl:col-span-8 xl:col-start-3 xl:flex-row xl:gap-6">
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
      <SliceData slice={slice} hidden />
    </>
  );
};

export default HomepageLocation;
