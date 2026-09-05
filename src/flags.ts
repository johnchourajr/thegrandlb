import {
  ARM_CONTROL,
  EXPERIMENT_COOKIE,
  isExperimentId,
  type Arm,
} from "@/utils/experiment";
import { vercelAdapter } from "@flags-sdk/vercel";
import type { Identify } from "flags";
import { dedupe, flag } from "flags/next";

/**
 * Feature flags, backed by Vercel Flags. See #217.
 *
 * The flag itself lives in Vercel — its description, variants and per
 * environment values are managed there, not in this file:
 *
 *   vercel flags inspect inquiry-form-variant
 *   vercel flags set inquiry-form-variant --environment preview --variant treatment
 *   vercel flags rollout inquiry-form-variant --environment production \
 *     --by user.id --from-variant control --to-variant treatment \
 *     --default-variant control --stage 10,2h --stage 50,12h
 *
 * That is what makes the experiment adjustable without a deploy, which #217
 * requires. `@vercel/toolbar` is already mounted, so Flags Explorer can also
 * override the value per-viewer for QA without affecting real visitors.
 *
 * Requires the `FLAGS` environment variable (a server SDK key). Without it the
 * adapter cannot resolve and every visitor falls back to `defaultValue` —
 * today's form — which is the correct failure mode.
 */

export const INQUIRY_FORM_VARIANT_KEY = "inquiry-form-variant";

/**
 * Bucketing entity. Vercel splits traffic on this, so it must be stable for
 * the same visitor across visits — see `src/utils/experiment.ts` for why it is
 * a dedicated cookie rather than the analytics session id.
 *
 * Returns no entity when the cookie is missing or malformed, which resolves to
 * `defaultValue`: refusing cookies means seeing today's form, never an
 * untested one.
 */
type Entities = { user?: { id: string } };

const identify: Identify<Entities> = ({ cookies }) => {
  const id = cookies.get(EXPERIMENT_COOKIE)?.value;
  return isExperimentId(id) ? { user: { id } } : {};
};

/** Deduped so several flags sharing this context read the cookie once. */
const identifyOnce = dedupe(identify);

/**
 * Which inquiry form a visitor sees.
 *
 * No `decide` — `VercelAdapterDeclaration` is
 * `Omit<FlagDeclaration, 'decide' | 'origin'>`, because the adapter is what
 * decides. Assignment, percentage rollout and staged ramps are all configured
 * in Vercel.
 */
export const inquiryFormVariant = flag<Arm, Entities>({
  key: INQUIRY_FORM_VARIANT_KEY,
  adapter: vercelAdapter,
  defaultValue: ARM_CONTROL,
  identify: identifyOnce,
});

export const inquiryFlags = [inquiryFormVariant] as const;
