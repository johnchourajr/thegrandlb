import { useRouter } from "next/router";
import TileGrid from "slices/TileGrid";

const TileFooter = ({ footer_cards = [] }: any) => {
  const { asPath } = useRouter();

  const pruneFooterCards = (cards: any) => {
    return cards?.filter((card: any) => {
      return !asPath.includes(card.data.link.uid);
    });
  };

  const newCards = pruneFooterCards(footer_cards);

  const items = newCards.map((card: any, index: number) => {
    const isSecondCard = index === 1;
    const col_start = isSecondCard ? "Start 7" : "Start 2";
    if (index > 1) return null;
    return { ...card.data, col_start, col_span: "Span 5" };
  });

  return (
    <TileGrid
      slice={{
        primary: {
          section_id: "tile-footer",
          headline: "Discover more and more Grand.",
          theme: "Cream",
          body: "",
          top_spacer: "None",
          bottom_spacer: "Medium",
        },
        items,
        slice_label: null,
        slice_type: "tile_grid",
        id: "tile_grid$26bb0da6-5e14-48c0-880e-568c6b2a8a79",
        version: "sktwi1xtmkfgx8626",
        variation: "default",
      }}
      index={0}
      slices={[]}
      context={{}}
    />
  );
};

export default TileFooter;
