import { getPrismicMenus } from "@/app/api/get-prismic-menus/route";
import {
  DynamicCtaFooter,
  DynamicMenuPageContent,
} from "@/components/DynamicExports";
import Layout from "@/components/Layout";
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import { createClient } from "../../../../prismicio";

/**
 * Types
 */
import type { PageProps } from "@/types/page-props";

export default async function WeddingsMenuPage() {
  const client = createClient();
  const extra = await getExtra({});

  const [page] = await Promise.all([
    client.getByUID("menu_page", "weddings", {
      fetchLinks,
    }),
  ]);

  const { cta, settings, navigation } = extra;

  return (
    <Layout page={page} settings={settings} navigation={navigation}>
      <DynamicMenuPageContent page={page} source={page} />
      <DynamicCtaFooter data={cta} />
    </Layout>
  );
}

export async function generateMetadata() {
  return {
    title: "Weddings Menu - The Grand LB",
    description: "Our wedding menu offerings at The Grand LB",
  };
}