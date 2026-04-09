import GridBase from "@/components/grid-index/GridBase";
import { getTourIndexLayout } from "@/components/grid-index/utils";
import HeroCategoryPage from "@/components/HeroCategoryPage";
import Layout from "@/components/Layout";
import { getExtra } from "@/services/get-extra";
import type { TourSpaceWithLayout } from "@/types/grid";
import { DynamicCtaFooter, DynamicSliceZone, DynamicTileFooter } from "@/components/DynamicExports";
import { tourIndexPage } from "./content";

export const revalidate = false;

export default async function Page() {
  const { settings, navigation, cta, footer_cards } = await getExtra({});

  const { slices, title, gallery, media, icon_media, headline, body, video_url } = tourIndexPage.data;
  const spaces = tourIndexPage.data.spaces as Array<{ page: { uid: string; data: Record<string, unknown> }; page_media: import("content/types").PrismicImageLike }> | undefined;

  const spacesWithLayout: TourSpaceWithLayout[] =
    (spaces ?? []).map((item) => ({
      ...item,
      layout: getTourIndexLayout(item.page.uid),
    }));

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
    title: "Tour Our Event Spaces | 7 Venues for 40-675 Guests in Long Beach, CA",
    description:
      "Explore 7 indoor and outdoor event spaces at The Grand Long Beach. From The Grand Ballroom (675 guests) to The Board Room (40 guests). 40,000 sq ft venue in Long Beach, CA.",
  };
}
