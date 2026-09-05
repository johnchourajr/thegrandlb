import assert from "node:assert/strict";
import test from "node:test";
import {
  ARM_CONTROL,
  ARM_TREATMENT,
  EXPERIMENT_COOKIE_MAX_AGE,
  isExperimentId,
  newExperimentId,
} from "./experiment";

/**
 * Bucketing is not tested here because this module no longer does it — the
 * flag uses `vercelAdapter`, whose declaration type omits `decide`, so Vercel
 * splits the traffic. What remains is the visitor id Vercel buckets by, and
 * the property that matters is that it is well formed, unpredictable, and
 * stable enough to outlive the experiment.
 */

test("a minted id is well formed", () => {
  const id = newExperimentId();
  assert.ok(id, "crypto is available in this runtime");
  assert.ok(isExperimentId(id));
});

test("ids are not repeated", () => {
  const seen = new Set(Array.from({ length: 500 }, () => newExperimentId()));
  assert.equal(seen.size, 500, "no collisions across 500 mints");
});

test("ids are not sequential or guessable", () => {
  // A predictable id would let someone choose their own arm.
  const a = newExperimentId();
  const b = newExperimentId();
  assert.notEqual(a, b);
  assert.ok(a && b);
  const differing = [...a].filter((ch, i) => ch !== b[i]).length;
  assert.ok(differing > 4, `ids differ in only ${differing} characters`);
});

test("validation is strict", () => {
  assert.ok(isExperimentId("x_0123456789abcdef"));
  assert.ok(!isExperimentId("x_0123456789ABCDEF"), "uppercase hex rejected");
  assert.ok(!isExperimentId("s_0123456789abcdef"), "a session id is not one");
  assert.ok(!isExperimentId("x_0123456789abcde"), "too short");
  assert.ok(!isExperimentId("x_0123456789abcdef0"), "too long");
  assert.ok(!isExperimentId("x_0123456789abcdeg"), "non-hex rejected");
});

test("anything unusable is rejected, so identify yields no entity", () => {
  // No entity means Vercel cannot bucket, so the flag falls back to its
  // defaultValue — today's form. Refusing cookies must never mean being shown
  // an untested variant.
  for (const bad of [null, undefined, "", "   ", "nonsense", 42, {}, []]) {
    assert.equal(isExperimentId(bad), false, `${JSON.stringify(bad)}`);
  }
});

test("the cookie outlives any plausible experiment", () => {
  const days = EXPERIMENT_COOKIE_MAX_AGE / 60 / 60 / 24;
  assert.ok(days >= 365, `only ${days} days`);
});

test("arm names match the variants declared in Vercel", () => {
  // `vercel flags create inquiry-form-variant --kind string
  //    --variant control=… --variant treatment=…`
  // A mismatch here resolves to a variant Vercel has never heard of.
  assert.equal(ARM_CONTROL, "control");
  assert.equal(ARM_TREATMENT, "treatment");
});
