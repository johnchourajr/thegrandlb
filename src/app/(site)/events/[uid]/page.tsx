import { getExtra } from "@/services/get-extra";
import Layout from "@components/Layout";
import { notFound } from "next/navigation";

import {
  DynamicCtaFooter,
  DynamicHeroDetailPage,
  DynamicSliceZone,
  DynamicTileFooter,
} from "@/components/DynamicExports";
import JsonLdBreadcrumb from "@/components/JsonLdBreadcrumb";
import { eventPages, eventPageUids } from "./content";

export const revalidate = false;

export default async function Page({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;
  const page = eventPages[uid];
  if (!page) notFound();

  const { settings, navigation, cta, footer_cards } = await getExtra({});
  const { slices, title, headline, caption, media, video_url } = page.data;

  return (
    <Layout page={page} settings={settings} navigation={navigation}>
      <JsonLdBreadcrumb
        crumbs={[
          { name: "Home", url: "https://thegrandlb.com" },
          { name: "Events", url: "https://thegrandlb.com/events" },
          { name: page.data.title ?? uid, url: `https://thegrandlb.com/events/${uid}` },
        ]}
      />
      <DynamicHeroDetailPage
        uid={page.uid}
        title={title}
        headline={headline}
        caption={caption}
        captionClassName="mx-auto max-w-[20em]"
        media={media}
        video_url={video_url}
      />
      <DynamicSliceZone slices={slices} />
      <DynamicCtaFooter data={cta} />
      <DynamicTileFooter uid={page.uid} footer_cards={footer_cards} />
    </Layout>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;
  const page = eventPages[uid];
  if (!page) {
    return {
      title: "Event - The Grand LB",
      description: "The Grand LB - Luxury Event Venue",
    };
  }
  const title = page.data.meta_title || `${page.data.title} | The Grand LB`;
  const description =
    page.data.meta_description || "The Grand LB - Luxury Event Venue";
  const heroImage = page.data.slices?.find((s) => s.type === "image_section");
  const media = heroImage?.media as { url?: string } | undefined;
  const ogImage = media?.url;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/events/${uid}` },
    ...(ogImage && {
      openGraph: {
        title,
        description,
        images: [{ url: ogImage, width: 1200, height: 630 }],
      },
      twitter: {
        card: "summary_large_image" as const,
        title,
        description,
        images: [ogImage],
      },
    }),
  };
}

export async function generateStaticParams() {
  return eventPageUids.map((uid) => ({ uid }));
}
