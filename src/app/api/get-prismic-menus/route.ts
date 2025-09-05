import * as prismic from "@prismicio/client";
import type { NextRequest } from "next/server";

const endpoint = prismic.getRepositoryEndpoint("grandmenus");
const accessToken = process.env.NEXT_PRISMIC_MENUS_TOKEN; // Set an access token

export const getPrismicMenus = prismic.createClient(endpoint, { accessToken });

export async function GET(request: NextRequest) {
  try {
    // Add your logic here to fetch and return menu data
    return Response.json({ message: "Prismic menus endpoint" });
  } catch (error) {
    console.error("Error fetching menus:", error);
    return Response.json({ error: "Failed to fetch menus" }, { status: 500 });
  }
}
