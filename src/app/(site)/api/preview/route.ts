import { NextResponse } from "next/server";

/** Prismic preview removed — stub returns 404. */
export function GET() {
  return NextResponse.json({ error: "Preview not supported" }, { status: 404 });
}
