import SliceData from "@/components/dev/SliceData";
import { GridSection } from "@/components/GridSection";
import Headline from "@/components/Headline";
import MotionBox from "@/components/MotionBox";
import { NumberItem } from "@components/NumberItem";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { TileItem } from "slices/TileGrid/TileItem";

/**
 * Props for `HomepageNumbers`.
 */
export type HomepageNumbersProps =
  SliceComponentProps<Content.HomepageNumbersSlice>;

const HomepageNumbers = ({ slice }: HomepageNumbersProps): JSX.Element => {
  const {
    data: { bullet_list, numberlist, primary_action_link, primary_action },
  } = slice.primary.number_list as any;

  // console.log({ bullet_list });

  return (
    <>
      <GridSection
        id={slice.primary.section_id || ""}
        bottomSpacer={slice.primary.bottom_spacer || null}
        topSpacer={slice.primary.top_spacer || null}
        className={"!gap-y-28 xl:!gap-y-32"}
      >
        {slice.primary.title && (
          <Headline
            className="col-span-full text-center"
            size="lg"
            uppercase
            animateOnce
          >
            {slice.primary.title}
          </Headline>
        )}
        {numberlist && (
          <MotionBox className="col-span-full flex flex-col items-center justify-evenly gap-10 xl:col-span-10 xl:col-start-2 xl:flex-row xl:gap-20">
            {numberlist.map(
              (
                { number, eyebrow, body, action_text, action_link }: any,
                i: number
              ) => {
                return (
                  <>
                    <NumberItem
                      key={i}
                      number={number}
                      eyebrow={eyebrow}
                      body={body}
                      action_text={action_text}
                      action_link={action_link}
                    />
                    {i != numberlist.length - 1 && (
                      <div
                        key={i + 10}
                        className={
                          "h-20 w-[3px] flex-grow rounded-md bg-white xl:h-[3px] xl:w-full"
                        }
                      />
                    )}
                  </>
                );
              }
            )}
          </MotionBox>
        )}
        {bullet_list && (
          <MotionBox className="col-span-full flex flex-col items-center justify-evenly gap-10 xl:col-span-8 xl:col-start-3 xl:flex-row xl:gap-6">
            {bullet_list.map(
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
        {primary_action_link && primary_action && (
          <TileItem
            link={primary_action_link}
            headline={primary_action}
            theme={"Outlined"}
            className={
              "col-span-full !h-[12vw] xl:col-span-10 xl:col-start-2 3xl:!h-56 "
            }
          />
        )}
      </GridSection>
      <SliceData slice={slice} hidden />
    </>
  );
};

export default HomepageNumbers;
