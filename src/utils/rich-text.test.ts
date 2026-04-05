import assert from "node:assert/strict";
import test from "node:test";
import { toText, toHtml } from "./rich-text";

// ─── toText ──────────────────────────────────────────────────────────────────

test("toText: returns empty string for falsy inputs", () => {
  assert.equal(toText(null), "");
  assert.equal(toText(undefined), "");
  assert.equal(toText(""), "");
  assert.equal(toText(0), "");
});

test("toText: passes strings through", () => {
  assert.equal(toText("Hello World"), "Hello World");
  assert.equal(toText("400"), "400");
});

test("toText: converts numbers to strings", () => {
  assert.equal(toText(4), "4");
  assert.equal(toText(400), "400");
  assert.equal(toText(3.14), "3.14");
});

test("toText: extracts text from RtBlock array", () => {
  const field = [
    { type: "paragraph", text: "Hello world", spans: [] },
  ];
  assert.equal(toText(field), "Hello world");
});

test("toText: joins multiple blocks with a space", () => {
  const field = [
    { type: "paragraph", text: "First block", spans: [] },
    { type: "paragraph", text: "Second block", spans: [] },
  ];
  assert.equal(toText(field), "First block Second block");
});

test("toText: trims leading and trailing whitespace from joined result", () => {
  const field = [
    { type: "paragraph", text: "  trimmed  ", spans: [] },
  ];
  assert.equal(toText(field), "trimmed");
});

test("toText: skips blocks with no text field", () => {
  const field = [
    { type: "image", url: "https://example.com/img.jpg", spans: [] },
    { type: "paragraph", text: "Only this", spans: [] },
  ];
  assert.equal(toText(field), "Only this");
});

test("toText: skips non-object array elements safely", () => {
  const field = [4, null, undefined, { type: "paragraph", text: "Safe", spans: [] }];
  assert.equal(toText(field), "Safe");
  assert.doesNotThrow(() => toText([4]));
  assert.doesNotThrow(() => toText([null]));
});

test("toText: handles text field that is not a string", () => {
  const field = [{ type: "paragraph", text: 42, spans: [] }];
  assert.equal(toText(field), "");
});

test("toText: returns empty string for non-array objects", () => {
  assert.equal(toText({ text: "not an array" }), "");
});

// ─── toHtml ──────────────────────────────────────────────────────────────────

test("toHtml: returns empty string for falsy inputs", () => {
  assert.equal(toHtml(null), "");
  assert.equal(toHtml(undefined), "");
  assert.equal(toHtml(""), "");
});

test("toHtml: passes plain strings through", () => {
  assert.equal(toHtml("plain text"), "plain text");
});

test("toHtml: wraps paragraph in <p>", () => {
  const field = [{ type: "paragraph", text: "Hello", spans: [] }];
  assert.equal(toHtml(field), "<p>Hello</p>");
});

test("toHtml: wraps headings in correct tags", () => {
  for (const level of [1, 2, 3, 4, 5, 6] as const) {
    const field = [{ type: `heading${level}`, text: "Title", spans: [] }];
    assert.equal(toHtml(field), `<h${level}>Title</h${level}>`);
  }
});

test("toHtml: wraps list-item in <li>", () => {
  const field = [{ type: "list-item", text: "Item", spans: [] }];
  assert.equal(toHtml(field), "<li>Item</li>");
});

test("toHtml: wraps o-list-item in <li>", () => {
  const field = [{ type: "o-list-item", text: "Item", spans: [] }];
  assert.equal(toHtml(field), "<li>Item</li>");
});

test("toHtml: wraps preformatted in <pre>", () => {
  const field = [{ type: "preformatted", text: "code", spans: [] }];
  assert.equal(toHtml(field), "<pre>code</pre>");
});

test("toHtml: escapes HTML entities in text", () => {
  const field = [{ type: "paragraph", text: '<script>alert("xss")</script>', spans: [] }];
  const result = toHtml(field);
  assert.ok(!result.includes("<script>"), "should not contain unescaped <script>");
  assert.ok(result.includes("&lt;script&gt;"), "should contain escaped entities");
});

test("toHtml: joins multiple blocks with newlines", () => {
  const field = [
    { type: "paragraph", text: "First", spans: [] },
    { type: "paragraph", text: "Second", spans: [] },
  ];
  assert.equal(toHtml(field), "<p>First</p>\n<p>Second</p>");
});

test("toHtml: falls back to plain text for unknown block types", () => {
  const field = [{ type: "unknown_type", text: "fallback", spans: [] }];
  assert.equal(toHtml(field), "fallback");
});
