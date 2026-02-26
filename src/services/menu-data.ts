import type { MenuCollectionDocument } from "@/types/menu";
import * as prismic from "@prismicio/client";

const endpoint = prismic.getRepositoryEndpoint("grandmenus");
const accessToken = process.env.NEXT_PRISMIC_MENUS_TOKEN;

export const menuClient = prismic.createClient(endpoint, {
  accessToken,
  fetchOptions: {
    next: { tags: ["prismic"] },
    cache: "force-cache",
  },
});

export async function fetchMenuCollection(
  menuApiUid: string
): Promise<MenuCollectionDocument> {
  try {
    // Use type assertion since menu_collection is from external Prismic repo
    const menuData = await menuClient.getByUID(
      "menu_collection" as any,
      menuApiUid,
      {
        fetchLinks: [
          "menu.page_title",
          "menu.page_description",
          "menu.page_disclaimer",
          "menu.group",
          "menu.body",
        ],
      }
    );

    return menuData as unknown as MenuCollectionDocument;
  } catch (error) {
    console.error(`Error fetching menu collection ${menuApiUid}:`, error);
    throw error;
  }
}
