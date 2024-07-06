import { GridSection } from "@/components/GridSection";
import Headline from "@/components/Headline";
import Text from "@/components/Paragraph";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import { TileItem } from "./TileItem";
import type { TileItemProps } from "./types";

/**
 * Props for `TileGrid`.
 */
export type TileGridProps = SliceComponentProps<Content.TileGridSlice | any>;

const TileGrid = ({ slice }: TileGridProps): JSX.Element => {
  const { items, primary } = slice as any;
  const { section_id, headline, theme, body, top_spacer, bottom_spacer } =
    primary as any;

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
        id={section_id}
        gridSectionType="flex"
        className={clsx("max-w-[2000px] flex-col gap-8 md:gap-12", getTheme())}
        topSpacer={top_spacer}
        bottomSpacer={bottom_spacer}
      >
        {headline && (
          <GridSection id="" as="div" topSpacer="None" bottomSpacer="None">
            <div className={"col-span-full lg:col-start-2"}>
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
          id=""
          as="div"
          className=" 2lg:auto-rows-[15vw] 3lg:auto-rows-[14vw] auto-rows-min lg:auto-rows-[16vw]"
          topSpacer="Small"
          bottomSpacer="None"
        >
          {items.map((item: TileItemProps, index: number) => {
            return <TileItem key={index} section_id={section_id} {...item} />;
          })}
        </GridSection>
      </GridSection>
    </>
  );
};

export default TileGrid;
