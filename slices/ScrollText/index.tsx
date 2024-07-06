import Button from "@/components/Button";
import { GridSection } from "@/components/GridSection";
import Headline from "@/components/Headline";
import Tick from "@/components/TickerContainer";
import { stringToUnderscore } from "@/utils/utils";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";

/**
 * Props for `ScrollText`.
 */
export type ScrollTextProps = SliceComponentProps<
  Content.ScrollTextSlice | any
>;

const ScrollText = ({ slice, context }: ScrollTextProps): JSX.Element => {
  const makeAriaLabel = () => {
    let ariaLabel = "";
    if (slice.primary.top_title) {
      ariaLabel += `${slice.primary.top_title} `;
    }
    if (slice.primary.line_one) {
      ariaLabel += `${slice.primary.line_one} `;
    }
    if (slice.primary.line_two) {
      ariaLabel += `${slice.primary.line_two} `;
    }
    if (slice.primary.bottom_title) {
      ariaLabel += `${slice.primary.bottom_title}`;
    }
    return ariaLabel;
  };

  const { uid }: any = context;

  return (
    <>
      <GridSection
        id={slice.primary.section_id}
        aria-label={makeAriaLabel()}
        className={clsx("!gap-0")}
        bottomSpacer={slice.primary.bottom_spacer}
        topSpacer={slice.primary.top_spacer}
      >
        {slice.primary.top_title && (
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
              {slice.primary.top_title}
            </Headline>
          </div>
        )}
        {slice.primary.line_one && (
          <Tick toLeft={false} className={clsx("col-span-full")} animateOnce>
            <Headline
              as="span"
              size={"2xl"}
              className={`inline-flex !whitespace-pre py-3 md:py-6`}
              disableMotion
              emphasis
              aria-hidden={true}
            >
              {slice.primary.line_one}{" "}
            </Headline>
          </Tick>
        )}
        {slice.primary.line_two && (
          <Tick toLeft={true} className={clsx("col-span-full")} animateOnce>
            <Headline
              as="span"
              size={"2xl"}
              className={`inline-flex !whitespace-pre pb-3 md:pb-6`}
              disableMotion
              emphasis
              aria-hidden={true}
            >
              {slice.primary.line_two}{" "}
            </Headline>
          </Tick>
        )}
        {slice.primary.bottom_title && (
          <div
            className={`col-span-full flex flex-col-reverse gap-3 text-center md:col-span-10 md:col-start-2 md:flex-row md:items-center md:justify-between md:gap-0 md:text-end`}
          >
            {slice.primary.primary_action_link && (
              <Button
                field={slice.primary.primary_action_link}
                text={slice.primary.primary_action}
                eventCategory={stringToUnderscore(`${uid} Scroll Text Action`)}
                eventLabel={stringToUnderscore(
                  `${slice.primary.section_id} Primary CTA`
                )}
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
              {slice.primary.bottom_title}
            </Headline>
          </div>
        )}
      </GridSection>
    </>
  );
};

export default ScrollText;
