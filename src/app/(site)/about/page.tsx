/**
 * Components
 */
import Layout from "@components/Layout";

/**
 * Services
 */
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import { createClient } from "../../../../prismicio";

/**
 * Slices
 */
import {
  DynamicCtaFooter,
  DynamicSliceZone,
  DynamicTileFooter,
} from "@/components/DynamicExports";

/**
 * Types
 */

/**
 * @name AboutPage
 */
export default async function AboutPage() {
  const client = createClient();
  const extra = await getExtra({});

  const [page] = await Promise.all([
    client.getByUID("page", "about", {
      fetchLinks,
    }),
  ]);

  const { settings, navigation, cta, footer_cards } = extra;

  return (
    <Layout page={page} settings={settings} navigation={navigation}>
      <></>
      <DynamicSliceZone slices={page.data.slices} />
      <DynamicCtaFooter data={cta} />
      <DynamicTileFooter uid={page.uid} footer_cards={footer_cards} />
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
