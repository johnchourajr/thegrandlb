import { inquiryFormVariant } from "@/flags";
import { createFlagsDiscoveryEndpoint, getProviderData } from "flags/next";

// Lets Vercel Toolbar's Flags Explorer discover this app's flags and offer
// per-viewer overrides. Authenticated with FLAGS_SECRET; returns 401 without it.
export const GET = createFlagsDiscoveryEndpoint(async () =>
  getProviderData({ inquiryFormVariant }),
);

// Reads FLAGS_SECRET per request, so it must not be prerendered. With Cache
// Components on, `instant = false` is how that is expressed here — `dynamic`
// is rejected by the compiler. See AGENTS.md.
export const instant = false;
