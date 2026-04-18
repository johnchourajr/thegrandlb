import CtaFooter from "@/components/CtaFooter";
import { DynamicSliceZone } from "@/components/DynamicExports";
import GridBase from "@/components/grid-index/GridBase";
import JsonLdVideo from "@/components/JsonLdVideo";
import { getEventIndexLayout } from "@/components/grid-index/utils";
import HeroCategoryPage from "@/components/HeroCategoryPage";
import Layout from "@/components/Layout";
import TileFooter from "@/components/TileFooter";
import { getExtra } from "@/services/get-extra";
import type { EventPageWithLayout } from "@/types/grid";
import { eventIndexPage } from "./content";
import type { ContentImageField } from "content/types";

export const revalidate = false;

export default async function Page() {
  const { settings, navigation, cta, footer_cards } = await getExtra({});

  const { slices, title, gallery, media, video_url, headline, body } = eventIndexPage.data;
  const eventPages = eventIndexPage.data.event_pages as Array<{
    page: { uid: string; data: { title?: string | null; headline?: string | null; caption?: string | null } };
    page_media?: ContentImageField;
  }> | undefined;

  const itemsWithLayout: EventPageWithLayout[] =
    (eventPages ?? []).map((item) => ({
      ...item,
      layout: getEventIndexLayout(item.page?.uid),
    }));

  return (
    <Layout page={eventIndexPage} settings={settings} navigation={navigation}>
      <JsonLdVideo
        name="Events at The Grand LB Long Beach — Weddings, Corporate & Celebrations"
        description="The Grand Long Beach hosts weddings, quinceañeras, corporate events, galas, and private celebrations. 7 indoor and outdoor spaces for 40–675 guests. 20 min from LAX."
        thumbnailUrl="https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/856df71a-3832-4963-6cc1-1fc9c6115c00/public"
        contentUrl="https://cdn.thegrandlb.com/9e5d872e-81ca-46e2-93e4-7d952055014c-events-index-15s-final.mp4"
        uploadDate="2024-06-01"
        duration="PT15S"
      />
      <HeroCategoryPage
        headline={title}
        gallery={gallery}
        video_url={video_url}
        media={media}
        icon_media={undefined}
        subhead={headline}
        body={body}
      />
      <GridBase
        uid={eventIndexPage.uid}
        sectionId="event-index"
        items={itemsWithLayout}
      />
      <DynamicSliceZone slices={slices} />
      <CtaFooter data={cta} />
      <TileFooter uid={eventIndexPage.uid} footer_cards={footer_cards} />
    </Layout>
  );
}

export async function generateMetadata() {
  return {
    title: "Event Venue in Long Beach, CA | Weddings, Quinceañeras & Corporate Events",
    description:
      "The Grand Long Beach is a 40,000 sq ft event venue for weddings, quinceañeras, corporate events, and private celebrations. 7 spaces for 40-675 guests with in-house catering. 20 min from LAX.",
    alternates: { canonical: "/events" },
  };
}
