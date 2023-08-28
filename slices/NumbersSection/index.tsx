import SliceData from "@/components/dev/SliceData";
import { GridSection } from "@/components/GridSection";
import Headline from "@/components/Headline";
import MotionBox from "@/components/MotionBox";
import { NumberItem } from "@/components/NumberItem";
import Text from "@/components/Paragraph";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";

/**
 * Props for `NumbersSection`.
 */
export type NumbersSectionProps = SliceComponentProps<
  Content.NumbersSectionSlice | any
>;

const NumbersSection = ({ slice }: NumbersSectionProps): JSX.Element => {
  const {
    section_id,
    title,
    description,
    columns,
    inset,
    top_border,
    top_spacer,
    bottom_border,
    bottom_spacer,
  } = slice.primary;

  const header = title || description;

  const getInset = () => {
    switch (inset) {
      case true:
        return "col-span-full xl:col-span-8 xl:col-start-3";
      case false:
        return "col-span-full xl:col-span-10 xl:col-start-2";
      default:
        return "col-span-full xl:col-span-10 xl:col-start-2";
    }
  };

  const getColumns = () => {
    switch (columns) {
      case "3 Column":
        return {
          container: "",
          item: "!w-full sm:!w-1/2 md:w-1/3 xl:!w-1/3",
        };
      case "4 Column":
        return {
          container: "",
          item: "!w-1/2 sm:!w-1/3 md:w-1/3 xl:!w-1/4",
        };
      case "6 Column":
        return {
          container: "",
          item: "!w-1/2 sm:!w-1/3 md:w-1/3 xl:!w-1/6",
        };
      case "Inline":
        return {
          container: "gap-y-2 lg:gap-y-12 gap-x-4 xl:gap-x-15",
          item: "!w-auto !py-0 !px-8",
        };
      default:
        return {
          container: "",
          item: "!w-1/2 sm:!w-1/3 md:w-1/3 xl:!w-1/4",
        };
    }
  };

  return (
    <>
      <GridSection
        id={section_id || slice.id}
        bottomSpacer={bottom_spacer || null}
        topSpacer={top_spacer || null}
        className={clsx("!gap-y-10 xl:!gap-y-24")}
      >
        <div
          className={clsx(
            "col-span-full border-t-2 border-[transparent] xl:col-span-10 xl:col-start-2",
            top_border && "!border-white"
          )}
        />
        {header && (
          <MotionBox className="col-span-full text-center">
            {title && (
              <Headline size="md" animateOnce>
                {title}
              </Headline>
            )}
            {description && <Text size="large">{description}</Text>}
          </MotionBox>
        )}
        {slice.items && (
          <MotionBox
            className={clsx(
              "relative flex flex-row flex-wrap items-center justify-center gap-y-12",
              getColumns().container,
              getInset()
            )}
          >
            {slice.items.map(
              (
                { media, number, eyebrow, body, action_text, action_link }: any,
                i: number
              ) => {
                return (
                  <NumberItem
                    key={i}
                    delay={i * 0.2}
                    media={media}
                    number={number}
                    eyebrow={eyebrow}
                    body={body}
                    action_text={action_text}
                    action_link={action_link}
                    className={clsx("p-4 md:p-10", getColumns().item)}
                  />
                );
              }
            )}
          </MotionBox>
        )}
        <div
          className={clsx(
            "col-span-full border-b-2 border-[transparent] xl:col-span-10 xl:col-start-2",
            bottom_border && "!border-white"
          )}
        />
      </GridSection>

      <SliceData slice={slice} hidden />
    </>
  );
};

export default NumbersSection;
