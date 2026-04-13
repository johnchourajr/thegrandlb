import assert from "node:assert/strict";
import test from "node:test";
import { rtRead, rtWrite } from "../../app/(admin)/admin/(protected)/menus/[uid]/utils/rt";
import type { RtBlock } from "../../types/menu";

function block(text: string, type = "paragraph"): RtBlock {
  return { type, text, spans: [] };
}

// ─── rtRead ───────────────────────────────────────────────────────────────────

test("rtRead: returns empty string for empty array", () => {
  assert.equal(rtRead([]), "");
});

test("rtRead: returns text of first block", () => {
  assert.equal(rtRead([block("Hello world")]), "Hello world");
});

test("rtRead: ignores subsequent blocks", () => {
  assert.equal(rtRead([block("First"), block("Second")]), "First");
});

test("rtRead: returns empty string when first block has empty text", () => {
  assert.equal(rtRead([block("")]), "");
});

// ─── rtWrite ──────────────────────────────────────────────────────────────────

test("rtWrite: creates a new block when original is empty", () => {
  const result = rtWrite("New text", []);
  assert.equal(result.length, 1);
  assert.equal(result[0].text, "New text");
  assert.equal(result[0].type, "paragraph");
});

test("rtWrite: updates text of first block and preserves its type", () => {
  const original = [block("Old text", "preformatted")];
  const result = rtWrite("New text", original);
  assert.equal(result[0].text, "New text");
  assert.equal(result[0].type, "preformatted");
});

test("rtWrite: preserves trailing blocks beyond the first", () => {
  const original = [block("First"), block("Second"), block("Third")];
  const result = rtWrite("Updated first", original);
  assert.equal(result.length, 3);
  assert.equal(result[0].text, "Updated first");
  assert.equal(result[1].text, "Second");
  assert.equal(result[2].text, "Third");
});

test("rtWrite: preserves spans on the first block", () => {
  const original: RtBlock[] = [
    { type: "paragraph", text: "Old", spans: [{ start: 0, end: 3, type: "strong" }] },
  ];
  const result = rtWrite("New", original);
  assert.deepEqual(result[0].spans, original[0].spans);
});

test("rtWrite → rtRead round-trip", () => {
  const original = [block("Original")];
  const written = rtWrite("Updated", original);
  assert.equal(rtRead(written), "Updated");
});
