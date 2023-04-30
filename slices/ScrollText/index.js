import Button from "@/components/Button";
import SliceData from "@/components/dev/SliceData";
import { GridSection } from "@/components/GridSection";
import Headline from "@/components/Headline";
import Tick from "@/components/TickerContainer";
import clsx from "clsx";

/**
 * @typedef {import("@prismicio/client").Content.ScrollTextSlice} ScrollTextSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ScrollTextSlice>} ScrollTextProps
 * @param { ScrollTextProps }
 */
const ScrollText = ({ slice }) => {
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
            className={`col-span-full text-center lg:col-span-10 lg:col-start-2 lg:text-left`}
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
              className={`inline-flex !whitespace-pre py-3 lg:py-6`}
              disableMotion
              emphasis
              aria-hidden={true}
            >
              {slice.primary.line_one}{" "}
            </Headline>
          </Tick>
        )}
        {slice.primary.line_two && (
          <Tick
            toLeft={true}
            className={clsx("--mt-6 col-span-full")}
            animateOnce
          >
            <Headline
              as="span"
              size={"2xl"}
              className={`inline-flex !whitespace-pre pb-3 lg:pb-6`}
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
            className={`col-span-full flex flex-col-reverse gap-3 text-center lg:col-span-10 lg:col-start-2 lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:text-end`}
          >
            {slice.primary.primary_action_link && (
              <Button
                field={slice.primary.primary_action_link}
                text={slice.primary.primary_action}
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
      <SliceData slice={slice} hidden />
    </>
  );
};

export default ScrollText;
