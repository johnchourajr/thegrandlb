import { inquiryFormVariant } from "@/flags";
import { getProviderData } from "@flags-sdk/vercel";
import { createFlagsDiscoveryEndpoint } from "flags/next";

// Lets Vercel Toolbar's Flags Explorer discover this app's flags and offer
// per-viewer overrides. `getProviderData` comes from the Vercel adapter rather
// than `flags/next`, so the definitions returned are the ones Vercel holds.
// Authenticated with FLAGS_SECRET; returns 401 without it.
export const GET = createFlagsDiscoveryEndpoint(() =>
  getProviderData({ inquiryFormVariant }),
);

// Reads FLAGS_SECRET per request, so it must not be prerendered. With Cache
// Components on, `instant = false` is how that is expressed here — `dynamic`
// is rejected by the compiler. See AGENTS.md.
export const instant = false;
