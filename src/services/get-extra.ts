import { createClient } from "prismicio";
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
      client.getByType("fragment_cta_footer", {
        fetchLinks,
      }),
      client.getByUID("fragment_card", "tour-card", {
        fetchLinks,
      }),
      client.getByUID("fragment_card", "events-card", {
        fetchLinks,
      }),
      client.getByUID("fragment_card", "menus-card", {
        fetchLinks,
      }),
    ]);

  // write a function to pass array into a console.log to see if the data is undefined
  const debuggIfKeysInObjectAreUndefined = (obj: Record<string, unknown>) => {
    Object.keys(obj).forEach((key) => {
      if (obj[key] === undefined) {
        console.log(key);
      }
    });
  };

  debuggIfKeysInObjectAreUndefined(
    navigation as unknown as Record<string, unknown>
  );

  return {
    navigation: navigation.results[0] || null, // getByType returns Query, we need the first result
    settings,
    cta: cta.results[0] || null, // getByType returns Query, we need the first result - handle empty results
    footer_cards: [tour_card, events_card, menus_card],
  };
};
