import assert from "node:assert/strict";
import test from "node:test";
import { formatDate } from "./utils";

/**
 * These run under whatever TZ the suite is invoked with. The CI job pins
 * TZ=America/Los_Angeles, the venue's own timezone and the one that exposed
 * the fault in #213 — west of Greenwich, reading the month locally and the day
 * in UTC disagree for the whole of the 1st.
 */

test("the 1st of a month keeps its month", () => {
  // The exact case a visitor reported in May 2024: entered 1 February, saw
  // 1 January. Before the fix this returned "January 1, 2025" west of UTC.
  assert.equal(formatDate("2025-02-01"), "February 1, 2025");
});

test("the 1st of January keeps its year", () => {
  // Worse than a wrong month: the old code read the month locally (December,
  // in 2024) and the year in UTC (2025), producing a date that never existed.
  assert.equal(formatDate("2025-01-01"), "January 1, 2025");
});

test("every 1st of the month formats correctly", () => {
  const expected = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  expected.forEach((month, i) => {
    const mm = String(i + 1).padStart(2, "0");
    assert.equal(
      formatDate(`2025-${mm}-01`),
      `${month} 1, 2025`,
      `2025-${mm}-01 should stay in ${month}`,
    );
  });
});

test("days other than the 1st are unaffected", () => {
  assert.equal(formatDate("2025-02-02"), "February 2, 2025");
  assert.equal(formatDate("2025-06-15"), "June 15, 2025");
  assert.equal(formatDate("2025-12-31"), "December 31, 2025");
});

test("a leap day survives", () => {
  assert.equal(formatDate("2024-02-29"), "February 29, 2024");
});

test("formatting twice changes nothing", () => {
  // The submit path formatted on the client and again on the server, shifting
  // the date a second time. That call is gone; this keeps it gone.
  const once = formatDate("2025-02-01");
  assert.equal(formatDate(once), once);
  assert.equal(formatDate(formatDate(formatDate("2025-12-01"))), "December 1, 2025");
});

test("an ISO timestamp uses its UTC calendar date", () => {
  // salesEmail stamps "now" with new Date().toISOString().
  assert.equal(formatDate("2026-09-04T20:15:00.000Z"), "September 4, 2026");
});

test("empty input yields an empty string", () => {
  // The email templates rely on this to fall through to "N/A".
  assert.equal(formatDate(""), "");
});

test("unrecognised input is handed back rather than invented", () => {
  // The old version returned "Invalid Date NaN, NaN" here.
  assert.equal(formatDate("not a date"), "not a date");
  assert.equal(formatDate("  2025-02-01  "), "February 1, 2025");
});

test("an impossible month is not coerced", () => {
  assert.equal(formatDate("2025-13-01"), "2025-13-01");
});
