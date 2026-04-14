import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

// ─── Rate limiting ─────────────────────────────────────────────────────────────
// In-memory per-IP tracking. Resets on cold start; good enough for a small
// admin tool — prevents brute-force scripts running against a warm instance.

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

type Attempt = { count: number; windowStart: number };
const attempts = new Map<string, Attempt>();

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) return false;
  return entry.count >= MAX_ATTEMPTS;
}

function recordFailure(ip: string): void {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    attempts.set(ip, { count: 1, windowStart: now });
  } else {
    entry.count += 1;
  }
}

function clearFailures(ip: string): void {
  attempts.delete(ip);
}

// ─── User parsing ──────────────────────────────────────────────────────────────

function parseAdminUsers(): Map<string, string> {
  const raw = process.env.ADMIN_USERS ?? "";
  const users = new Map<string, string>();
  for (const pair of raw.split(",")) {
    const colon = pair.indexOf(":");
    if (colon > 0) {
      const email = pair.slice(0, colon).trim().toLowerCase();
      const key = pair.slice(colon + 1).trim();
      if (email && key) users.set(email, key);
    }
  }
  return users;
}

// ─── Route ────────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return new Response(
      JSON.stringify({ error: "Too many attempts. Try again in 15 minutes." }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await request.json();
    const { email, key } = body;

    if (!email || !key) {
      return new Response(
        JSON.stringify({ error: "Email and key are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const users = parseAdminUsers();
    if (users.size === 0) {
      return new Response(
        JSON.stringify({ error: "Server configuration error." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const expectedKey = users.get(normalizedEmail);
    if (!expectedKey || expectedKey !== key) {
      recordFailure(ip);
      return new Response(
        JSON.stringify({ error: "Invalid credentials." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    clearFailures(ip);

    const cookieStore = await cookies();
    cookieStore.set("admin_session", normalizedEmail, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(
      JSON.stringify({ error: "Bad request." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}
