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
import { DynamicSliceZone } from "@/components/DynamicExports";

/**
 * Types
 */

/**
 * @name ContactPage
 */
export default async function ContactPage() {
  const client = createClient();
  const extra = await getExtra({});

  const [page] = await Promise.all([
    client.getByUID("page", "contact", {
      fetchLinks,
    }),
  ]);

  const { settings, navigation } = extra;

  return (
    <Layout page={page} navigation={navigation} settings={settings}>
      <DynamicSliceZone slices={page.data.slices} />
    </Layout>
  );
}

export async function generateMetadata() {
  return {
    title: "Contact - The Grand LB",
    description: "Contact The Grand LB - Luxury Event Venue",
  };
}
