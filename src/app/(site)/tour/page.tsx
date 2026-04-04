import GridBase from "@/components/grid-index/GridBase";
import { getTourIndexLayout } from "@/components/grid-index/utils";
import HeroCategoryPage from "@/components/HeroCategoryPage";
import Layout from "@/components/Layout";
import { getExtra } from "@/services/get-extra";
import type { TourSpaceWithLayout } from "@/types/grid";
import type { Content } from "@prismicio/client";
import { DynamicCtaFooter, DynamicSliceZone, DynamicTileFooter } from "@/components/DynamicExports";
import { tourIndexPage } from "./content";

export const revalidate = false;

export default async function Page() {
  const { settings, navigation, cta, footer_cards } = await getExtra({});

  const typedPage = tourIndexPage as Content.TourIndexPageDocument & {
    data: {
      spaces: Array<{
        page: Content.TourPageDocument;
        page_media: Content.TourIndexPageDocumentDataSpacesItem["page_media"];
      }>;
    } & Content.TourIndexPageDocument["data"];
  };

  const { slices, title, gallery, media, icon_media, headline, body, spaces } = typedPage.data;
  const video_url = (typedPage.data as { video_url?: string }).video_url;

  const spacesWithLayout: TourSpaceWithLayout[] =
    spaces?.map((item) => ({
      ...item,
      layout: getTourIndexLayout(item.page.uid),
    })) || [];

  return (
    <Layout page={tourIndexPage} settings={settings} navigation={navigation} hidePageUid>
      <HeroCategoryPage
        headline={title}
        gallery={gallery}
        video_url={video_url}
        media={media}
        icon_media={icon_media}
        subhead={headline}
        body={body}
      />
      <GridBase
        sectionId="tour-index"
        uid={tourIndexPage.uid}
        items={spacesWithLayout}
      />
      <DynamicSliceZone slices={slices} />
      <DynamicCtaFooter data={cta} />
      <DynamicTileFooter uid={tourIndexPage.uid} footer_cards={footer_cards} />
    </Layout>
  );
}

export async function generateMetadata() {
  return {
    title: "Tour",
    description:
      "Explore our ballrooms, dining rooms and 40,000 sq ft event spaces. Virtual tour of The Grand LB in Long Beach.",
  };
}
