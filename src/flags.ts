import {
  ARM_CONTROL,
  ARM_VARIANT,
  assignArm,
  EXPERIMENT_COOKIE,
  type Arm,
} from "@/utils/experiment";
import type { Identify } from "flags";
import { dedupe, flag } from "flags/next";

/**
 * Feature flags. See #217.
 *
 * The Vercel Toolbar is already mounted (`src/app/(site)/layout.tsx`), so these
 * appear in Flags Explorer and can be overridden per-viewer for QA without
 * touching what real visitors see.
 */

export const INQUIRY_FORM_VARIANT_KEY = "inquiry-form-variant";

/**
 * Share of visitors in the variant, 0..1.
 *
 * **Deliberately 0.** The scaffolding ships inert: assignment, tracking and
 * reporting all run, and every visitor lands in the control arm, so the change
 * can be verified in production before a single person sees a different form.
 * Raise it when the variant exists and #216 is settled.
 *
 * This is the kill switch. Setting it to 0 returns everyone to today's form on
 * the next request; `assignArm` guarantees 0 means nobody, not almost nobody.
 *
 * Changing it currently needs a deploy. #217 asks for "turned off instantly
 * without a release", which wants `@flags-sdk/vercel` — `adapter:
 * vercelAdapter()` moves the value into Vercel Flags, controllable from the
 * dashboard or `vercel flags set`. Worth adding once there is a variant to
 * gate; while the share is 0 there is nothing to turn off.
 */
export const INQUIRY_VARIANT_SHARE = 0;

type Entities = { experimentId: string | null };

/**
 * Evaluation context. Reads the experiment cookie the proxy minted.
 *
 * `dedupe` keeps this to one read per request even when several flags share
 * it, which is the SDK's documented pattern.
 */
const identify: Identify<Entities> = ({ cookies }) => ({
  experimentId: cookies.get(EXPERIMENT_COOKIE)?.value ?? null,
});

const identifyOnce = dedupe(identify);

/**
 * Which inquiry form a visitor sees.
 *
 * Assignment is a pure function of the experiment cookie — see
 * `src/utils/experiment.ts` for why that cookie is not the analytics session id.
 */
export const inquiryFormVariant = flag<Arm, Entities>({
  key: INQUIRY_FORM_VARIANT_KEY,
  description:
    "Inquiry form: today's linear form vs an intent-first form that asks what the visitor came to do.",
  defaultValue: ARM_CONTROL,
  options: [
    { label: "Control — today's linear form", value: ARM_CONTROL },
    { label: "Variant — intent-first", value: ARM_VARIANT },
  ],
  identify: identifyOnce,
  decide({ entities }) {
    return assignArm(
      entities?.experimentId,
      INQUIRY_FORM_VARIANT_KEY,
      INQUIRY_VARIANT_SHARE,
    );
  },
});

export const inquiryFlags = [inquiryFormVariant] as const;
