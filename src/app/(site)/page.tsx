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
  return {
    title: {
      absolute:
        "The Grand LB | Premier Event Venue & Weddings in Long Beach, CA",
    },
    description:
      "SoCal's premier 40,000 sq ft event venue. Host weddings, corporate events and private celebrations in Long Beach. 20 minutes from LAX.",
    openGraph: {
      title:
        "The Grand LB | Premier Event Venue & Weddings in Long Beach, CA",
      description:
        "SoCal's premier 40,000 sq ft event venue. Host weddings, corporate events and private celebrations in Long Beach. 20 minutes from LAX.",
    },
  };
}
