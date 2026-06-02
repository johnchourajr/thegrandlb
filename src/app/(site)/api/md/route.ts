import { buildPageMarkdown } from "@/lib/agent/page-markdown";
import type { NextRequest } from "next/server";
import { track } from "@vercel/analytics/server";

/**
 * Markdown-for-agents endpoint. `proxy.ts` rewrites page requests that carry
 * `Accept: text/markdown` to `/api/md?path=<original path>`; this handler
 * returns a Markdown rendering of that page.
 */
export async function GET(request: NextRequest) {
  // `x-md-path` is set by proxy.ts on the rewrite; the `path` query param is a
  // fallback for direct requests (e.g. testing /api/md?path=/menus/classic).
  const path =
    request.headers.get("x-md-path") ??
    request.nextUrl.searchParams.get("path") ??
    "/";
  await track("agent.markdown.request", { path });
  const markdown = await buildPageMarkdown(path);

  if (markdown == null) {
    return new Response("Not Found", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  // Rough token estimate (~4 chars/token) for clients that surface it.
  const approxTokens = Math.ceil(markdown.length / 4);

  return new Response(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": String(approxTokens),
      Vary: "Accept",
    },
  });
}
