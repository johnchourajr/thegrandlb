import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

// Parse ADMIN_USERS="email:key,email2:key2" into a Map
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

export async function POST(request: NextRequest) {
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
      return new Response(
        JSON.stringify({ error: "Invalid credentials." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

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
