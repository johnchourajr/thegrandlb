import GridBase from "@/components/grid-index/GridBase";
import { getTourIndexLayout } from "@/components/grid-index/utils";
import HeroCategoryPage from "@/components/HeroCategoryPage";
import JsonLdVideo from "@/components/JsonLdVideo";
import Layout from "@/components/Layout";
import { getExtra } from "@/services/get-extra";
import type { TourSpaceWithLayout } from "@/types/grid";
import { DynamicCtaFooter, DynamicSliceZone, DynamicTileFooter } from "@/components/DynamicExports";
import { tourIndexPage } from "./content";

export const revalidate = false;

export default async function Page() {
  const { settings, navigation, cta, footer_cards } = await getExtra({});

  const { slices, title, gallery, media, icon_media, headline, body, video_url } = tourIndexPage.data;
  const spaces = tourIndexPage.data.spaces as Array<{ page: { uid: string; data: Record<string, unknown> }; page_media: import("content/types").ContentImageField }> | undefined;

  const spacesWithLayout: TourSpaceWithLayout[] =
    (spaces ?? []).map((item) => ({
      ...item,
      layout: getTourIndexLayout(item.page.uid),
    }));

  return (
    <Layout page={tourIndexPage} settings={settings} navigation={navigation} hidePageUid>
      <JsonLdVideo
        name="Event Spaces at The Grand LB — Venue Tour"
        description="7 indoor and outdoor event spaces at The Grand Long Beach, CA. From the 675-guest Grand Ballroom to the intimate Board Room. 40,000 sq ft venue 20 min from LAX."
        thumbnailUrl="https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/569cb5d0-cd2b-433e-6f65-d237efee8900/public"
        contentUrl="https://cdn.thegrandlb.com/2ff5529b-ae2d-4706-9e14-2e9215729acf-tour-index-15s-final.mp4"
        uploadDate="2024-06-01"
        duration="PT15S"
      />
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
    title: "7 Event Spaces in Long Beach, CA | The Grand LB",
    description:
      "7 indoor and outdoor event spaces at The Grand Long Beach — from the 675-guest Grand Ballroom to the intimate 40-guest Board Room. 40,000 sq ft. Free parking. 20 min from LAX.",
    alternates: { canonical: "/tour" },
  };
}
