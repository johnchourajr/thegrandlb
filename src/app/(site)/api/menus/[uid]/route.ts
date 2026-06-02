import { fetchMenuCollection } from "@/services/menu-data";
import { venueInfo } from "@/lib/agent/site-info";
import { NextResponse } from "next/server";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

const VALID_UIDS = venueInfo.catering.menuUids as readonly string[];

/**
 * Public, read-only full content for a single catering menu (shared groups
 * merged in). Mirrors the data rendered on `/menus/{uid}`.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ uid: string }> },
) {
  const { uid } = await params;

  if (!VALID_UIDS.includes(uid)) {
    return NextResponse.json(
      { error: "Menu not found", validUids: VALID_UIDS },
      { status: 404, headers: CORS },
    );
  }

  try {
    const doc = await fetchMenuCollection(uid);
    return NextResponse.json(doc.data, { headers: CORS });
  } catch {
    return NextResponse.json(
      { error: "Menu not found", validUids: VALID_UIDS },
      { status: 404, headers: CORS },
    );
  }
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}
