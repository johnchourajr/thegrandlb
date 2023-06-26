import { createClient } from "prismicio";
import fetchLinks from "../utils/fetchLinks";

export const getExtra = async ({ previewData }: any) => {
  const data = {
    navigation: null,
    settings: null,
    cta: null,
    footer_cards: [],
  } as any;

  if (previewData) {
    const client = createClient({ previewData });

    const [navigation, settings, cta] = await Promise.all([
      client.getByType("nav_links"),
      client.getByType("settings"),
      client.getByType("fragment_cta_footer", {
        fetchLinks,
      }),
    ]);

    data.navigation = navigation;
    data.settings = settings;
    data.cta = cta;
  }

  if (process.env.NODE_ENV !== "production") {
    const client = createClient();

    const cards = await Promise.all([
      client.getByUID("fragment_card", "tour-card", {
        fetchLinks,
      }),
      client.getByUID("fragment_card", "events-card", {
        fetchLinks,
      }),
      client.getByUID("fragment_card", "menus-card", {
        fetchLinks,
      }),
      // client.getByUID("fragment_card", "catering-card", {
      //   fetchLinks,
      // }),
    ]);

    data.footer_cards.push(...cards);
  }

  return data;
};
