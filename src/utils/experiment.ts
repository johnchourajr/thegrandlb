/**
 * Assignment for the inquiry form experiment (#217).
 *
 * Deliberately separate from `src/utils/session.ts`. That session id has a
 * 30-minute sliding idle window because it was built to group analytics events
 * within a visit. Bucketing on it would reassign anyone who came back the next
 * day — and returning visitors are exactly who this experiment is about, since
 * #216 invites people to leave and finish an inquiry later. A visitor who
 * starts in one arm and finishes in the other makes the funnel uninterpretable.
 *
 * So the experiment id is its own long-lived value, in a cookie rather than
 * localStorage: the flag is evaluated on the server, and the server can only
 * see cookies.
 *
 * Assignment is a pure function of (experiment id, flag key). Nothing is
 * stored per experiment, there is no lookup, and the same visitor always lands
 * in the same arm — on any device that carries the same cookie, on every
 * render, server and client alike.
 */

/** Readable by the client, which stamps the arm onto analytics events. */
export const EXPERIMENT_COOKIE = "glb.exp";

/** A year. Long enough that the experiment ends before the id does. */
export const EXPERIMENT_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const ARM_CONTROL = "control";
export const ARM_VARIANT = "variant";
export type Arm = typeof ARM_CONTROL | typeof ARM_VARIANT;

/** Bucket resolution. 10,000 gives splits to one hundredth of a percent. */
const BUCKETS = 10_000;

/** `s_` prefix mirrors the session id; 16 hex chars is 8 bytes of entropy. */
const ID_PATTERN = /^x_[0-9a-f]{16}$/;

export function isExperimentId(value: unknown): value is string {
  return typeof value === "string" && ID_PATTERN.test(value);
}

/**
 * Mints an experiment id, or null where no CSPRNG is available.
 *
 * Returns null rather than falling back to `Math.random`, for the same reason
 * `session.ts` does: CodeQL flags it, and a predictable id would let someone
 * choose their own arm.
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

/**
 * FNV-1a, 32-bit. Chosen because it is tiny, dependency-free, and identical on
 * the server and in the browser — the same visitor must bucket the same way in
 * both, or the rendered arm and the reported arm disagree.
 *
 * Not a security boundary. It decides which form someone sees, nothing more.
 */
export function hashToBucket(input: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    // hash * 16777619, kept in 32 bits without overflowing to a float.
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash % BUCKETS;
}

/**
 * The arm this visitor belongs in.
 *
 * `variantShare` is the proportion in the variant, 0..1. The flag key is mixed
 * into the hash so a visitor's arm in one experiment says nothing about their
 * arm in the next — without it, the same people would always be the control
 * group, and every experiment would inherit the last one's bias.
 *
 * Returns the control arm for a missing or malformed id, so a visitor who
 * refuses cookies sees the form that exists today rather than an untested one.
 */
export function assignArm(
  experimentId: unknown,
  flagKey: string,
  variantShare = 0.5,
): Arm {
  if (!isExperimentId(experimentId)) return ARM_CONTROL;
  if (!(variantShare > 0)) return ARM_CONTROL;
  if (variantShare >= 1) return ARM_VARIANT;

  const bucket = hashToBucket(`${flagKey}:${experimentId}`);
  return bucket < variantShare * BUCKETS ? ARM_VARIANT : ARM_CONTROL;
}
