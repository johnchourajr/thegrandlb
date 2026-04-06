import CtaFooter from "@/components/CtaFooter";
import Layout from "@/components/Layout";
import { MenuPageContent } from "@/components/MenuPageContent";
import { getExtra } from "@/services/get-extra";
import { fetchMenuCollection } from "@/services/menu-data";
import type { MenuPageDocumentWithGroup } from "@/types/menu";

export const revalidate = 3600;

export default async function ClassicMenuPage() {
  try {
    const extra = await getExtra({});
    const { cta, settings, navigation } = extra;

    const page = { uid: "classic", type: "menu_page" as const, data: { menu_api_uid: "classic" } };

    let menuSource: MenuPageDocumentWithGroup;
    try {
      menuSource = await fetchMenuCollection("classic");
    } catch (menuError) {
      console.error("Error fetching classic menu data:", menuError);
      menuSource = page;
    }

    return (
      <Layout page={page} settings={settings} navigation={navigation}>
        <MenuPageContent page={menuSource} />
        <CtaFooter data={cta} />
      </Layout>
    );
  } catch (error) {
    console.error("Error loading classic menu page:", error);
    throw error;
  }
}

export async function generateMetadata() {
  return {
    title: "Classic Menu",
    description:
      "Classic catering and banquet menu options for events at The Grand LB.",
  };
}
