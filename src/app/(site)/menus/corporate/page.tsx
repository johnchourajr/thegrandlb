import CtaFooter from "@/components/CtaFooter";
import Layout from "@/components/Layout";
import { MenuPageContent } from "@/components/MenuPageContent";
import { getExtra } from "@/services/get-extra";
import corporateMenu from "content/menus/corporate.menu";

export const revalidate = false;

export default async function CorporateMenuPage() {
  const extra = await getExtra({});
  const { cta, settings, navigation } = extra;
  const page = { uid: corporateMenu.uid, data: {} };

  return (
    <Layout page={page} settings={settings} navigation={navigation}>
      <MenuPageContent menu={corporateMenu} />
      <CtaFooter data={cta} />
    </Layout>
  );
}

export async function generateMetadata() {
  return {
    title: "Corporate Menu",
    description:
      "Corporate event catering and lunch or dinner menus for meetings and galas at The Grand LB.",
  };
}
