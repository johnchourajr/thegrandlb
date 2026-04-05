"use client";

import { usePathname } from "next/navigation";
import TileGrid from "slices/TileGrid";
import type { TileGridSlice, TileItemData } from "slices/slice-types";
import type { SharedDoc } from "content/types";

const TileFooter = ({ footer_cards = [] }: { uid?: string; footer_cards?: SharedDoc[] }) => {
  const pathname = usePathname();

  const pruneFooterCards = (cards: SharedDoc[]): SharedDoc[] => {
    return cards.filter((card) => {
      const link = card.data.link as { url?: string } | null | undefined;
      const url = link?.url ?? "";
      return !pathname.includes(url);
    });
  };

  const newCards = pruneFooterCards(footer_cards);

  const items: TileItemData[] = newCards.slice(0, 2).map((card, index) => ({
    ...(card.data as TileItemData),
    col_start: index === 1 ? "Start 7" : "Start 2",
    col_span: "Span 5",
  }));

  const slice: TileGridSlice = {
    type: "tile_grid",
    section_id: "tile-footer",
    headline: "Discover more and more Grand.",
    theme: "Cream",
    body: "",
    top_spacer: "Medium",
    bottom_spacer: "Medium",
    items,
  };

  return <TileGrid slice={slice} />;
};

export default TileFooter;
