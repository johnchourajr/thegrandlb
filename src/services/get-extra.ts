import { cache } from "react";
import { settings, navigation, ctaFooter, footerCards } from "content/shared.constants";
import type { ExtraData, GetExtraParams } from "../types/services";

// Wrapped with cache() so layout and page components share one reference per request.
export const getExtra = cache(async (_params: GetExtraParams): Promise<ExtraData> => {
  return {
    navigation,
    settings,
    cta: ctaFooter,
    footer_cards: footerCards,
  };
});
