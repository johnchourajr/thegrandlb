import CtaFooter from "@/components/CtaFooter";
import Layout from "@/components/Layout";
import { MenuPageContent } from "@/components/MenuPageContent";
import { getExtra } from "@/services/get-extra";
import { fetchMenuCollection } from "@/services/menu-data";
import type { MenuPageDocumentWithGroup } from "@/types/menu";

export const revalidate = 3600;

export default async function WeddingsMenuPage() {
  try {
    const extra = await getExtra({});
    const { cta, settings, navigation } = extra;

    const page = { uid: "weddings", type: "menu_page" as const, data: { menu_api_uid: "weddings" } };

    let menuSource: MenuPageDocumentWithGroup;
    try {
      menuSource = await fetchMenuCollection("weddings");
    } catch (menuError) {
      console.error("Error fetching weddings menu data:", menuError);
      menuSource = page;
    }

    return (
      <Layout page={page} settings={settings} navigation={navigation}>
        <MenuPageContent page={menuSource} />
        <CtaFooter data={cta} />
      </Layout>
    );
  } catch (error) {
    console.error("Error loading weddings menu page:", error);
    throw error;
  }
}

export async function generateMetadata() {
  return {
    title: "Wedding Catering Menu | Reception Dining at The Grand LB",
    description:
      "Wedding catering menu at The Grand Long Beach. Plated dinners, buffet service, and action stations for receptions of up to 675 guests. In-house kitchen in Long Beach, CA.",
  };
}
