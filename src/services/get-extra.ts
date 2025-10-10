import { createClient } from "prismicio";
import type { ExtraData, GetExtraParams } from "../types/services";
import { cachedPrismicCall, CACHE_CONFIGS } from "../utils/api-cache";
import fetchLinks from "../utils/fetchLinks";

export const getExtra = async ({
  previewData,
}: GetExtraParams): Promise<ExtraData> => {
  const client = createClient({ previewData });

  // Use cached API calls to reduce bandwidth usage - fallback to individual calls for type safety
  const [navigation, settings, cta, tour_card, events_card, menus_card] =
    await Promise.all([
      cachedPrismicCall("navigation", () => client.getByType("nav_links"), {
        ttl: CACHE_CONFIGS.NAVIGATION.ttl,
      }),
      cachedPrismicCall(
        "settings",
        () => client.getByUID("settings", "settings"),
        { ttl: CACHE_CONFIGS.SETTINGS.ttl }
      ),
      cachedPrismicCall(
        "cta_footer",
        () => client.getByType("fragment_cta_footer", { fetchLinks }),
        { ttl: CACHE_CONFIGS.CTA_FOOTER.ttl }
      ),
      cachedPrismicCall(
        "tour_card",
        () => client.getByUID("fragment_card", "tour-card", { fetchLinks }),
        { ttl: CACHE_CONFIGS.FRAGMENTS.ttl }
      ),
      cachedPrismicCall(
        "events_card",
        () => client.getByUID("fragment_card", "events-card", { fetchLinks }),
        { ttl: CACHE_CONFIGS.FRAGMENTS.ttl }
      ),
      cachedPrismicCall(
        "menus_card",
        () => client.getByUID("fragment_card", "menus-card", { fetchLinks }),
        { ttl: CACHE_CONFIGS.FRAGMENTS.ttl }
      ),
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
