/**
 * Components
 */
import Layout from "@components/Layout";

/**
 * Services
 */
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import { createClient } from "../../../prismicio";

/**
 * Slices
 */
import {
  DynamicCtaFooter,
  DynamicSliceZone,
} from "@/components/DynamicExports";

/**
 * Types
 */

/**
 * @name Homepage
 */
export default async function Homepage() {
  const { cta, page, settings, navigation } = await getPageData();
  const {
    data: { slices },
  } = page;

  return (
    <Layout page={page} settings={settings} navigation={navigation}>
      <DynamicSliceZone slices={slices} />
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

async function getPageData() {
  const client = createClient();
  const extra = await getExtra({});

  const [page] = await Promise.all([
    client.getByUID("page", "home", {
      fetchLinks,
    }),
  ]);

  return {
    page,
    ...extra,
  };
}
