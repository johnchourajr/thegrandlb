import { DynamicCtaFooter, DynamicSliceZone, DynamicTileFooter } from "@/components/DynamicExports";
import Layout from "@/components/Layout";
import { getExtra } from "@/services/get-extra";
import { offsiteIndexPage } from "./content";

export const revalidate = false;

export default async function Page() {
  const { settings, navigation, cta, footer_cards } = await getExtra({});

  return (
    <Layout page={offsiteIndexPage} navigation={navigation} settings={settings}>
      <DynamicSliceZone slices={offsiteIndexPage.data.slices} />
      <DynamicCtaFooter data={cta} />
      <DynamicTileFooter uid={offsiteIndexPage.uid} footer_cards={footer_cards} />
    </Layout>
  );
}

export async function generateMetadata() {
  return {
    title: "Offsite - The Grand LB",
    description: "Explore our offsite event options at The Grand LB",
  };
}
