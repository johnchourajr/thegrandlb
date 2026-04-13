/**
 * HTTP integration tests for the admin menu API.
 *
 * Verifies that every protected endpoint correctly enforces authentication
 * and rejects malformed inputs — without relying on real GitHub / Vercel
 * credentials. Run against a live Next.js server.
 *
 * Required env:
 *   TEST_BASE_URL       Base URL of the running server (default: http://localhost:3000)
 *   CI_ADMIN_EMAIL      Email configured in ADMIN_USERS on the test server
 *   CI_ADMIN_KEY        Matching secret key configured in ADMIN_USERS on the test server
 */

const BASE = process.env.TEST_BASE_URL ?? "http://localhost:3000";
const CI_EMAIL = process.env.CI_ADMIN_EMAIL ?? "ci@thegrandlb.com";
const CI_KEY = process.env.CI_ADMIN_KEY ?? "ci-secret-key-for-testing";

let passed = 0;
let failed = 0;

async function expect(
  label: string,
  fn: () => Promise<void>,
): Promise<void> {
  try {
    await fn();
    console.log(`  ✓  ${label}`);
    passed++;
  } catch (err) {
    console.error(`  ✗  ${label}`);
    console.error(`     ${(err as Error).message}`);
    failed++;
  }
}

function assertStatus(res: Response, expected: number) {
  if (res.status !== expected) {
    throw new Error(`Expected HTTP ${expected}, got ${res.status}`);
  }
}

// ─── Auth helpers ─────────────────────────────────────────────────────────────

async function loginAndGetCookie(): Promise<string> {
  const res = await fetch(`${BASE}/api/admin/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    redirect: "manual",
    body: JSON.stringify({ email: CI_EMAIL, key: CI_KEY }),
  });
  if (res.status !== 200) {
    throw new Error(
      `Login failed with status ${res.status}. ` +
        "Ensure ADMIN_USERS env var on the test server contains CI_ADMIN_EMAIL:CI_ADMIN_KEY.",
    );
  }
  const setCookie = res.headers.get("set-cookie") ?? "";
  const match = setCookie.match(/admin_session=([^;]+)/);
  if (!match) throw new Error("Login succeeded but no admin_session cookie was set.");
  return `admin_session=${match[1]}`;
}

// ─── Test suites ──────────────────────────────────────────────────────────────

console.log("\nAdmin menu API — auth & validation tests");
console.log(`  Server: ${BASE}\n`);

// ── Unauthenticated requests ──────────────────────────────────────────────────

console.log("Unauthenticated requests:");

await expect("GET /api/admin/menus/classic → 401 without cookie", async () => {
  const res = await fetch(`${BASE}/api/admin/menus/classic`);
  assertStatus(res, 401);
});

await expect("PUT /api/admin/menus/classic → 401 without cookie", async () => {
  const res = await fetch(`${BASE}/api/admin/menus/classic`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  assertStatus(res, 401);
});

await expect("GET /api/admin/menus/classic/history → 401 without cookie", async () => {
  const res = await fetch(`${BASE}/api/admin/menus/classic/history`);
  assertStatus(res, 401);
});

await expect("GET /api/admin/menus/corporate → 401 without cookie", async () => {
  const res = await fetch(`${BASE}/api/admin/menus/corporate`);
  assertStatus(res, 401);
});

// ── Bad credentials ───────────────────────────────────────────────────────────

console.log("\nBad credentials:");

await expect("POST /api/admin/auth with wrong key → 401", async () => {
  const res = await fetch(`${BASE}/api/admin/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: CI_EMAIL, key: "wrong-key" }),
  });
  assertStatus(res, 401);
});

await expect("POST /api/admin/auth with unknown email → 401", async () => {
  const res = await fetch(`${BASE}/api/admin/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "attacker@evil.com", key: CI_KEY }),
  });
  assertStatus(res, 401);
});

await expect("POST /api/admin/auth with empty body → 401", async () => {
  const res = await fetch(`${BASE}/api/admin/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  assertStatus(res, 401);
});

await expect("GET /api/admin/menus/classic with fake cookie → 401", async () => {
  const res = await fetch(`${BASE}/api/admin/menus/classic`, {
    headers: { Cookie: "admin_session=attacker@evil.com" },
  });
  assertStatus(res, 401);
});

// ── Valid auth ────────────────────────────────────────────────────────────────

console.log("\nValid auth:");

const cookie = await loginAndGetCookie().catch((err) => {
  console.error(`  ✗  Login setup failed: ${err.message}`);
  console.error("     Skipping authenticated test cases.");
  failed++;
  return null;
});

if (cookie) {
  await expect("POST /api/admin/auth with correct credentials → 200", async () => {
    // Already verified above — loginAndGetCookie() threw if it wasn't 200
    passed++;
  });

  await expect("GET /api/admin/menus/classic with valid cookie → 200", async () => {
    const res = await fetch(`${BASE}/api/admin/menus/classic`, {
      headers: { Cookie: cookie },
    });
    assertStatus(res, 200);
    const data = await res.json();
    if (!data.uid) throw new Error("Response missing uid field");
  });

  await expect("GET /api/admin/menus/corporate with valid cookie → 200", async () => {
    const res = await fetch(`${BASE}/api/admin/menus/corporate`, {
      headers: { Cookie: cookie },
    });
    assertStatus(res, 200);
  });

  // ── Invalid UIDs ────────────────────────────────────────────────────────────

  console.log("\nInvalid UIDs (authenticated):");

  await expect("GET /api/admin/menus/doesnotexist → 404", async () => {
    const res = await fetch(`${BASE}/api/admin/menus/doesnotexist`, {
      headers: { Cookie: cookie },
    });
    assertStatus(res, 404);
  });

  await expect("GET /api/admin/menus/../../../etc/passwd → 404 (path traversal blocked)", async () => {
    const res = await fetch(
      `${BASE}/api/admin/menus/${encodeURIComponent("../../../etc/passwd")}`,
      { headers: { Cookie: cookie } },
    );
    assertStatus(res, 404);
  });

  await expect("GET /api/admin/menus/doesnotexist/history → 404", async () => {
    const res = await fetch(`${BASE}/api/admin/menus/doesnotexist/history`, {
      headers: { Cookie: cookie },
    });
    assertStatus(res, 404);
  });

  // ── Logout ──────────────────────────────────────────────────────────────────

  console.log("\nLogout:");

  await expect("POST /api/admin/logout → 200 and clears admin_session cookie", async () => {
    const res = await fetch(`${BASE}/api/admin/logout`, {
      method: "POST",
      headers: { Cookie: cookie },
    });
    assertStatus(res, 200);
    // Server must issue a clearing Set-Cookie header
    const setCookie = res.headers.get("set-cookie") ?? "";
    if (
      !setCookie.includes("admin_session=") ||
      (!setCookie.includes("Max-Age=0") && !setCookie.includes("Expires="))
    ) {
      throw new Error(
        `Expected a clearing Set-Cookie for admin_session, got: ${setCookie}`,
      );
    }
  });
}

// ─── Summary ──────────────────────────────────────────────────────────────────

console.log(`\n${passed + failed} tests: ${passed} passed, ${failed} failed\n`);

if (failed > 0) process.exit(1);
