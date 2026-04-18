import Layout from "@components/Layout";
import JsonLdVideo from "@/components/JsonLdVideo";
import { getExtra } from "@/services/get-extra";
import { DynamicCtaFooter, DynamicSliceZone } from "@/components/DynamicExports";
import { homePage } from "./content";

export const revalidate = false;

export default async function Homepage() {
  const { cta, settings, navigation } = await getExtra({});

  return (
    <Layout page={homePage} settings={settings} navigation={navigation}>
      <JsonLdVideo
        name="The Grand LB — Premier Event Venue in Long Beach, CA"
        description="SoCal's premier 40,000 sq ft event venue. Host weddings, quinceañeras, corporate events, and celebrations across 7 spaces for up to 675 guests. 20 min from LAX."
        thumbnailUrl="https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/b41a724a-b3ad-40ae-57df-98a1b8ce3400/public"
        contentUrl="https://cdn.thegrandlb.com/7cff637b-d646-493b-9e81-06266373f84c-homepage-60s-final.mp4"
        uploadDate="2024-06-01"
        duration="PT1M"
      />
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
