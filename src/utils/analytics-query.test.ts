import assert from "node:assert/strict";
import test from "node:test";
import { parseUtm, queryOf, sessionUid } from "./analytics-query";

// Verbatim from analytics_events.raw in production.
const REAL_PAGEVIEW_QUERY_PARAMS = '{"_sid":"s_9f2d615bef38d5e2"}';

test("the JSON object Vercel actually sends is readable", () => {
  const params = queryOf(REAL_PAGEVIEW_QUERY_PARAMS);
  assert.equal(params?.get("_sid"), "s_9f2d615bef38d5e2");
});

test("the old assumption silently produced one nonsense key", () => {
  // Not a hypothetical: `new URLSearchParams` does not throw on JSON, it just
  // makes the whole string a key. That is why the failure went unnoticed.
  const naive = new URLSearchParams(REAL_PAGEVIEW_QUERY_PARAMS);
  assert.equal(naive.get("_sid"), null);
  assert.equal([...naive.keys()].length, 1);
});

test("a pageview's session id is recovered", () => {
  assert.equal(
    sessionUid({ queryParams: REAL_PAGEVIEW_QUERY_PARAMS }),
    "s_9f2d615bef38d5e2",
  );
});

test("a custom event prefers its own property bag", () => {
  const uid = sessionUid({
    eventData: '{"session_id":"s_fromevent","step":2}',
    queryParams: '{"_sid":"s_fromquery"}',
  });
  assert.equal(uid, "s_fromevent", "the event's own id wins");
});

test("utm parameters are extracted", () => {
  const utm = parseUtm(
    '{"utm_source":"newsletter","utm_medium":"email","utm_campaign":"fall-2026"}',
  );
  assert.equal(utm.utm_source, "newsletter");
  assert.equal(utm.utm_medium, "email");
  assert.equal(utm.utm_campaign, "fall-2026");
  assert.equal(utm.utm_term, null);
});

test("utm and the session id coexist", () => {
  const q = '{"_sid":"s_abc","utm_source":"instagram","utm_campaign":"weddings"}';
  assert.equal(sessionUid({ queryParams: q }), "s_abc");
  assert.equal(parseUtm(q).utm_source, "instagram");
});

test("a genuine query string still works", () => {
  // Kept as a supported shape in case the drain payload changes back.
  assert.equal(queryOf("?_sid=s_xyz&utm_source=x")?.get("_sid"), "s_xyz");
  assert.equal(queryOf("_sid=s_xyz")?.get("_sid"), "s_xyz");
  assert.equal(parseUtm("utm_campaign=spring").utm_campaign, "spring");
});

test("an already-parsed object works", () => {
  assert.equal(queryOf({ _sid: "s_obj" })?.get("_sid"), "s_obj");
});

test("non-string values are coerced, not dropped", () => {
  assert.equal(queryOf('{"page":2}')?.get("page"), "2");
});

test("absent or malformed input yields nulls, never a throw", () => {
  for (const bad of [null, undefined, "", "   ", "{not json", [], 0]) {
    const utm = parseUtm(bad);
    assert.equal(utm.utm_source, null, `${JSON.stringify(bad)}`);
    assert.doesNotThrow(() => sessionUid({ queryParams: bad }));
  }
});

test("an event with nothing to offer yields null", () => {
  assert.equal(sessionUid({}), null);
  assert.equal(sessionUid({ eventData: "{}" }), null);
  assert.equal(sessionUid({ eventData: "[]", queryParams: null }), null);
});
