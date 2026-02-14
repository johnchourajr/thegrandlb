import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Redirect /preview to /api/preview so Prismic preview works when the
 * preview URL is set to /preview instead of /api/preview in Prismic settings.
 */
export async function GET(request: NextRequest) {
  const url = new URL("/api/preview", request.url);
  request.nextUrl.searchParams.forEach((value, key) => {
    url.searchParams.set(key, value);
  });
  return NextResponse.redirect(url);
}
