import assert from "node:assert/strict";
import test from "node:test";
import {
  inlineDiff,
  diffMenuDocs,
} from "../../app/(admin)/admin/(protected)/menus/[uid]/utils/diff";
import type {
  MenuDoc,
  MenuGroup,
  MenuSectionData,
  MenuItemData,
} from "../../types/menu";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function rt(text: string) {
  return [{ type: "paragraph", text, spans: [] }];
}

function makeItem(name: string, priceMin = 0, priceMax = 0): MenuItemData {
  return {
    title: rt(name),
    description: rt(""),
    price_per: "per person",
    price_min: priceMin,
    price_max: priceMax,
  };
}

function makeSection(title: string, items: MenuItemData[] = []): MenuSectionData {
  return {
    primary: { title: rt(title), description: rt(""), caption: rt("") },
    items,
  };
}

function makeGroup(
  title: string,
  sections: MenuSectionData[] = [],
  description = "",
  disclaimer = "",
): MenuGroup {
  return { title, description, disclaimer, sections };
}

function makeDoc(overrides: Partial<MenuDoc> = {}): MenuDoc {
  return {
    uid: "classic",
    page_title: "Classic Menu",
    page_description: "Our classic menu",
    page_disclaimer: "",
    groups: [],
    ...overrides,
  };
}

// ─── inlineDiff ───────────────────────────────────────────────────────────────

test("inlineDiff: identical strings produce all-same parts", () => {
  const parts = inlineDiff("hello world", "hello world");
  assert.ok(parts.every((p) => p.kind === "same"));
  assert.equal(
    parts.map((p) => p.text).join(""),
    "hello world",
  );
});

test("inlineDiff: empty before → all additions", () => {
  const parts = inlineDiff("", "new text");
  assert.ok(parts.length > 0);
  assert.ok(parts.every((p) => p.kind === "add"));
});

test("inlineDiff: empty after → all deletions", () => {
  const parts = inlineDiff("old text", "");
  assert.ok(parts.length > 0);
  assert.ok(parts.every((p) => p.kind === "del"));
});

test("inlineDiff: added word is marked add", () => {
  const parts = inlineDiff("hello", "hello world");
  const adds = parts.filter((p) => p.kind === "add");
  assert.ok(adds.some((p) => p.text.trim() === "world"));
});

test("inlineDiff: removed word is marked del", () => {
  const parts = inlineDiff("hello world", "hello");
  const dels = parts.filter((p) => p.kind === "del");
  assert.ok(dels.some((p) => p.text.trim() === "world"));
});

test("inlineDiff: trailing space addition is detected", () => {
  const parts = inlineDiff("sentence.", "sentence. ");
  assert.ok(parts.some((p) => p.kind === "add"));
});

test("inlineDiff: reconstructed 'after' string matches", () => {
  const before = "The quick brown fox";
  const after = "The slow brown fox jumps";
  const parts = inlineDiff(before, after);
  const reconstructed = parts
    .filter((p) => p.kind !== "del")
    .map((p) => p.text)
    .join("");
  assert.equal(reconstructed, after);
});

test("inlineDiff: reconstructed 'before' string matches", () => {
  const before = "The quick brown fox";
  const after = "The slow brown fox jumps";
  const parts = inlineDiff(before, after);
  const reconstructed = parts
    .filter((p) => p.kind !== "add")
    .map((p) => p.text)
    .join("");
  assert.equal(reconstructed, before);
});

// ─── diffMenuDocs ─────────────────────────────────────────────────────────────

test("diffMenuDocs: identical docs produce no changes", () => {
  const doc = makeDoc({ page_title: "Test" });
  assert.equal(diffMenuDocs(doc, doc).length, 0);
});

test("diffMenuDocs: page_title change", () => {
  const before = makeDoc({ page_title: "Old" });
  const after = makeDoc({ page_title: "New" });
  const changes = diffMenuDocs(before, after);
  assert.equal(changes.length, 1);
  assert.equal(changes[0].path, "Page / Title");
  assert.equal(changes[0].kind, "modified");
  assert.equal(changes[0].before, "Old");
  assert.equal(changes[0].after, "New");
});

test("diffMenuDocs: page_description change", () => {
  const before = makeDoc({ page_description: "Original description" });
  const after = makeDoc({ page_description: "Updated description" });
  const changes = diffMenuDocs(before, after);
  assert.ok(changes.some((c) => c.path === "Page / Description"));
});

test("diffMenuDocs: page_disclaimer change", () => {
  const before = makeDoc({ page_disclaimer: "" });
  const after = makeDoc({ page_disclaimer: "Prices subject to change." });
  const changes = diffMenuDocs(before, after);
  assert.ok(changes.some((c) => c.path === "Page / Disclaimer"));
});

