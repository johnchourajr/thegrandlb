import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import Layout from "@components/Layout";
import type { Content } from "@prismicio/client";
import { createClient } from "@/prismicio";

import {
  DynamicCtaFooter,
  DynamicHeroDetailPage,
  DynamicSliceZone,
  DynamicTileFooter,
} from "@/components/DynamicExports";

export const revalidate = false;

export default async function Page({ params }: { params: { uid: string } }) {
  const client = createClient();
  const extra = await getExtra({});

  const [page] = await Promise.all([
    client.getByUID("event_page", params.uid, {
      fetchLinks,
    }),
  ]);

  const { settings, navigation, cta, footer_cards } = extra;
  const { data: { slices = [], ...pageRest } = {} } = page || {};

  // Type assertion for event page data
  const eventPageData = pageRest as Content.EventPageDocument["data"];

  return (
    <Layout page={page} settings={settings} navigation={navigation}>
      <DynamicHeroDetailPage
        uid={page?.uid}
        title={eventPageData?.title}
        headline={eventPageData?.headline}
        caption={eventPageData?.caption}
        media={eventPageData?.media}
        video_url={(eventPageData as { video_url?: string }).video_url}
      />
      <DynamicSliceZone slices={page?.data.slices} />
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
    const page = await client.getByUID("event_page", params.uid, {
      fetchLinks,
    });

    return {
      title: page.data.meta_title || `The Grand LB - ${page.data.title}`,
      description:
        page.data.meta_description || "The Grand LB - Luxury Event Venue",
    };
  } catch (error) {
    return {
      title: "Event - The Grand LB",
      description: "The Grand LB - Luxury Event Venue",
    };
  }
}

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType("event_page");

  return pages.map((page) => ({
    uid: page.uid?.toString(),
  }));
}
