import CtaFooter from "@/components/CtaFooter";
import GridBase from "@/components/grid-index/GridBase";
import { getEventIndexLayout } from "@/components/grid-index/utils";
import HeroCategoryPage from "@/components/HeroCategoryPage";
import Layout from "@/components/Layout";
import TileFooter from "@/components/TileFooter";
import { getExtra } from "@/services/get-extra";
import type { EventPageWithLayout } from "@/types/grid";
import type { Content } from "@prismicio/client";
import { DynamicSliceZone } from "@/components/DynamicExports";
import { eventIndexPage } from "./content";

export const revalidate = false;

export default async function Page() {
  const { settings, navigation, cta, footer_cards } = await getExtra({});

  const { slices = [], title = "", gallery = [], media } = eventIndexPage.data;
  const video_url = (eventIndexPage.data as { video_url?: string }).video_url;
  const eventIndexData = eventIndexPage.data as Content.EventIndexPageDocument["data"];
  const { headline, body, event_pages } = eventIndexData || {};

  const itemsWithLayout: EventPageWithLayout[] =
    event_pages?.map(
      (item: Content.EventIndexPageDocumentDataEventPagesItem) => ({
        ...item,
        layout: getEventIndexLayout((item.page as any).uid),
      })
    ) || [];

  return (
    <Layout page={eventIndexPage} settings={settings} navigation={navigation}>
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
      <DynamicSliceZone slices={eventIndexPage.data.slices} />
      <CtaFooter data={cta} />
      <TileFooter uid={eventIndexPage.uid} footer_cards={footer_cards} />
    </Layout>
  );
}

export async function generateMetadata() {
  return {
    title: "Events",
    description:
      "A premier 40,000 sq ft event venue for weddings, corporate events and private celebrations in Long Beach.",
  };
}
