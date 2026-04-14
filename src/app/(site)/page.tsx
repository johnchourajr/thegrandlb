import Layout from "@components/Layout";
import { getExtra } from "@/services/get-extra";
import { DynamicCtaFooter, DynamicSliceZone } from "@/components/DynamicExports";
import { homePage } from "./content";

export const revalidate = false;

export default async function Homepage() {
  const { cta, settings, navigation } = await getExtra({});

  return (
    <Layout page={homePage} settings={settings} navigation={navigation}>
      <DynamicSliceZone slices={homePage.data.slices} />
      <DynamicCtaFooter data={cta} />
    </Layout>
  );
}

export async function generateMetadata() {
  const description =
    "Premier 40,000 sq ft event venue in Long Beach, CA. Host weddings, quinceañeras, corporate events, and private celebrations across 7 spaces for up to 675 guests. 20 min from LAX.";
  return {
    title: {
      absolute:
        "The Grand LB | Event Venue & Wedding Venue in Long Beach, CA",
    },
    description,
    alternates: { canonical: "/" },
    openGraph: {
      title:
        "The Grand LB | Event Venue & Wedding Venue in Long Beach, CA",
      description,
    },
  };
}
