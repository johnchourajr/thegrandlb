import CtaFooter from "@/components/CtaFooter";
import Layout from "@/components/Layout";
import { MenuPageContent } from "@/components/MenuPageContent";
import { getExtra } from "@/services/get-extra";
import { fetchMenuCollection } from "@/services/menu-data";
import type { MenuPageDocumentWithGroup } from "@/types/menu";
import { notFound } from "next/navigation";

export const revalidate = 3600;

const VALID_UIDS = ["classic", "corporate", "milestones", "weddings"] as const;
type MenuUid = (typeof VALID_UIDS)[number];

const MENU_METADATA: Record<MenuUid, { title: string; description: string }> = {
  classic: {
    title: "Classic Catering Menu | Event Venue Dining at The Grand LB",
    description:
      "Classic catering menu for events at The Grand Long Beach. Plated dinners, buffet options, and action stations prepared by our in-house kitchen in Long Beach, CA.",
  },
  corporate: {
    title: "Corporate Event Catering Menu | Meetings & Conferences at The Grand LB",
    description:
      "Corporate catering menu at The Grand Long Beach. Lunch, dinner, and break service for meetings, conferences, galas, and team events. In-house kitchen in Long Beach, CA.",
  },
  milestones: {
    title: "Milestone Celebration Catering Menu | Quinceañeras, Birthdays & More",
    description:
      "Catering menu for milestone celebrations at The Grand Long Beach. Customizable menus for quinceañeras, birthdays, anniversaries, and more. In-house kitchen in Long Beach, CA.",
  },
  weddings: {
    title: "Wedding Catering Menu | Reception Dining at The Grand LB",
    description:
      "Wedding catering menu at The Grand Long Beach. Plated dinners, buffet service, and action stations for receptions of up to 675 guests. In-house kitchen in Long Beach, CA.",
  },
};

export async function generateStaticParams() {
  return VALID_UIDS.map((uid) => ({ uid }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;
  const meta = MENU_METADATA[uid as MenuUid];
  if (!meta) return {};
  return { title: meta.title, description: meta.description };
}

export default async function MenuPage({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;

  if (!VALID_UIDS.includes(uid as MenuUid)) {
    notFound();
  }

  const { cta, settings, navigation } = await getExtra({});
  const page = {
    uid,
    type: "menu_page" as const,
    data: { menu_api_uid: uid },
  };

  let menuSource: MenuPageDocumentWithGroup = page;
  try {
    menuSource = await fetchMenuCollection(uid);
  } catch (menuError) {
    console.error(`Error fetching ${uid} menu data:`, menuError);
  }

  return (
    <Layout page={page} settings={settings} navigation={navigation}>
      <MenuPageContent page={menuSource} />
      <CtaFooter data={cta} />
    </Layout>
  );
}
