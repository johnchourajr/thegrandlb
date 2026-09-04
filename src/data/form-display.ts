import { ROOM_UNDECIDED } from "./rooms";
import { formatTitle } from "@/utils/utils";

/**
 * Turns stored inquiry values back into readable English.
 *
 * The recap screen and the sales email both render the answers as a sentence —
 * "…having a Wedding in The Pacific Room on 1 February 2025 at 6pm for 150
 * guests." Two of the answers added in #215 are not literal values:
 *
 *   - `desired_space` can be "undecided" — a deliberate "help me choose"
 *   - `desired_time` can be "flexible" — "open to what's available"
 *
 * and `head_count` now stores a range's upper bound rather than a count, so
 * rendering it directly would tell the sales team "50" when the visitor said
 * "26 - 50". Passed through `formatTitle` the sentinels read "in Undecided"
 * and "at Flexible", which is worse than either.
 *
 * These are pure so the sentence can be tested without a DOM.
 */

/** Sentinel for "no particular time" — see form.json `desired_time`. */
export const TIME_FLEXIBLE = "flexible";

/**
 * Guest ranges, keyed by the value stored for each.
 *
 * The stored value is the range's **upper bound**, as a number, so the column
 * type in `glb_submissions` is unchanged — that table is managed outside this
 * repo and its `head_count` type is not knowable from here. The label is what
 * the visitor actually chose, and is what people should be shown.
 */
export const GUEST_RANGE_LABELS: Record<string, string> = {
  "25": "up to 25",
  "50": "26 - 50",
  "100": "51 - 100",
  "200": "101 - 200",
  "300": "201 - 300",
  "450": "301 - 450",
  "675": "more than 450",
};

/** Reads into "…in {phrase} on…". */
export function spacePhrase(value: unknown): string {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  if (raw === ROOM_UNDECIDED) return "a space we’ll help you choose";
  return formatTitle(raw);
}

/** Reads into "…at {phrase} for…". */
export function timePhrase(value: unknown): string {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  if (raw === TIME_FLEXIBLE) return "a time that’s open";
  return formatTitle(raw);
}

/**
 * Reads into "…for {phrase} guests." Falls back to the raw value so an
 * inquiry submitted before this change still renders as the number it stored.
 */
export function guestPhrase(value: unknown): string {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  return GUEST_RANGE_LABELS[raw] ?? raw;
}

/**
 * Coerces a guest-count answer to what the database column accepts.
 *
 * `glb_submissions.head_count` is `INT4`, nullable, default 0. The submit path
 * used to send `parseInt(...)` straight through, and the API stringified it —
 * so any answer that did not parse became the literal string "NaN" and
 * Postgres rejected the whole INSERT. That is a 500 on the only conversion
 * path on the site, for a field a visitor can no longer type into freely.
 *
 * Returns null rather than a guess. Null is a legitimate "not stated" in that
 * column; 0 would be a claim nobody made.
 */
export function guestCountValue(value: unknown): number | null {
  const parsed = Number.parseInt(String(value ?? "").trim(), 10);
  return Number.isFinite(parsed) ? parsed : null;
}
