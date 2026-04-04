import CtaFooter from "@/components/CtaFooter";
import { DynamicSliceZone } from "@/components/DynamicExports";
import HeroDetailPage from "@/components/HeroDetailPage";
import TileFooter from "@/components/TileFooter";
import { getExtra } from "@/services/get-extra";
import Layout from "@components/Layout";
import type { Content } from "@prismicio/client";
import { notFound } from "next/navigation";
import { tourPages, tourPageUids } from "./content";

export const revalidate = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;
  const page = tourPages[uid];
  if (!page) {
    return { title: "Tour - The Grand LB", description: "The Grand LB - Luxury Event Venue" };
  }
  return {
    title: page.data.meta_title || `The Grand LB - ${page.data.title}`,
    description: page.data.meta_description || "The Grand LB - Luxury Event Venue",
  };
}

export async function generateStaticParams() {
  return tourPageUids.map((uid) => ({ uid }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;
  const page = tourPages[uid];
  if (!page) notFound();

  const { settings, navigation, cta, footer_cards } = await getExtra({});
  const { data: { slices = [], ...pageRest } = {} } = page;
  const tourPageData = pageRest as Content.TourPageDocument["data"];

  return (
    <Layout page={page} settings={settings} navigation={navigation}>
      <HeroDetailPage
        uid={page.uid}
        headline={tourPageData?.headline}
        media={tourPageData?.media}
        video_url={(tourPageData as { video_url?: string }).video_url}
        subhead={tourPageData?.subhead}
        body={tourPageData?.body}
        primary_action={"Book this space"}
        primary_action_link={{
          id: "ZC5YBhAAACEA0ymB",
          type: "inquire_page",
          lang: "en-us",
          slug: "inquire-page",
          uid: "inquire",
          link_type: "Document",
        }}
      />
      <DynamicSliceZone context={page} slices={slices} />
      <CtaFooter data={cta} />
      <TileFooter uid={page.uid} footer_cards={footer_cards} />
    </Layout>
  );
}
