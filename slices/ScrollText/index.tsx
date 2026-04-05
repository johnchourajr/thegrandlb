import Button from "@/components/Button";
import { GridSection } from "@/components/GridSection";
import Headline from "@/components/Headline";
import Tick from "@/components/TickerContainer";
import { stringToUnderscore } from "@/utils/utils";
import type { SliceComponentProps } from "@/types/slices";
import type { ScrollTextSlice } from "../slice-types";
import clsx from "clsx";

const ScrollText = ({
  slice,
  context,
}: SliceComponentProps<ScrollTextSlice>): JSX.Element => {
  const {
    section_id,
    top_title,
    line_one,
    line_two,
    bottom_title,
    top_spacer,
    bottom_spacer,
    primary_action,
    primary_action_link,
  } = slice;

  const uid = (context as any)?.uid;

  const makeAriaLabel = () => {
    const parts = [top_title, line_one, line_two, bottom_title].filter(Boolean);
    return parts.join(" ");
  };

  return (
    <>
      <GridSection
        id={section_id}
        aria-label={makeAriaLabel()}
        className={clsx("!gap-0")}
        bottomSpacer={bottom_spacer}
        topSpacer={top_spacer}
      >
        {top_title && (
          <div
            className={`col-span-full text-center md:col-span-10 md:col-start-2 md:text-left`}
          >
            <Headline
              as="span"
              size={"xl"}
              className={""}
              aria-hidden={true}
              uppercase
              animateOnce
            >
              {top_title}
            </Headline>
          </div>
        )}
        {line_one && (
          <Tick toLeft={false} className={clsx("col-span-full")} animateOnce>
            <Headline
              as="span"
              size={"2xl"}
              className={`inline-flex !whitespace-pre py-3 md:py-6`}
              disableMotion
              emphasis
              aria-hidden={true}
            >
              {line_one}{" "}
            </Headline>
          </Tick>
        )}
        {line_two && (
          <Tick toLeft={true} className={clsx("col-span-full")} animateOnce>
            <Headline
              as="span"
              size={"2xl"}
              className={`inline-flex !whitespace-pre pb-3 md:pb-6`}
              disableMotion
              emphasis
              aria-hidden={true}
            >
              {line_two}{" "}
            </Headline>
          </Tick>
        )}
        {bottom_title && (
          <div
            className={`col-span-full flex flex-col-reverse gap-3 text-center md:col-span-10 md:col-start-2 md:flex-row md:items-center md:justify-between md:gap-0 md:text-end`}
          >
            {primary_action_link && (
              <Button
                field={primary_action_link}
                text={primary_action}
                eventCategory={stringToUnderscore(`${uid} Scroll Text Action`)}
                eventLabel={stringToUnderscore(`${section_id} Primary CTA`)}
                type={"outline-black"}
                size={"default"}
              />
            )}
            <Headline
              as="span"
              size={"xl"}
              className={`w-full`}
              aria-hidden={true}
              uppercase
              animateOnce
            >
              {bottom_title}
            </Headline>
          </div>
        )}
      </GridSection>
    </>
  );
};

export default ScrollText;
