import assert from "node:assert/strict";
import test from "node:test";
import {
  assessObstruction,
  MIN_OBSCURED_PCT,
  obscuredPct,
  type Rect,
} from "./field-obstruction";

/** Build a rect the way the browser reports one. */
function rect(top: number, height: number, left = 0, width = 300): Rect {
  return {
    top,
    left,
    width,
    height,
    right: left + width,
    bottom: top + height,
  };
}

// A phone-sized viewport with the action bar pinned to the bottom, which is
// the layout the April 2026 audit described.
const PINNED_BAR = rect(660, 56);

test("a field clear of the bar is not obscured", () => {
  assert.equal(obscuredPct(rect(100, 64), PINNED_BAR), 0);
});

test("a field fully behind the bar is fully obscured", () => {
  assert.equal(obscuredPct(rect(670, 40), PINNED_BAR), 100);
});

test("a half-covered field reports half", () => {
  // Field spans 640-704; the bar starts at 660, so 44 of 64px are covered.
  assert.equal(obscuredPct(rect(640, 64), PINNED_BAR), 69);
});

test("a bar beside a field covers nothing, however tall", () => {
  const sideBar = rect(0, 2000, 400, 100);
  const field = rect(100, 64, 0, 300);
  assert.equal(
    obscuredPct(field, sideBar),
    0,
    "no horizontal overlap means no obstruction",
  );
});

test("a zero-height field cannot be obscured", () => {
  assert.equal(obscuredPct(rect(660, 0), PINNED_BAR), 0);
});

test("assessObstruction counts only meaningfully covered fields", () => {
  // The bar spans 660-716, so a field starting at 680 hangs below it and is
  // only partly covered — being lower on the page does not mean more covered.
  const report = assessObstruction(
    [
      { name: "event_name", rect: rect(100, 64) }, // clear of the bar
      { name: "event_type", rect: rect(650, 64) }, // 54 of 64px covered
      { name: "desired_date", rect: rect(680, 64) }, // 36 of 64px covered
    ],
    PINNED_BAR,
  );

  assert.equal(report.fieldCount, 3);
  assert.equal(report.obscuredCount, 2);
  assert.equal(report.worstField, "event_type", "worst is most covered");
  assert.equal(report.worstPct, 84);
});

test("assessObstruction ignores hairline overlap", () => {
  // Field bottom sits 3px into the bar — 5% of a 64px field, under the floor.
  const report = assessObstruction(
    [{ name: "email", rect: rect(599, 64) }],
    rect(660, 56),
  );
  assert.equal(report.obscuredCount, 0);
  assert.equal(report.worstField, null);
  assert.ok(5 < MIN_OBSCURED_PCT, "test relies on the floor being above 5%");
});

test("assessObstruction reports nothing when there is no bar", () => {
  const report = assessObstruction(
    [{ name: "email", rect: rect(680, 64) }],
    null,
  );
  assert.equal(report.obscuredCount, 0);
  assert.equal(report.worstField, null);
  assert.equal(report.fieldCount, 1);
});

test("a desktop layout with the bar below the fold obscures nothing", () => {
  // Bar sticky at the bottom of a tall viewport, fields stacked well above it.
  const report = assessObstruction(
    [
      { name: "full_name", rect: rect(200, 64) },
      { name: "email", rect: rect(280, 64) },
      { name: "phone", rect: rect(360, 64) },
    ],
    rect(900, 56),
  );
  assert.equal(report.obscuredCount, 0);
});
