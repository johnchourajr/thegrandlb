import { createClient } from "prismicio";
import fetchLinks from "../utils/fetchLinks";

export const getExtra = async ({ previewData }: any) => {
  const client = createClient({ previewData });

  const [navigation, settings, cta] = await Promise.all([
    client.getByType("nav_links"),
    client.getByType("settings"),
    client.getByType("fragment_cta_footer", {
      fetchLinks,
    }),
  ]);

  const footer_cards: any = [];

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

  footer_cards.push(...cards);

  return {
    navigation,
    settings,
    cta,
    footer_cards,
  };
};
