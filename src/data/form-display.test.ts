import assert from "node:assert/strict";
import test from "node:test";
import {
  GUEST_RANGE_LABELS,
  guestCountValue,
  guestPhrase,
  spacePhrase,
  TIME_FLEXIBLE,
  timePhrase,
} from "./form-display";
import { getFormData } from "./form.types";
import { ROOM_MAX_CAPACITY, ROOM_UNDECIDED, withCapacity } from "./rooms";

function question(key: string) {
  for (const page of getFormData()) {
    const found = page.questions.find((q) => q.question_key === key);
    if (found) return found;
  }
  throw new Error(`no question ${key}`);
}

test("room options carry their capacity", () => {
  const options = question("desired_space").options;
  const pacific = options.find((o) => o.value === "pacific-room");
  assert.equal(pacific?.title, "The Pacific Room · up to 90 guests");
});

test("every room with a capacity shows it", () => {
  for (const option of question("desired_space").options) {
    const capacity = ROOM_MAX_CAPACITY[option.value];
    if (!capacity) continue;
    assert.match(
      option.title,
      new RegExp(`up to ${capacity} guests$`),
      `${option.value} should advertise ${capacity}`,
    );
  }
});

test("every room in the form has a capacity figure", () => {
  // A room added to the dropdown without a capacity would silently render as a
  // bare name, which is the state this change exists to fix.
  const missing = question("desired_space")
    .options.filter((o) => o.value !== ROOM_UNDECIDED)
    .filter((o) => !ROOM_MAX_CAPACITY[o.value]);
  assert.deepEqual(missing, [], "rooms missing from ROOM_MAX_CAPACITY");
});

test("the undecided option is not given a capacity", () => {
  const undecided = question("desired_space").options.find(
    (o) => o.value === ROOM_UNDECIDED,
  );
  assert.ok(undecided, "the form offers a 'not sure yet' room option");
  assert.doesNotMatch(String(undecided.title), /up to/);
});

test("withCapacity leaves unknown rooms alone", () => {
  assert.equal(withCapacity("The Ghost Room", "ghost-room"), "The Ghost Room");
});

test("the time question offers a flexible answer", () => {
  const options = question("desired_time").options;
  assert.ok(options.some((o) => o.value === TIME_FLEXIBLE));
});

test("head count is a range, not a free number", () => {
  const head = question("head_count");
  assert.equal(head.question_type, "dropdown");
  assert.ok(head.options.length > 0);
});

test("every guest range option has a label to render back", () => {
  // Storing a bound with no matching label is how the sales email ends up
  // saying "50" when the visitor said "26 - 50".
  for (const option of question("head_count").options) {
    assert.ok(
      GUEST_RANGE_LABELS[option.value],
      `no label for stored value ${option.value}`,
    );
  }
});

test("guest ranges store a number, so the column type is unchanged", () => {
  for (const option of question("head_count").options) {
    assert.match(option.value, /^\d+$/, `${option.value} is not numeric`);
  }
});

test("the recap sentence reads correctly for the sentinels", () => {
  assert.equal(spacePhrase(ROOM_UNDECIDED), "a space we’ll help you choose");
  assert.equal(timePhrase(TIME_FLEXIBLE), "a time that’s open");
  assert.equal(guestPhrase("50"), "26 - 50");
  assert.equal(guestPhrase("675"), "more than 450");
});

test("ordinary answers still read as themselves", () => {
  assert.equal(spacePhrase("grand-ballroom"), "Grand Ballroom");
  assert.equal(timePhrase("6pm"), "6pm");
});

test("an inquiry stored before this change still renders", () => {
  // Old rows hold an exact count with no matching range label.
  assert.equal(guestPhrase("137"), "137");
});

test("empty answers render as empty, not as a sentinel", () => {
  assert.equal(spacePhrase(""), "");
  assert.equal(timePhrase(undefined), "");
  assert.equal(guestPhrase(null), "");
});

test("guest count coerces to what INT4 accepts", () => {
  // glb_submissions.head_count is int4, nullable, default 0 — confirmed with
  // `pnpm schema:pull`, not inferred from call sites.
  assert.equal(guestCountValue("100"), 100);
  assert.equal(guestCountValue(250), 250);
  assert.equal(guestCountValue("  675  "), 675);
});

test("an unparseable guest count becomes null, never NaN", () => {
  // The submit path used to send parseInt(...) and the API stringified it, so
  // a bad answer arrived as the literal "NaN" and Postgres rejected the whole
  // INSERT — a 500 on the only conversion path on the site.
  for (const bad of ["", "   ", "unknown", null, undefined, {}]) {
    assert.equal(guestCountValue(bad), null, `${JSON.stringify(bad)} -> null`);
  }
});

test("null is used rather than the column default", () => {
  // The column defaults to 0. Null says "not stated"; 0 is a claim nobody made.
  assert.notEqual(guestCountValue(""), 0);
});
