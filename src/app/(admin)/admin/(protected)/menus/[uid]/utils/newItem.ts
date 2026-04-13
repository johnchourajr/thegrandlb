import type { MenuItemData } from "@/types/menu";

export function newItem(): MenuItemData {
  return {
    title: [{ type: "paragraph", text: "", spans: [] }],
    description: [{ type: "paragraph", text: "", spans: [] }],
    price_per: "per person",
    price_min: 0,
    price_max: 0,
  };
}
