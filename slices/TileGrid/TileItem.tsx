import Headline from "@/components/Headline";
import Text from "@/components/Paragraph";
import StringText from "@/components/StringText";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicLink } from "@prismicio/react";
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
  ...rest
}: TileItemProps) => {
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

  const sharedStyles = "relative overflow-hidden h-full w-full rounded-sm p-10";
  const getStyles = (): TileStyleProps => {
    switch (theme) {
      case "Outlined":
        return {
          container:
            "text-black uppercase border-2 border-white bg-transparent !rounded-full",
          headline: "!text-sm",
          content: "",
        };
      case "Black/White":
        return {
          container: "bg-black text-white",
          headline: "",
          content: "",
        };
      case "White/Black":
        return {
          container: "bg-white text-black",
          headline: "",
          content: "",
        };
      case "Creme/Black":
        return {
          container: "bg-cream text-black",
          headline: "",
          content: "",
        };
      case "Blue/Black":
        return {
          container: "bg-blue text-black",
          headline: "",
          content: "",
        };
      case "Gold/Black":
        return {
          container: "bg-gold text-black",
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
          container: "lg:col-span-4",
          headline: "uppercase max-w-[6em]",
          content: "!gap-20",
          headlineSize: "xl",
        };
      default:
        return {
          container: "",
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

  const MotionLink: any = m(PrismicLink);

  return (
    <MotionLink
      field={link}
      linkResolver={linkResolver}
      initial={
        {
          opacity: 0,
          y: 10,
        } as any
      }
      whileInView={
        {
          opacity: 1,
          y: 0,
        } as any
      }
      whileHover={
        {
          scale: 0.99,
          willChange: "scale",
        } as any
      }
      whileTap={{ scale: 0.98, willChange: "scale" }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      className={clsx(
        sharedStyles,
        col_start && getNumberForColStart(col_start),
        col_span && getNumberForColSpan(col_span),
        row_start && getNumberForRowStart(row_start),
        row_span && getNumberForRowSpan(row_span),
        getSize().container,
        getStyles().container
      )}
      {...rest}
    >
      <m.div
        className={clsx(
          "align-center flex h-full w-full flex-col items-center justify-center gap-4 text-center",
          getSize().content,
          getDirection()
        )}
      >
        {media && (
          <>
            <PrismicNextImage
              field={media}
              className=" h-[13vw] max-h-[15rem] w-[13vw] max-w-[15rem]"
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
    </MotionLink>
  );
};
