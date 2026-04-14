import CtaFooter from "@/components/CtaFooter";
import Layout from "@/components/Layout";
import { MenuPageContent } from "@/components/MenuPageContent";
import { getExtra } from "@/services/get-extra";
import { fetchMenuCollection } from "@/services/menu-data";
import type { MenuPageDocumentWithGroup } from "@/types/menu";

export const revalidate = 3600;

export default async function MilestonesMenuPage() {
  try {
    const extra = await getExtra({});
    const { cta, settings, navigation } = extra;

    const page = { uid: "milestones", type: "menu_page" as const, data: { menu_api_uid: "milestones" } };

    let menuSource: MenuPageDocumentWithGroup;
    try {
      menuSource = await fetchMenuCollection("milestones");
    } catch (menuError) {
      console.error("Error fetching milestones menu data:", menuError);
      menuSource = page;
    }

    return (
      <Layout page={page} settings={settings} navigation={navigation}>
        <MenuPageContent page={menuSource} />
        <CtaFooter data={cta} />
      </Layout>
    );
  } catch (error) {
    console.error("Error loading milestones menu page:", error);
    throw error;
  }
}

export async function generateMetadata() {
  return {
    title: "Milestone Celebration Catering Menu | Quinceañeras, Birthdays & More",
    description:
      "Catering menu for milestone celebrations at The Grand Long Beach. Customizable menus for quinceañeras, birthdays, anniversaries, and more. In-house kitchen in Long Beach, CA.",
  };
}
