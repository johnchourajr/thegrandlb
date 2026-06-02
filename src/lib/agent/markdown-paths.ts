import { sitePages } from "./site-info";

/**
 * Edge-safe check (no `fs`/Node imports) for whether a site path has a
 * Markdown rendering available. Used by `proxy.ts` to decide whether to
 * content-negotiate `Accept: text/markdown`, and by the `/api/md` handler.
 */
export function isMarkdownSupportedPath(pathname: string): boolean {
  const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  if (path === "" || path === "/" || path === "/faq" || path === "/menus") return true;
  if (/^\/menus\/[a-z0-9-]+$/.test(path)) return true;
  return sitePages.some((p) => p.path === path);
}
