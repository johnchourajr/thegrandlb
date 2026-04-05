import { NextResponse } from "next/server";

/** Prismic preview removed — stub redirects home. */
export function GET() {
  return NextResponse.redirect("/");
}
