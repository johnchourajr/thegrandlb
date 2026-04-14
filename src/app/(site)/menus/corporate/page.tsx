import CtaFooter from "@/components/CtaFooter";
import Layout from "@/components/Layout";
import { MenuPageContent } from "@/components/MenuPageContent";
import { getExtra } from "@/services/get-extra";
import { fetchMenuCollection } from "@/services/menu-data";
import type { MenuPageDocumentWithGroup } from "@/types/menu";

export const revalidate = 3600;

export default async function CorporateMenuPage() {
  try {
    const extra = await getExtra({});
    const { cta, settings, navigation } = extra;

    const page = { uid: "corporate", type: "menu_page" as const, data: { menu_api_uid: "corporate" } };

    let menuSource: MenuPageDocumentWithGroup;
    try {
      menuSource = await fetchMenuCollection("corporate");
    } catch (menuError) {
      console.error("Error fetching corporate menu data:", menuError);
      menuSource = page;
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
    title: "Corporate Event Catering Menu | Meetings & Conferences at The Grand LB",
    description:
      "Corporate catering menu at The Grand Long Beach. Lunch, dinner, and break service for meetings, conferences, galas, and team events. In-house kitchen in Long Beach, CA.",
  };
}
