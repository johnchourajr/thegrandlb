import ForwardedPrismicLink from "@/components/ForwardPrismicLink";
import Headline from "@/components/Headline";
import ImageBox from "@/components/media-frame/ImageBox";
import Text from "@/components/Paragraph";
import StringText from "@/components/StringText";
import { handleEvent } from "@/utils/events";
import clsx from "clsx";
import { m } from "framer-motion";
import { linkResolver } from "prismicio";
import type { TileItemProps, TileStyleProps } from "./types";
import {
  getNumberForColSpan,
  getNumberForColStart,
  getNumberForRowSpan,
  getNumberForRowStart,
} from "./utils";

const MotionComp = m(ForwardedPrismicLink, { forwardMotionProps: true }) as any;

export const TileItem = ({
  col_span,
  col_start,
  row_span,
  row_start,
  theme = "Black/White",
  size = "Default",
  direction = "Col",
  media,
  link,
  headline,
  eyebrow,
  card_fragment,
  body,
  className,
  gridOptions = true,
  initial,
  whileInView,
  motionStyles,
  viewport,
  section_id,
  ...rest
}: TileItemProps) => {
  if (!link) return null;

  const hasCardFragment = card_fragment?.data ? true : false;
  if (hasCardFragment) {
    col_span = card_fragment.data.col_span;
    col_start = card_fragment.data.col_start;
    row_span = card_fragment.data.row_span;
    row_start = card_fragment.data.row_start;
    theme = card_fragment.data.theme;
    size = card_fragment.data.size;
    direction = card_fragment.data.direction;
    media = card_fragment.data.media;
    link = card_fragment.data.link;
    headline = card_fragment.data.headline;
    eyebrow = card_fragment.data.eyebrow;
    body = card_fragment.data.body;
  }

  const getStyles = (): TileStyleProps => {
    switch (theme) {
      case "Outlined":
        return {
          container:
            "text-black uppercase !border-2 border-white bg-transparent !rounded-full hover:!border-0 hover:!border-[transparent] hover:bg-white  ",
          headline: "!text-sm",
          content: "",
        };
      case "Red/White":
        return {
          container: "bg-red text-white border-black",
          headline: "",
          content: "",
        };
      case "Black/White":
        return {
          container: "bg-black text-white border-white",
          headline: "",
          content: "",
        };
      case "White/Black":
        return {
          container: "bg-white text-black border-black",
          headline: "",
          content: "",
        };
      case "Creme/Black":
        return {
          container: "bg-cream text-black border-black",
          headline: "",
          content: "",
        };
      case "Blue/Black":
        return {
          container: "bg-blue text-black border-black",
          headline: "",
          content: "",
        };
      case "Gold/Black":
        return {
          container: "bg-red text-white border-black",
          headline: "",
          content: "",
        };
      default:
        return {
          container: "bg-black text-white",
          headline: "",
          content: "",
        };
    }
  };

  const getSize = (): TileStyleProps => {
    switch (size) {
      case "Large":
        return {
          container: clsx(
            "lg:col-span-4 min-h-[25rem]",
            theme === "Outlined" && "min-h-[8rem]"
          ),
          headline: "uppercase max-w-[6em]",
          content: "!gap-10 !lg:gap-20",
          headlineSize: "xl",
        };
      default:
        return {
          container: clsx(
            "min-h-[25rem]",
            theme === "Outlined" && "min-h-[8rem]"
          ),
          headline: "",
          content: "",
          headlineSize: "md",
        };
    }
  };

  const getDirection = () => {
    switch (direction) {
      case "Col Reverse":
        return "flex flex-col-reverse";
      default:
        return "flex flex-col";
    }
  };

  const gridOptionStyles =
    gridOptions &&
    clsx(
      col_start && getNumberForColStart(col_start),
      col_span && getNumberForColSpan(col_span),
      row_start && getNumberForRowStart(row_start),
      row_span && getNumberForRowSpan(row_span)
    );

  return (
    <MotionComp
      field={link}
      linkResolver={linkResolver}
      onClick={() => {
        handleEvent({
          action: "Click",
          category: `TileLink`,
          label: `TileSection ${section_id}`,
          value: `${headline}: /${link?.slug}`,
        });
      }}
      className={
        clsx(
          "relative h-full w-full",
          gridOptionStyles,
          getSize().container,
          className
        ) as any
      }
      {...rest}
    >
      <m.div
        initial={
          initial ||
          ({
            opacity: 0,
            y: 10,
          } as any)
        }
        whileInView={
          whileInView ||
          ({
            opacity: 1,
            y: 0,
          } as any)
        }
        whileHover={
          {
            scale: 0.99,
            willChange: "scale",
          } as any
        }
        viewport={viewport}
        whileTap={{ scale: 0.98, willChange: "scale" }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        tabIndex={-1}
        className={clsx(
          "align-center absolute h-full max-h-[70vh] w-full flex-col items-center justify-center gap-4 rounded-sm border-b-4 p-10 text-center transition-all duration-700 ease-out-expo hover:border-b-0 hover:border-b-[transparent] lg:rounded-md",
          getSize().content,
          getStyles().container,
          getDirection()
        )}
        style={motionStyles}
      >
        {media && (
          <>
            <ImageBox
              media={media}
              className=" h-32 max-h-[15rem] w-32 max-w-[15rem] lg:h-[13vw] lg:w-[13vw]"
              imgixParams={{ maxWidth: 600 }}
            />
          </>
        )}
        <div className="flex flex-col items-center justify-center gap-4">
          {headline && (
            <Headline
              className={clsx(getStyles().headline, getSize().headline)}
              size={getSize().headlineSize}
              disableMotion={true}
            >
              {headline}
            </Headline>
          )}

          {body && (
            <Text size="default" className={"max-w-[25em]"}>
              {body}
            </Text>
          )}
        </div>
        {eyebrow && (
          <StringText size="large" bold uppercase>
            {eyebrow}
          </StringText>
        )}
      </m.div>
    </MotionComp>
  );
};
