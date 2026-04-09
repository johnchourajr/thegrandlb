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
    title: "About The Grand LB | Family-Owned Event Venue Since 1969 in Long Beach",
    description:
      "The Grand Long Beach is a family-owned, 40,000 sq ft event venue with 55+ years of history. 7 spaces, in-house catering, and a team that has hosted over 1,000 events per year.",
  };
}
