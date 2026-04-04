import Layout from "@components/Layout";
import { getExtra } from "@/services/get-extra";
import { DynamicCtaFooter, DynamicSliceZone, DynamicTileFooter } from "@/components/DynamicExports";
import { aboutPage } from "./content";

export const revalidate = false;

export default async function AboutPage() {
  const { settings, navigation, cta, footer_cards } = await getExtra({});

  return (
    <Layout page={aboutPage} settings={settings} navigation={navigation}>
      <DynamicSliceZone slices={aboutPage.data.slices} />
      <DynamicCtaFooter data={cta} />
      <DynamicTileFooter uid={aboutPage.uid} footer_cards={footer_cards} />
    </Layout>
  );
}

export async function generateMetadata() {
  return {
    title: "About",
    description:
      "SoCal's premier event center in the heart of Long Beach. Our story, spaces and what makes The Grand different.",
  };
}
