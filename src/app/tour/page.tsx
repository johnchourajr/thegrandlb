import GridBase from "@/components/grid-index/GridBase";
import { getTourIndexLayout } from "@/components/grid-index/utils";
import HeroCategoryPage from "@/components/HeroCategoryPage";
import Layout from "@/components/Layout";
import { getExtra } from "@/services/get-extra";
import type { TourSpaceWithLayout } from "@/types/grid";
import fetchLinks from "@/utils/fetchLinks";
import type { Content } from "@prismicio/client";
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

  // Type assertion for resolved page after fetchLinks
  const typedPage = page as Content.TourIndexPageDocument & {
    data: {
      spaces: Array<{
        page: Content.TourPageDocument;
        page_media: Content.TourIndexPageDocumentDataSpacesItem["page_media"];
      }>;
    } & Content.TourIndexPageDocument["data"];
  };

  const { settings, navigation, cta, footer_cards } = extra;

  const {
    data: { slices, title, gallery, video_media, media, ...pageRest },
  } = typedPage;

  const { icon_media, headline, body, spaces } = pageRest;

  // Pre-compute layout data for each space
  const spacesWithLayout: TourSpaceWithLayout[] =
    spaces?.map((item) => ({
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
