import CtaFooter from "@/components/CtaFooter";
import Layout from "@/components/Layout";
import { MenuPageContent } from "@/components/MenuPageContent";
import { getExtra } from "@/services/get-extra";
import milestonesMenu from "content/menus/milestones.menu";

export const revalidate = false;

export default async function MilestonesMenuPage() {
  const extra = await getExtra({});
  const { cta, settings, navigation } = extra;
  const page = { uid: milestonesMenu.uid, data: {} };

  return (
    <Layout page={page} settings={settings} navigation={navigation}>
      <MenuPageContent menu={milestonesMenu} />
      <CtaFooter data={cta} />
    </Layout>
  );
}

export async function generateMetadata() {
  return {
    title: "Milestones Menu",
    description:
      "Catering for milestone celebrations: quinceaneras, bar mitzvahs and anniversaries at The Grand LB.",
  };
}
