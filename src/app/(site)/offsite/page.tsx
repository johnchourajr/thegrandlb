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
    title: "Offsite Events & Catering | The Grand LB in Long Beach, CA",
    description: "Explore offsite catering and event services from The Grand Long Beach. Full-service catering and event support beyond our Long Beach venue.",
    alternates: { canonical: "/offsite" },
  };
}
