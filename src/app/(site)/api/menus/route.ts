import { SITE_ORIGIN, venueInfo } from "@/lib/agent/site-info";
import { NextResponse } from "next/server";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

const MENU_TITLES: Record<string, string> = {
  classic: "Classic",
  weddings: "Weddings",
  corporate: "Corporate",
  milestones: "Milestones",
};

/**
 * Public, read-only catalog of catering menus. The full menu content for a
 * given UID is available at `/api/menus/{uid}`.
 */
export async function GET() {
  const menus = venueInfo.catering.menuUids.map((uid) => ({
    uid,
    title: MENU_TITLES[uid] ?? uid,
    url: `${SITE_ORIGIN}/menus/${uid}`,
    json: `${SITE_ORIGIN}/api/menus/${uid}`,
    markdown: `${SITE_ORIGIN}/menus/${uid}`,
  }));

  return NextResponse.json(
    { venue: venueInfo.legalName, count: menus.length, menus },
    { headers: CORS },
  );
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}
