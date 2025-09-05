import CtaFooter from "@/components/CtaFooter";
import GridBase from "@/components/grid-index/GridBase";
import { getEventIndexLayout } from "@/components/grid-index/utils";
import HeroCategoryPage from "@/components/HeroCategoryPage";
import Layout from "@/components/Layout";
import TileFooter from "@/components/TileFooter";
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import { createClient } from "../../../prismicio";

import { DynamicSliceZone } from "@/components/DynamicExports";

/**
 * Types
 */

export default async function Page() {
  const client = createClient();
  const extra = await getExtra({});

  const [page, childPages] = await Promise.all([
    client.getByUID("event_index_page", "events", {
      fetchLinks,
    }),
    client.getByType("event_page"),
  ]);

  const { settings, navigation, cta, footer_cards } = extra;

  const {
    data: {
      slices = [],
      title = "",
      gallery = [],
      video_media = "",
      media = "",
      ...pageRest
    } = {},
  } = page || {};

  const { icon_media, headline, body, event_pages } = pageRest;

  // Pre-compute layout data for each event page
  const itemsWithLayout =
    event_pages?.map((item: any) => ({
      ...item,
      layout: getEventIndexLayout(item.page.uid),
    })) || [];

  return (
    <Layout page={page} settings={settings} navigation={navigation}>
      <HeroCategoryPage
        headline={title}
        gallery={gallery}
        video_media={video_media}
        media={media}
        icon_media={icon_media}
        subhead={headline}
        body={body}
      />
      <GridBase
        uid={page?.uid}
        sectionId="event-index"
        items={itemsWithLayout}
      />
      <DynamicSliceZone slices={page?.data.slices} />
      <CtaFooter data={cta} />
      <TileFooter uid={page?.uid} footer_cards={footer_cards} />
    </Layout>
  );
}

export async function generateMetadata() {
  return {
    title: "Events - The Grand LB",
    description: "Host your special events at The Grand LB",
  };
}
