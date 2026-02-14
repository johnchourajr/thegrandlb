import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Prismic webhook handler: call when content is published/unpublished
 * so the Next.js cache is cleared and new content is served.
 *
 * In Prismic: Settings > Webhooks > Add a webhook
 * URL: https://your-domain.com/api/revalidate
 * Triggers: "A page is published", "A page is unpublished"
 */
export async function POST() {
  revalidateTag("prismic");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
