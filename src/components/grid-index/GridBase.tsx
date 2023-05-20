import clsx from "clsx";
import { TileItem } from "slices/TileGrid/TileItem";
import { GridSection } from "../GridSection";
import { GridIndexItem } from "./GridItem";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const GridBase = ({ uid: parentUid, sectionId, items, layoutLoader }: any) => {
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
      {items.map((space: any) => {
        const {
          page: { id, uid, data },
          page_media,
        } = space;
        // console.log({ space });

        if (uid === "map") {
          return (
            <TileItem
              key={id}
              theme={"Outlined"}
              size="Default"
              headline={"See Interactive Map"}
              link={{
                id: "ZD9uPxAAACMAn2so",
                type: "page",
                lang: "en-us",
                slug: "interactive-map",
                uid: "map",
                link_type: "Document",
              }}
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
              key={id}
              theme={"Outlined"}
              size="Default"
              headline={"Tour Our Spaces"}
              link={{
                id: "ZC5XThAAAB8A0yhs",
                isBroken: false,
                lang: "en-us",
                link_type: "Document",
                slug: "tour-index-page",
                type: "tour_index_page",
                uid: "tour",
              }}
              col_span={"Span 12"}
              col_start={"Start 1"}
              row_span={"Span 1"}
              className={clsx("!col-span-full ")}
            />
          );
        }

        return (
          <GridIndexItem
            key={id}
            id={id}
            uid={uid}
            page_media={page_media}
            layoutLoader={layoutLoader}
            parentUid={parentUid}
            {...data}
          />
        );
      })}
    </GridSection>
  );
};

export default GridBase;
