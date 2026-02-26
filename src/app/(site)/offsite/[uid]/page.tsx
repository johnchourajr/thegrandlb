import {
  DynamicCtaFooter,
  DynamicSliceZone,
  DynamicTileFooter,
} from "@/components/DynamicExports";
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import Layout from "@components/Layout";
import { createClient } from "@/prismicio";

/**
 * Types
 */
import type { PageProps } from "@/types/page-props";

export default async function OffsitePage({
  params,
}: {
  params: { uid: string };
}) {
  const client = createClient();
  const extra = await getExtra({});

  const [page] = await Promise.all([
    client.getByUID("offsite_page", params.uid, {
      fetchLinks,
    }),
  ]);

  const { cta, settings, navigation, footer_cards } = extra;

  return (
    <Layout page={page} navigation={navigation} settings={settings}>
      <DynamicSliceZone slices={page?.data?.slices} />
      <DynamicCtaFooter data={cta} />
      <DynamicTileFooter uid={page?.uid} footer_cards={footer_cards} />
    </Layout>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { uid: string };
}) {
  const client = createClient();

  try {
    const page = await client.getByUID("offsite_page", params.uid, {
      fetchLinks,
    });

    return {
      title: page.data.meta_title || `The Grand LB - ${page.data.title}`,
      description:
        page.data.meta_description || "The Grand LB - Luxury Event Venue",
    };
  } catch (error) {
    return {
      title: "Offsite - The Grand LB",
      description: "The Grand LB - Luxury Event Venue",
    };
  }
}

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType("offsite_page");

  return pages.map((page) => ({
    uid: page.uid?.toString(),
  }));
}
