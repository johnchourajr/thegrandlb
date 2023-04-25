import SliceData from "@/components/dev/SliceData";
import { GridSection } from "@/components/GridSection";
import Headline, { TextSize } from "@/components/Headline";
import Text from "@/components/Paragraph";
import StringText from "@/components/StringText";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicLink } from "@prismicio/react";
import clsx from "clsx";
import { m } from "framer-motion";
import { linkResolver } from "prismicio";
import {
  ColSpan,
  ColStart,
  getNumberForColSpan,
  getNumberForColStart,
  getNumberForRowSpan,
  getNumberForRowStart,
  RowSpan,
  RowStart,
  TileTheme,
} from "./utils";

interface TileItemProps {
  col_span?: ColSpan;
  col_start?: ColStart;
  row_span?: RowSpan;
  row_start?: RowStart;
  theme?: TileTheme;
  media?: any;
  link?: any;
  headline?: any;
  eyebrow?: any;
  card_fragment?: any;
  body?: any;
}

type TileStyleProps = {
  container?: string;
  content?: string;
  headline?: string;
  headlineSize?: TextSize;
};

const TileItem = ({
  col_span,
  col_start,
  row_span,
  row_start,
  theme = "Black/White",
  media,
  link,
  headline,
  eyebrow,
  card_fragment,
  body,
  ...rest
}: TileItemProps) => {
  const sharedStyles = "relative overflow-hidden h-full w-full rounded-sm p-10";
  const getStyles = (): TileStyleProps => {
    switch (theme) {
      case "Outlined":
        return {
          container: "border-2 border-white bg-transparent !rounded-full",
          headline: "uppercase",
          content: "text-black",
          headlineSize: "md",
        };
      case "Black/White":
        return {
          container: "bg-black text-white",
          headline: "",
          content: "",
          headlineSize: "md",
        };
      case "White/Black":
        return {
          container: "bg-white text-black",
          headline: "",
          content: "",
          headlineSize: "md",
        };
      case "Creme/Black":
        return {
          container: "bg-cream text-black",
          headline: "",
          content: "",
          headlineSize: "md",
        };
      case "Blue/Black":
        return {
          container: "bg-blue text-black",
          headline: "",
          content: "",
          headlineSize: "md",
        };
      case "Gold/Black":
        return {
          container: "bg-gold text-black",
          headline: "uppercase max-w-[6em]",
          content: "flex-col-reverse gap-20",
          headlineSize: "xl",
        };
      default:
        return {
          container: "bg-black text-white",
          headline: "",
          content: "",
          headlineSize: "md",
        };
    }
  };

  console.log({ theme, media, link, headline, eyebrow, card_fragment, body });

  const MotionLink = m(PrismicLink);

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
        getStyles().container
      )}
      {...rest}
    >
      <m.div
        className={clsx(
          "align-center flex h-full w-full flex-col items-center justify-center gap-4 text-center",
          getStyles().content
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
        {headline && (
          <Headline
            className={getStyles().headline}
            size={getStyles().headlineSize}
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
        {eyebrow && (
          <StringText size="large" bold uppercase>
            {eyebrow}
          </StringText>
        )}
      </m.div>
    </MotionLink>
  );
};

/**
 * @typedef {import("@prismicio/client").Content.TileGridSlice} TileGridSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TileGridSlice>} TileGridProps
 * @param { TileGridProps }
 */
const TileGrid = ({ slice }: any) => {
  return (
    <>
      <GridSection
        className="mt-4 auto-rows-[14vw]"
        bottomSpacer={slice.primary.bottom_spacer}
      >
        {slice.items.map((item: TileItemProps, index: number) => {
          return <TileItem key={index} {...item} />;
        })}
      </GridSection>
      <SliceData slice={slice} />
    </>
  );
};

export default TileGrid;
