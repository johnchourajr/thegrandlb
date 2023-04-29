import SliceData from "@/components/dev/SliceData";
import { GridSection } from "@/components/GridSection";
import Headline from "@/components/Headline";
import Text from "@/components/Paragraph";
import clsx from "clsx";
import { TileItem } from "./TileItem";
import type { TileItemProps } from "./types";

/**
 * @typedef {import("@prismicio/client").Content.TileGridSlice} TileGridSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TileGridSlice>} TileGridProps
 * @param { TileGridProps }
 */
const TileGrid = ({ slice }: any) => {
  const { items, primary } = slice;
  const { section_id, headline, theme, body, top_spacer, bottom_spacer } =
    primary;

  const getTheme = () => {
    switch (theme) {
      case "White":
        return "bg-white";
      case "Black":
        return "bg-black";
      case "Cream":
        return "bg-cream";
      default:
        return "bg-cream";
    }
  };

  return (
    <>
      <GridSection
        id={primary.section_id}
        gridSectionType="flex"
        className={clsx("max-w-[2000px] flex-col gap-8 lg:gap-12", getTheme())}
        topSpacer={top_spacer}
        bottomSpacer={bottom_spacer}
      >
        {headline && (
          <GridSection as="div" className="">
            <div className={"col-span-full xl:col-start-2"}>
              {headline && (
                <Headline
                  as="h2"
                  size="lg"
                  className="max-w-[10em]"
                  animateOnce={true}
                >
                  {headline}
                </Headline>
              )}
              {body && <Text>{body}</Text>}
            </div>
          </GridSection>
        )}
        <GridSection
          as="div"
          className="xl:auto-rows-[14vw] 2xl:auto-rows-[12vw]"
        >
          {items.map((item: TileItemProps, index: number) => {
            return <TileItem key={index} {...item} />;
          })}
        </GridSection>
      </GridSection>
      <SliceData slice={slice} hidden />
    </>
  );
};

export default TileGrid;
