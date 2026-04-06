import CtaFooter from "@/components/CtaFooter";
import Layout from "@/components/Layout";
import { MenuPageContent } from "@/components/MenuPageContent";
import { getExtra } from "@/services/get-extra";
import weddingsMenu from "content/menus/weddings.menu";

export const revalidate = false;

export default async function WeddingsMenuPage() {
  const extra = await getExtra({});
  const { cta, settings, navigation } = extra;
  const page = { uid: weddingsMenu.uid, data: {} };

  return (
    <Layout page={page} settings={settings} navigation={navigation}>
      <MenuPageContent menu={weddingsMenu} />
      <CtaFooter data={cta} />
    </Layout>
  );
}

export async function generateMetadata() {
  return {
    title: "Weddings Menu",
    description:
      "Wedding catering and banquet options. Plated, buffet and stations for your reception at The Grand LB.",
  };
}
