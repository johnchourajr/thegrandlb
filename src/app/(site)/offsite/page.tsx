import {
  DynamicCtaFooter,
  DynamicSliceZone,
  DynamicTileFooter,
} from "@/components/DynamicExports";
import Layout from "@/components/Layout";
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import { createClient } from "@/prismicio";

/**
 * Types
 */

export const revalidate = false;

export default async function Page() {
  const { page, settings, navigation, cta, footer_cards } = await getPageData();

  return (
    <Layout page={page} navigation={navigation} settings={settings}>
      <DynamicSliceZone slices={page.data.slices} />
      <DynamicCtaFooter data={cta} />
      <DynamicTileFooter uid={page.uid} footer_cards={footer_cards} />
    </Layout>
  );
}

export async function generateMetadata() {
  return {
    title: "Offsite - The Grand LB",
    description: "Explore our offsite event options at The Grand LB",
  };
}

async function getPageData() {
  const client = createClient();
  const extra = await getExtra({});

  const [page, childPages] = await Promise.all([
    client.getByUID("offsite_index_page", "offsite", {
      fetchLinks,
    }),
    client.getByType("offsite_page"),
  ]);

  return {
    page,
    childPages,
    ...extra,
  };
}
