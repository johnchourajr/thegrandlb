import CtaFooter from "@/components/CtaFooter";
import Layout from "@/components/Layout";
import { MenuPageContent } from "@/components/MenuPageContent";
import { getExtra } from "@/services/get-extra";
import { fetchMenuCollection } from "@/services/menu-data";
import type { MenuPageDocumentWithGroup } from "@/types/menu";
import fetchLinks from "@/utils/fetchLinks";
import { createClient } from "@/prismicio";

/**
 * Types
 */

export const revalidate = 3600;

export default async function CorporateMenuPage() {
  try {
    const client = createClient();
    const extra = await getExtra({});

    const [page] = await Promise.all([
      client.getByUID("menu_page", "corporate", {
        fetchLinks,
      }),
    ]);

    if (!page) {
      throw new Error("Corporate menu page not found");
    }

    const { cta, settings, navigation } = extra;

    // Fetch menu data from external Prismic repo
    let menuSource: MenuPageDocumentWithGroup;

    if (page.data.menu_api_uid) {
      try {
        menuSource = await fetchMenuCollection(page.data.menu_api_uid);
      } catch (menuError) {
        console.error("Error fetching corporate menu data:", menuError);
        // Fallback to page data if external fetch fails
        menuSource = page as MenuPageDocumentWithGroup;
      }
    } else {
      menuSource = page as MenuPageDocumentWithGroup;
    }

    return (
      <Layout page={page} settings={settings} navigation={navigation}>
        <MenuPageContent page={menuSource} />
        <CtaFooter data={cta} />
      </Layout>
    );
  } catch (error) {
    console.error("Error loading corporate menu page:", error);
    throw error;
  }
}

export async function generateMetadata() {
  return {
    title: "Corporate Menu",
    description:
      "Corporate event catering and lunch or dinner menus for meetings and galas at The Grand LB.",
  };
}
