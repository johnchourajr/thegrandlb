import assert from "node:assert/strict";
import test from "node:test";
import { getSessionId, SESSION_QUERY_PARAM } from "./session";

const THIRTY_MINUTES = 30 * 60 * 1000;

type FakeWindow = { localStorage: Storage };

function fakeStorage(options: { throws?: boolean } = {}): Storage {
  const map = new Map<string, string>();
  const guard = () => {
    if (options.throws) throw new Error("storage unavailable");
  };
  return {
    getItem: (key: string) => {
      guard();
      return map.get(key) ?? null;
    },
    setItem: (key: string, value: string) => {
      guard();
      map.set(key, value);
    },
    removeItem: (key: string) => {
      guard();
      map.delete(key);
    },
    clear: () => {
      guard();
      map.clear();
    },
    key: () => null,
    length: 0,
  } as Storage;
}

/** Installs a browser-ish global and a frozen clock, and restores both after. */
function withBrowser(
  run: (ctx: { advance: (ms: number) => void }) => void,
  options: { throws?: boolean } = {},
) {
  const realWindow = (globalThis as { window?: FakeWindow }).window;
  const realNow = Date.now;
  let now = 1_700_000_000_000;

  (globalThis as { window?: FakeWindow }).window = {
    localStorage: fakeStorage(options),
  };
  Date.now = () => now;

  try {
    run({
      advance: (ms: number) => {
        now += ms;
      },
    });
  } finally {
    Date.now = realNow;
    if (realWindow === undefined) {
      delete (globalThis as { window?: FakeWindow }).window;
    } else {
      (globalThis as { window?: FakeWindow }).window = realWindow;
    }
  }
}

test("getSessionId returns null on the server", () => {
  assert.equal(typeof globalThis.window, "undefined");
  assert.equal(getSessionId(), null);
});

test("getSessionId is stable across calls inside the idle window", () => {
  withBrowser(({ advance }) => {
    const first = getSessionId();
    assert.ok(first);

    advance(THIRTY_MINUTES - 1000);
    assert.equal(getSessionId(), first, "same session before the timeout");
  });
});

test("activity extends the session rather than expiring it on a fixed clock", () => {
  withBrowser(({ advance }) => {
    const first = getSessionId();

    // Three touches 20 minutes apart: over an hour of elapsed time, but never
    // 30 idle minutes, so it stays one session.
    for (let i = 0; i < 3; i++) {
      advance(20 * 60 * 1000);
      assert.equal(getSessionId(), first);
    }
  });
});

test("getSessionId mints a new session after 30 idle minutes", () => {
  withBrowser(({ advance }) => {
    const first = getSessionId();

    advance(THIRTY_MINUTES + 1000);
    const second = getSessionId();

    assert.ok(second);
    assert.notEqual(second, first, "idle gap should start a new session");
  });
});

test("getSessionId stays stable when localStorage throws", () => {
  withBrowser(
    ({ advance }) => {
      const first = getSessionId();
      assert.ok(first, "should still produce an id without storage");

      advance(1000);
      assert.equal(
        getSessionId(),
        first,
        "in-memory fallback should hold the id for the document",
      );
    },
    { throws: true },
  );
});

test("the pageview query parameter name is pinned", () => {
  // This is a wire format, not an implementation detail: it is written into
  // analytics_events.raw on every pageview. Renaming it silently orphans every
  // row recorded under the old name, so changing it is a deliberate act.
  assert.equal(SESSION_QUERY_PARAM, "_sid");
});
