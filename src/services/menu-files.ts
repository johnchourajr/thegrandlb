import type { MenuDoc } from "content/types";

/**
 * Every `content/menus/*.menu.json` document, resolved at build time by
 * Turbopack instead of read from disk at runtime.
 *
 * Menus are only ever written through the admin route, which commits to GitHub
 * and triggers a redeploy — nothing rewrites these files on the running
 * server's disk. So a build-time import has the same semantics as the
 * `fs.readFileSync` it replaces, minus the I/O and the JSON parse, and minus
 * the `outputFileTracingIncludes` entries needed to get the files into the
 * serverless bundle.
 *
 * Two Turbopack details worth knowing, both of which fail silently rather than
 * erroring:
 *   - `base` is load-bearing. A relative pattern that climbs out of this file's
 *     own directory (`../../content/menus/*.menu.json`) matches nothing.
 *   - No `import: "default"`. JSON modules resolve to the parsed object itself,
 *     so asking for a default export yields `undefined` values.
 */
const modules = import.meta.glob("*.menu.json", {
  eager: true,
  base: "../../content/menus",
}) as Record<string, MenuDoc>;

/** "../../content/menus/classic.menu.json" -> "classic" */
function uidFromPath(filePath: string): string {
  return filePath.slice(filePath.lastIndexOf("/") + 1).replace(/\.menu\.json$/, "");
}

const byUid: ReadonlyMap<string, MenuDoc> = new Map(
  Object.entries(modules).map(([filePath, doc]) => [uidFromPath(filePath), doc])
);

/**
 * Read a menu document by uid, or null if there is no such menu.
 *
 * Returns a fresh copy each call. The glob holds one shared module instance,
 * so handing out the original would let any caller's mutation leak into every
 * later read — `readFileSync` + `JSON.parse` always produced a new object, and
 * this preserves that.
 */
export function readMenuDoc(uid: string): MenuDoc | null {
  const doc = byUid.get(uid);
  return doc ? structuredClone(doc) : null;
}
