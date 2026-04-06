import CtaFooter from "@/components/CtaFooter";
import Layout from "@/components/Layout";
import { MenuPageContent } from "@/components/MenuPageContent";
import { getExtra } from "@/services/get-extra";
import classicMenu from "content/menus/classic.menu";

export const revalidate = false;

export default async function ClassicMenuPage() {
  const extra = await getExtra({});
  const { cta, settings, navigation } = extra;
  const page = { uid: classicMenu.uid, data: {} };

  return (
    <Layout page={page} settings={settings} navigation={navigation}>
      <MenuPageContent menu={classicMenu} />
      <CtaFooter data={cta} />
    </Layout>
  );
}

export async function generateMetadata() {
  return {
    title: "Classic Menu",
    description:
      "Classic catering and banquet menu options for events at The Grand LB.",
  };
}
