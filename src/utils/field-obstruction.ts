/**
 * Measures whether the inquiry form's floating action bar is physically
 * covering the form's own fields.
 *
 * The April 2026 mobile audit found the Prev/Next/Submit bar pinned
 * `fixed bottom-0` on small screens, sitting over the inputs beneath it. A
 * device split can only ever be circumstantial evidence for that — mobile
 * visitors might simply be less patient, or the form might just be long on a
 * small screen. This measures the overlap itself, so the question can be
 * settled instead of argued.
 *
 * The survey runs when a step renders rather than when a field is focused,
 * because a fully covered field cannot be tapped: focus would never fire for
 * exactly the people worst affected.
 */

/** Rect shape we need. `DOMRect` satisfies this structurally. */
export type Rect = Pick<
  DOMRect,
  "top" | "right" | "bottom" | "left" | "width" | "height"
>;

export type FieldRect = { name: string; rect: Rect };

export type ObstructionReport = {
  /** Visible fields on the step that was surveyed. */
  fieldCount: number;
  /** How many the bar covers by at least `MIN_OBSCURED_PCT`. */
  obscuredCount: number;
  /** Worst-affected field, or null when nothing is meaningfully covered. */
  worstField: string | null;
  /** Share of that field covered, 0-100. */
  worstPct: number;
};

/** Hairline overlaps aren't worth reporting — only ones a person would fight. */
export const MIN_OBSCURED_PCT = 10;

const FIELD_SELECTOR = "[data-inquire-field]";
const ACTION_BAR_SELECTOR = "[data-inquire-actionbar]";

/**
 * Share of `field` that `bar` covers, 0-100. Requires overlap on both axes —
 * a bar sitting beside a field covers nothing, however tall it is.
 */
export function obscuredPct(field: Rect, bar: Rect): number {
  if (field.height <= 0 || field.width <= 0) return 0;

  const horizontal =
    Math.min(field.right, bar.right) - Math.max(field.left, bar.left);
  if (horizontal <= 0) return 0;

  const vertical =
    Math.min(field.bottom, bar.bottom) - Math.max(field.top, bar.top);
  if (vertical <= 0) return 0;

  // Measured against the field's own height: covering half of a short input is
  // as obstructive as covering half of a tall one.
  return Math.min(100, Math.round((vertical / field.height) * 100));
}

/** Pure core, so the arithmetic is testable without a DOM. */
export function assessObstruction(
  fields: FieldRect[],
  bar: Rect | null,
): ObstructionReport {
  const report: ObstructionReport = {
    fieldCount: fields.length,
    obscuredCount: 0,
    worstField: null,
    worstPct: 0,
  };
  if (!bar) return report;

  for (const field of fields) {
    const pct = obscuredPct(field.rect, bar);
    if (pct < MIN_OBSCURED_PCT) continue;
    report.obscuredCount += 1;
    if (pct > report.worstPct) {
      report.worstPct = pct;
      report.worstField = field.name;
    }
  }
  return report;
}

function isVisible(el: Element): boolean {
  const rect = el.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

/**
 * Reads the live DOM and reports what the action bar is currently covering.
 * Returns null on the server, or when the form isn't rendered.
 *
 * Every step renders at once (hidden steps collapse to zero size), so both
 * lookups filter to visible elements and only the current step is measured.
 */
export function surveyObstruction():
  | (ObstructionReport & {
      /** Computed position of the bar. `fixed` is the defective case. */
      barPosition: string;
    })
  | null {
  if (typeof document === "undefined") return null;

  const bar = Array.from(document.querySelectorAll(ACTION_BAR_SELECTOR)).find(
    isVisible,
  );
  if (!bar) return null;

  const fields: FieldRect[] = Array.from(
    document.querySelectorAll(FIELD_SELECTOR),
  )
    .filter(isVisible)
    .map((el) => ({
      name: el.getAttribute("data-inquire-field") ?? "unknown",
      rect: el.getBoundingClientRect(),
    }));

  if (fields.length === 0) return null;

  const barPosition =
    typeof getComputedStyle === "function"
      ? getComputedStyle(bar).position
      : "unknown";

  return {
    ...assessObstruction(fields, bar.getBoundingClientRect()),
    barPosition,
  };
}
