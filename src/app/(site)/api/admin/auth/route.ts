import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return new Response(
        JSON.stringify({ error: "Server configuration error." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!password || password !== adminPassword) {
      return new Response(
        JSON.stringify({ error: "Invalid password." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set("admin_session", adminPassword, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      // 7-day session
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
