import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // Clear preview data by redirecting to the same URL without preview params
  const url = new URL(request.url);
  url.searchParams.delete("token");
  url.searchParams.delete("documentId");

  return Response.redirect(url.toString());
}
