import type { MenuCollectionDocument } from "@/types/menu";

const GRANDMENUS_API = "https://grandmenus.cdn.prismic.io/api/v2";
const ACCESS_TOKEN = process.env.NEXT_PRISMIC_MENUS_TOKEN;

async function getMasterRef(): Promise<string> {
  const url = ACCESS_TOKEN
    ? `${GRANDMENUS_API}?access_token=${ACCESS_TOKEN}`
    : GRANDMENUS_API;
  const res = await fetch(url, { next: { revalidate: 3600 } } as RequestInit);
  if (!res.ok) throw new Error(`Failed to fetch Grandmenus API ref: ${res.status}`);
  const data = await res.json();
  const master = data.refs?.find((r: { isMasterRef?: boolean }) => r.isMasterRef);
  return master?.ref ?? data.refs?.[0]?.ref;
}

const FETCH_LINKS = [
  "menu.page_title",
  "menu.page_description",
  "menu.page_disclaimer",
  "menu.group",
  "menu.body",
].join(",");

export async function fetchMenuCollection(
  menuApiUid: string
): Promise<MenuCollectionDocument> {
  const ref = await getMasterRef();
  const params = new URLSearchParams({
    q: `[[at(my.menu_collection.uid,"${menuApiUid}")]]`,
    ref,
    fetchLinks: FETCH_LINKS,
    lang: "*",
    ...(ACCESS_TOKEN ? { access_token: ACCESS_TOKEN } : {}),
  });

  const res = await fetch(`${GRANDMENUS_API}/documents/search?${params}`, {
    next: { tags: ["menus"], revalidate: 3600 },
    cache: "force-cache",
  } as RequestInit);

  if (!res.ok) throw new Error(`Menu fetch failed: ${res.status}`);
  const data = await res.json();
  if (!data.results?.length) throw new Error(`Menu not found: ${menuApiUid}`);
  return data.results[0] as MenuCollectionDocument;
}
