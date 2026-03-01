import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // Add basic security - require a debug parameter
  const url = new URL(request.url);
  const debugKey = url.searchParams.get("debug");

  if (debugKey !== "env-check") {
    return new Response(JSON.stringify({ error: "Access denied" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  const publicEnv = Object.fromEntries(
    Object.entries(process.env)
      .filter(
        ([key, value]) => key.startsWith("NEXT_PUBLIC_") && value !== undefined,
      )
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB)),
  );

  const envStatus = {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL_EXISTS: !!process.env.NEXT_DATABASE_URL,
    DATABASE_URL_PREFIX:
      process.env.NEXT_DATABASE_URL?.substring(0, 20) || "MISSING",
    RESEND_API_KEY_EXISTS: !!process.env.NEXT_RESEND_API_KEY,
    PUBLIC_ENV_KEYS: Object.keys(publicEnv),
    PUBLIC_ENV: publicEnv,
  };

  return new Response(JSON.stringify(envStatus, null, 2), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
