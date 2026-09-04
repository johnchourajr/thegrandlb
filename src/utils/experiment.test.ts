import assert from "node:assert/strict";
import test from "node:test";
import {
  ARM_CONTROL,
  ARM_VARIANT,
  assignArm,
  hashToBucket,
  isExperimentId,
  newExperimentId,
} from "./experiment";

const KEY = "inquiry-form-variant";

/** A deterministic spread of valid ids, so tests do not depend on randomness. */
function ids(n: number): string[] {
  const out: string[] = [];
  for (let i = 0; i < n; i++) {
    out.push("x_" + i.toString(16).padStart(16, "0"));
  }
  return out;
}

test("a minted id is well formed", () => {
  const id = newExperimentId();
  assert.ok(id, "crypto is available in this runtime");
  assert.ok(isExperimentId(id));
});

test("ids are not repeated", () => {
  const seen = new Set(Array.from({ length: 200 }, () => newExperimentId()));
  assert.equal(seen.size, 200);
});

test("assignment is stable for the same visitor", () => {
  // The property the whole experiment rests on: someone who returns tomorrow,
  // or reloads mid-form, must see the same version.
  for (const id of ids(50)) {
    const first = assignArm(id, KEY);
    for (let i = 0; i < 5; i++) {
      assert.equal(assignArm(id, KEY), first, `${id} drifted`);
    }
  }
});

test("a 50/50 split is close to even", () => {
  const sample = ids(10_000);
  const variant = sample.filter((id) => assignArm(id, KEY) === ARM_VARIANT).length;
  const share = variant / sample.length;
  assert.ok(
    share > 0.47 && share < 0.53,
    `expected roughly half in the variant, got ${(share * 100).toFixed(1)}%`,
  );
});

test("the share is honoured for other splits", () => {
  const sample = ids(10_000);
  for (const target of [0.1, 0.25, 0.9]) {
    const variant = sample.filter(
      (id) => assignArm(id, KEY, target) === ARM_VARIANT,
    ).length;
    const share = variant / sample.length;
    assert.ok(
      Math.abs(share - target) < 0.03,
      `share ${target}: got ${(share * 100).toFixed(1)}%`,
    );
  }
});

test("a rollout can be started and stopped completely", () => {
  // 0 must mean nobody, not "almost nobody" — this is the kill switch.
  for (const id of ids(200)) {
    assert.equal(assignArm(id, KEY, 0), ARM_CONTROL);
    assert.equal(assignArm(id, KEY, 1), ARM_VARIANT);
  }
});

test("different experiments assign independently", () => {
  // Without mixing the key into the hash, the same visitors would be the
  // control group in every experiment forever.
  const sample = ids(2_000);
  const differing = sample.filter(
    (id) => assignArm(id, "experiment-a") !== assignArm(id, "experiment-b"),
  ).length;
  const share = differing / sample.length;
  assert.ok(
    share > 0.4 && share < 0.6,
    `arms should be uncorrelated across experiments, ${(share * 100).toFixed(1)}% differed`,
  );
});

test("a visitor without a usable id sees the current form", () => {
  // Refusing cookies must not mean being shown an untested variant.
  for (const bad of [null, undefined, "", "nonsense", "x_short", 42, {}]) {
    assert.equal(assignArm(bad, KEY), ARM_CONTROL, `${JSON.stringify(bad)}`);
    assert.equal(assignArm(bad, KEY, 1), ARM_CONTROL, "even at 100% rollout");
  }
});

test("id validation is strict", () => {
  assert.ok(isExperimentId("x_0123456789abcdef"));
  assert.ok(!isExperimentId("x_0123456789ABCDEF"), "uppercase hex rejected");
  assert.ok(!isExperimentId("s_0123456789abcdef"), "a session id is not one");
  assert.ok(!isExperimentId("x_0123456789abcde"), "too short");
  assert.ok(!isExperimentId("x_0123456789abcdef0"), "too long");
});

test("the hash stays inside its range and is stable", () => {
  for (const id of ids(500)) {
    const bucket = hashToBucket(id);
    assert.ok(Number.isInteger(bucket) && bucket >= 0 && bucket < 10_000);
  }
  // Pinned so a change to the hash is a deliberate act — altering it silently
  // reshuffles every visitor mid-experiment and invalidates the results.
  assert.equal(hashToBucket("inquiry-form-variant:x_0000000000000000"), 3674);
});
