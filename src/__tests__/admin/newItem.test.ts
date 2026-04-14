import assert from "node:assert/strict";
import test from "node:test";
import { newItem, newSection } from "../../app/(admin)/admin/(protected)/menus/[uid]/utils/newItem";

// ─── newItem ──────────────────────────────────────────────────────────────────

test("newItem: returns an object with all required fields", () => {
  const item = newItem();
  assert.ok("title" in item);
  assert.ok("description" in item);
  assert.ok("price_per" in item);
  assert.ok("price_min" in item);
  assert.ok("price_max" in item);
});

test("newItem: title is a valid RtBlock array with empty text", () => {
  const { title } = newItem();
  assert.equal(Array.isArray(title), true);
  assert.equal(title.length, 1);
  assert.equal(title[0].text, "");
  assert.equal(title[0].type, "paragraph");
});

test("newItem: description is a valid RtBlock array with empty text", () => {
  const { description } = newItem();
  assert.equal(Array.isArray(description), true);
  assert.equal(description.length, 1);
  assert.equal(description[0].text, "");
});

test("newItem: prices start at zero", () => {
  const item = newItem();
  assert.equal(item.price_min, 0);
  assert.equal(item.price_max, 0);
});

test("newItem: price_per defaults to 'per person'", () => {
  assert.equal(newItem().price_per, "per person");
});

test("newItem: each call returns a new independent object", () => {
  const a = newItem();
  const b = newItem();
  a.title[0].text = "modified";
  assert.equal(b.title[0].text, "");
});

// ─── newSection ───────────────────────────────────────────────────────────────

test("newSection: returns an object with primary and items fields", () => {
  const section = newSection();
  assert.ok("primary" in section);
  assert.ok("items" in section);
});

test("newSection: primary has title, description, and caption", () => {
  const { primary } = newSection();
  assert.ok("title" in primary);
  assert.ok("description" in primary);
  assert.ok("caption" in primary);
});

test("newSection: all primary fields are empty RtBlock arrays", () => {
  const { primary } = newSection();
  for (const field of [primary.title, primary.description, primary.caption]) {
    assert.equal(Array.isArray(field), true);
    assert.equal(field.length, 1);
    assert.equal(field[0].text, "");
    assert.equal(field[0].type, "paragraph");
  }
});

test("newSection: items starts as empty array", () => {
  const { items } = newSection();
  assert.equal(Array.isArray(items), true);
  assert.equal(items.length, 0);
});

test("newSection: each call returns independent objects", () => {
  const a = newSection();
  const b = newSection();
  a.primary.title[0].text = "modified";
  assert.equal(b.primary.title[0].text, "");
});
