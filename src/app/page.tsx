/**
 * Components
 */
import Layout from "@components/Layout";

/**
 * Services
 */
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import { createClient } from "../../prismicio";

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
    title: "The Grand LB - Home",
    description: "The Grand LB - Luxury Event Venue",
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
