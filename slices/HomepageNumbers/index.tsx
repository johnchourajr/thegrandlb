import { GridSection } from "@/components/GridSection";
import Headline from "@/components/Headline";
import MotionBox from "@/components/MotionBox";
import { NumberItem } from "@components/NumberItem";
import type { SliceComponentProps } from "@/types/slices";
import type { HomepageNumbersSlice } from "../slice-types";
import { Fragment } from "react";
import { TileItem } from "slices/TileGrid/TileItem";

const HomepageNumbers = ({
  slice,
}: SliceComponentProps<HomepageNumbersSlice>): JSX.Element => {
  const { section_id, title, top_spacer, bottom_spacer, number_list } = slice;

  const numberListData = number_list?.data ?? {};
  const { bullet_list, numberlist, primary_action_link, primary_action } =
    numberListData;

  return (
    <>
      <GridSection
        id={section_id || ""}
        bottomSpacer={bottom_spacer || null}
        topSpacer={top_spacer || null}
        className="!md:gap-y-28 !md:pt-[inherit] !gap-y-24 !pt-20 lg:!gap-y-32"
      >
        {title && (
          <Headline
            className="col-span-full text-center"
            size="lg"
            uppercase
            animateOnce
          >
            {title}
          </Headline>
        )}
        {numberlist && (
          <MotionBox className="col-span-full flex flex-col items-center justify-evenly gap-10 lg:col-span-10 lg:col-start-2 lg:flex-row lg:gap-20">
            {numberlist.map(
              ({ number, eyebrow, body, action_text, action_link }, i) => (
                <Fragment key={i}>
                  <NumberItem
                    number={number}
                    eyebrow={eyebrow}
                    body={body}
                    action_text={action_text}
                    action_link={action_link}
                  />
                  {i !== numberlist.length - 1 && (
                    <div className="h-20 w-[3px] flex-grow rounded-md bg-white lg:h-[3px] lg:w-full" />
                  )}
                </Fragment>
              )
            )}
          </MotionBox>
        )}
        {bullet_list && (
          <MotionBox className="col-span-full flex flex-col items-center justify-evenly gap-10 sm:flex-row lg:col-span-8 lg:col-start-3 lg:gap-6">
            {bullet_list.map(
              ({ media, number, eyebrow, body, action_text, action_link }, i) => (
                <NumberItem
                  key={i}
                  media={media}
                  number={number}
                  eyebrow={eyebrow}
                  body={body}
                  action_text={action_text}
                  action_link={action_link}
                />
              )
            )}
          </MotionBox>
        )}
        {primary_action_link && primary_action && (
          <TileItem
            link={primary_action_link}
            headline={primary_action}
            theme={"Outlined"}
            className="3lg:!h-56 col-span-full !h-[12vw] lg:col-span-10 lg:col-start-2"
          />
        )}
      </GridSection>
    </>
  );
};

export default HomepageNumbers;
