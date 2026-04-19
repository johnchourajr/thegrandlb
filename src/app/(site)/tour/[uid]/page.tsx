import CtaFooter from "@/components/CtaFooter";
import { DynamicSliceZone } from "@/components/DynamicExports";
import HeroDetailPage from "@/components/HeroDetailPage";
import JsonLdBreadcrumb from "@/components/JsonLdBreadcrumb";
import JsonLdVideo from "@/components/JsonLdVideo";
import TileFooter from "@/components/TileFooter";
import { getExtra } from "@/services/get-extra";
import Layout from "@components/Layout";
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
  const title = page.data.meta_title || `${page.data.title} | The Grand LB`;
  const description = page.data.meta_description || "The Grand LB - Luxury Event Venue";
  const heroMedia = page.data.media;
  const ogImage = heroMedia?.url;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/tour/${uid}` },
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
  const { slices, headline, media, video_url, subhead, body } = page.data;
  const thumbnailUrl = media?.url;
  const metaTitle = page.data.meta_title;
  const metaDescription = page.data.meta_description;

  return (
    <Layout page={page} settings={settings} navigation={navigation}>
      {video_url && thumbnailUrl && (
        <JsonLdVideo
          name={metaTitle ?? `${headline} — Video Tour`}
          description={metaDescription ?? "Event space video tour at The Grand Long Beach, CA."}
          thumbnailUrl={thumbnailUrl}
          contentUrl={video_url}
          uploadDate="2024-06-01T00:00:00+00:00"
          duration="PT30S"
        />
      )}
      <JsonLdBreadcrumb
        crumbs={[
          { name: "Home", url: "https://thegrandlb.com" },
          { name: "Tour", url: "https://thegrandlb.com/tour" },
          { name: page.data.headline ?? uid, url: `https://thegrandlb.com/tour/${uid}` },
        ]}
      />
      <HeroDetailPage
        uid={page.uid}
        headline={headline}
        media={media}
        video_url={video_url}
        subhead={subhead}
        body={body}
        primary_action={"Book this space"}
        primary_action_link={{
          link_type: "Document",
          id: "ZC5YBhAAACEA0ymB",
          type: "inquire_page",
          lang: "en-us",
          slug: "inquire-page",
          uid: "inquire",
        }}
      />
      <DynamicSliceZone context={page} slices={slices} />
      <CtaFooter data={cta} />
      <TileFooter uid={page.uid} footer_cards={footer_cards} />
    </Layout>
  );
}
