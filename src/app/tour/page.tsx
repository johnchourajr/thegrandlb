import GridBase from "@/components/grid-index/GridBase";
import { getTourIndexLayout } from "@/components/grid-index/utils";
import HeroCategoryPage from "@/components/HeroCategoryPage";
import Layout from "@/components/Layout";
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import { createClient } from "../../../prismicio";

import {
  DynamicCtaFooter,
  DynamicSliceZone,
  DynamicTileFooter,
} from "@/components/DynamicExports";

export default async function Page() {
  const client = createClient();
  const extra = await getExtra({});

  const [page, childPages] = await Promise.all([
    client.getByUID("tour_index_page", "tour", {
      fetchLinks,
    }),
    client.getByType("tour_page"),
  ]);

  const { settings, navigation, cta, footer_cards } = extra;

  const {
    data: { slices, title, gallery, video_media, media, ...pageRest },
  } = page;

  const { icon_media, headline, body, spaces } = pageRest;

  // Pre-compute layout data for each space
  const spacesWithLayout =
    spaces?.map((item: any) => ({
      ...item,
      layout: getTourIndexLayout(item.page.uid),
    })) || [];

  return (
    <Layout page={page} settings={settings} navigation={navigation} hidePageUid>
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
        sectionId="tour-index"
        uid={page.uid}
        items={spacesWithLayout}
      />
      <DynamicSliceZone slices={slices} />
      <DynamicCtaFooter data={cta} />
      <DynamicTileFooter uid={page.uid} footer_cards={footer_cards} />
    </Layout>
  );
}

export async function generateMetadata() {
  return {
    title: "Tour - The Grand LB",
    description: "Take a virtual tour of The Grand LB",
  };
}