test("diffMenuDocs: added group", () => {
  const before = makeDoc({ groups: [] });
  const after = makeDoc({ groups: [makeGroup("Appetizers")] });
  const changes = diffMenuDocs(before, after);
  assert.ok(changes.some((c) => c.kind === "added" && c.path === "Appetizers"));
});

test("diffMenuDocs: removed group", () => {
  const before = makeDoc({ groups: [makeGroup("Appetizers")] });
  const after = makeDoc({ groups: [] });
  const changes = diffMenuDocs(before, after);
  assert.ok(changes.some((c) => c.kind === "removed" && c.path === "Appetizers"));
});

test("diffMenuDocs: group description change", () => {
  const before = makeDoc({ groups: [makeGroup("Starters", [], "Old desc")] });
  const after = makeDoc({ groups: [makeGroup("Starters", [], "New desc")] });
  const changes = diffMenuDocs(before, after);
  assert.ok(changes.some((c) => c.path === "Starters / Description"));
});

test("diffMenuDocs: added section", () => {
  const before = makeDoc({ groups: [makeGroup("Mains", [])] });
  const after = makeDoc({ groups: [makeGroup("Mains", [makeSection("Pasta")])] });
  const changes = diffMenuDocs(before, after);
  assert.ok(changes.some((c) => c.kind === "added" && c.path.includes("Pasta")));
});

test("diffMenuDocs: removed section", () => {
  const before = makeDoc({ groups: [makeGroup("Mains", [makeSection("Pasta")])] });
  const after = makeDoc({ groups: [makeGroup("Mains", [])] });
  const changes = diffMenuDocs(before, after);
  assert.ok(changes.some((c) => c.kind === "removed" && c.path.includes("Pasta")));
});

test("diffMenuDocs: section title change", () => {
  const before = makeDoc({ groups: [makeGroup("Mains", [makeSection("Pasta")])] });
  const after = makeDoc({ groups: [makeGroup("Mains", [makeSection("Noodles")])] });
  const changes = diffMenuDocs(before, after);
  assert.ok(
    changes.some((c) => c.path.includes("Title") && c.before === "Pasta" && c.after === "Noodles"),
  );
});

test("diffMenuDocs: added item", () => {
  const before = makeDoc({ groups: [makeGroup("Mains", [makeSection("Pasta", [])])] });
  const after = makeDoc({
    groups: [makeGroup("Mains", [makeSection("Pasta", [makeItem("Linguine")])])],
  });
  const changes = diffMenuDocs(before, after);
  assert.ok(changes.some((c) => c.kind === "added" && c.path.includes("Linguine")));
});

test("diffMenuDocs: removed item", () => {
  const before = makeDoc({
    groups: [makeGroup("Mains", [makeSection("Pasta", [makeItem("Linguine")])])],
  });
  const after = makeDoc({ groups: [makeGroup("Mains", [makeSection("Pasta", [])])] });
  const changes = diffMenuDocs(before, after);
  assert.ok(changes.some((c) => c.kind === "removed" && c.path.includes("Linguine")));
});

test("diffMenuDocs: item price_min change", () => {
  const section = (priceMin: number) =>
    makeSection("Entrees", [makeItem("Salmon", priceMin, 60)]);
  const before = makeDoc({ groups: [makeGroup("Mains", [section(40)])] });
  const after = makeDoc({ groups: [makeGroup("Mains", [section(45)])] });
  const changes = diffMenuDocs(before, after);
  assert.ok(
    changes.some(
      (c) => c.path.endsWith("/ Min Price") && c.before === "40" && c.after === "45",
    ),
  );
});

test("diffMenuDocs: item price_max change", () => {
  const section = (priceMax: number) =>
    makeSection("Entrees", [makeItem("Salmon", 40, priceMax)]);
  const before = makeDoc({ groups: [makeGroup("Mains", [section(60)])] });
  const after = makeDoc({ groups: [makeGroup("Mains", [section(70)])] });
  const changes = diffMenuDocs(before, after);
  assert.ok(
    changes.some(
      (c) => c.path.endsWith("/ Max Price") && c.before === "60" && c.after === "70",
    ),
  );
});

test("diffMenuDocs: item price_per change", () => {
  const makeItemWithPer = (per: string) => ({ ...makeItem("Steak"), price_per: per });
  const section = (per: string) =>
    makeSection("Entrees", [makeItemWithPer(per)]);
  const before = makeDoc({ groups: [makeGroup("Mains", [section("per person")])] });
  const after = makeDoc({ groups: [makeGroup("Mains", [section("per table")])] });
  const changes = diffMenuDocs(before, after);
  assert.ok(changes.some((c) => c.path.endsWith("/ Price Per")));
});

test("diffMenuDocs: no false positives on equal nested structures", () => {
  const group = makeGroup("Mains", [makeSection("Pasta", [makeItem("Linguine", 30, 50)])]);
  const doc = makeDoc({ groups: [group] });
  assert.equal(diffMenuDocs(doc, doc).length, 0);
});
