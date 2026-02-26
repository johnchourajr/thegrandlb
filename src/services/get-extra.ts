import { createClient } from "@/prismicio";
import type { ExtraData, GetExtraParams } from "../types/services";
import fetchLinks from "../utils/fetchLinks";

export const getExtra = async ({
  previewData,
}: GetExtraParams): Promise<ExtraData> => {
  const client = createClient({ previewData });

  const [navigation, settings, cta, tour_card, events_card, menus_card] =
    await Promise.all([
      client.getByType("nav_links"),
      client.getByUID("settings", "settings"),
      client.getByType("fragment_cta_footer", { fetchLinks }),
      client.getByUID("fragment_card", "tour-card", { fetchLinks }),
      client.getByUID("fragment_card", "events-card", { fetchLinks }),
      client.getByUID("fragment_card", "menus-card", { fetchLinks }),
    ]);

  return {
    navigation: navigation.results[0] || null,
    settings,
    cta: cta.results[0] || null,
    footer_cards: [tour_card, events_card, menus_card],
  };
};
