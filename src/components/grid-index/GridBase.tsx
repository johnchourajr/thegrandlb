import clsx from "clsx";
import { TileItem } from "slices/TileGrid/TileItem";
import type { GridBaseProps, GridItemData } from "../../types/grid";
import { ensureArray } from "../../utils/safe-array";
import { GridSection } from "../GridSection";
import { GridIndexItem } from "./GridItem";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const GridBase = ({ uid: parentUid, sectionId, items }: GridBaseProps) => {
  // Ensure items is always an array to prevent map errors
  const safeItems = ensureArray(items);

  return (
    <GridSection
      id={sectionId}
      topSpacer={"None"}
      bottomSpacer={"Small"}
      className={
        "auto-rows-min xl:auto-rows-[16vw] 2xl:auto-rows-[14vw] 3xl:auto-rows-[12vw]"
      }
      variants={container}
      initial={"hidden"}
      whileInView={"show"}
      viewport={{
        once: true,
      }}
    >
      {safeItems.map((space: GridItemData, index: number) => {
        const {
          page: { id, uid, data },
          page_media,
        } = space as any; // Type assertion needed for relation field access
        const rowKey = id ?? uid ?? `event-index-${index}`;

        if (uid === "map") {
          return (
            <TileItem
              key={rowKey}
              theme={"Outlined"}
              size="Default"
              headline={"See Interactive Map"}
              link={{ link_type: "Web", url: "/map" }}
              col_span={"Span 12"}
              col_start={"Start 1"}
              row_span={"Span 1"}
              className={clsx(" !col-span-full ")}
            />
          );
        }

        if (uid === "tour") {
          return (
            <TileItem
              key={rowKey}
              theme={"Outlined"}
              size="Default"
              headline={"Tour Our Spaces"}
              link={{ link_type: "Web", url: "/tour" }}
              col_span={"Span 12"}
              col_start={"Start 1"}
              row_span={"Span 1"}
              className={clsx("!col-span-full ")}
            />
          );
        }

        return (
          <GridIndexItem
            key={rowKey}
            id={id ?? uid}
            uid={uid}
            page_media={page_media}
            layout={space.layout}
            parentUid={parentUid}
            {...data}
          />
        );
      })}
    </GridSection>
  );
};

export default GridBase;
