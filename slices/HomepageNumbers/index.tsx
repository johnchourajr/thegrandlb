import { GridSection } from "@/components/GridSection";
import Headline from "@/components/Headline";
import MotionBox from "@/components/MotionBox";
import { NumberItem } from "@components/NumberItem";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Fragment } from "react";
import { TileItem } from "slices/TileGrid/TileItem";

/**
 * Props for `HomepageNumbers`.
 */
export type HomepageNumbersProps = SliceComponentProps<
  Content.HomepageNumbersSlice | any
>;

const HomepageNumbers = ({ slice }: HomepageNumbersProps): JSX.Element => {
  const {
    data: { bullet_list, numberlist, primary_action_link, primary_action },
  } = slice.primary.number_list as any;

  return (
    <>
      <GridSection
        id={slice.primary.section_id || ""}
        bottomSpacer={slice.primary.bottom_spacer || null}
        topSpacer={slice.primary.top_spacer || null}
        className={
          "!md:gap-y-28 !md:pt-[inherit] !gap-y-24 !pt-20 lg:!gap-y-32"
        }
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
          <MotionBox className="col-span-full flex flex-col items-center justify-evenly gap-10 lg:col-span-10 lg:col-start-2 lg:flex-row lg:gap-20">
            {numberlist.map(
              (
                { number, eyebrow, body, action_text, action_link }: any,
                i: number
              ) => {
                return (
                  <Fragment key={i}>
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
                          "h-20 w-[3px] flex-grow rounded-md bg-white lg:h-[3px] lg:w-full"
                        }
                      />
                    )}
                  </Fragment>
                );
              }
            )}
          </MotionBox>
        )}
        {bullet_list && (
          <MotionBox className="col-span-full flex flex-col items-center justify-evenly gap-10 sm:flex-row lg:col-span-8 lg:col-start-3 lg:gap-6">
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
              "3lg:!h-56 col-span-full !h-[12vw] lg:col-span-10 lg:col-start-2 "
            }
          />
        )}
      </GridSection>
    </>
  );
};

export default HomepageNumbers;
