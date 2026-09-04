/**
 * Visitor identity for the inquiry form experiment (#217).
 *
 * Bucketing itself lives in Vercel Flags, not here. The flag is declared with
 * `vercelAdapter`, whose declaration type is
 * `Omit<FlagDeclaration, 'decide' | 'origin'>` — the adapter decides, and
 * rollout is configured with `vercel flags rollout … --by user.id`. What this
 * module provides is the stable id Vercel buckets *by*.
 *
 * The site has no accounts, so that id has to be minted. It is deliberately
 * not the analytics session id from `src/utils/session.ts`: that has a
 * 30-minute sliding idle window because it groups events within a visit, and
 * bucketing on it would reassign anyone who returned the next day. Returning
 * visitors are exactly who this experiment is about — #216 invites people to
 * leave and finish an inquiry later — and a visitor who starts in one arm and
 * finishes in the other makes the funnel uninterpretable.
 *
 * A cookie rather than localStorage because the flag resolves on the server,
 * and the server can only see cookies.
 */

/** Readable by the client, which stamps the resolved arm onto analytics. */
export const EXPERIMENT_COOKIE = "glb.exp";

/** A year. Long enough that the experiment ends before the id does. */
export const EXPERIMENT_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** Variant keys, matching the flag created in Vercel. */
export const ARM_CONTROL = "control";
export const ARM_TREATMENT = "treatment";
export type Arm = typeof ARM_CONTROL | typeof ARM_TREATMENT;

/** `x_` plus 16 hex characters — 8 bytes of entropy. */
const ID_PATTERN = /^x_[0-9a-f]{16}$/;

export function isExperimentId(value: unknown): value is string {
  return typeof value === "string" && ID_PATTERN.test(value);
}

/**
 * Mints a visitor id, or null where no CSPRNG is available.
 *
 * Returns null rather than falling back to `Math.random`, for the same reason
 * `session.ts` does: CodeQL flags it, and a predictable id would let someone
 * pick their own arm.
 */
export function newExperimentId(): string | null {
  if (
    typeof crypto === "undefined" ||
    typeof crypto.getRandomValues !== "function"
  ) {
    return null;
  }
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return `x_${hex}`;
}
