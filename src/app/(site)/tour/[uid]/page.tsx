import CtaFooter from "@/components/CtaFooter";
import { DynamicSliceZone } from "@/components/DynamicExports";
import HeroDetailPage from "@/components/HeroDetailPage";
import TileFooter from "@/components/TileFooter";
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import Layout from "@components/Layout";
import type { Content } from "@prismicio/client";
import { createClient } from "@/prismicio";

export const revalidate = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const client = createClient();

  // Await params as required by Next.js 15+
  const { uid } = await params;

  try {
    const page = await client.getByUID("tour_page", uid, {
      fetchLinks,
    });

    return {
      title: page.data.meta_title || `The Grand LB - ${page.data.title}`,
      description:
        page.data.meta_description || "The Grand LB - Luxury Event Venue",
    };
  } catch (error) {
    return {
      title: "Tour - The Grand LB",
      description: "The Grand LB - Luxury Event Venue",
    };
  }
}

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType("tour_page");

  return pages.map((page) => ({
    uid: page.uid?.toString(),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const client = createClient();
  const extra = await getExtra({});

  // Await params as required by Next.js 15+
  const { uid } = await params;

  try {
    const [page] = await Promise.all([
      client.getByUID("tour_page", uid, {
        fetchLinks,
      }),
    ]);

    if (!page) {
      throw new Error("Page not found");
    }

    const { settings, navigation, cta, footer_cards } = extra;
    const { data: { slices = [], ...pageRest } = {} } = page;

    // Type assertion for tour page data
    const tourPageData = pageRest as Content.TourPageDocument["data"];

    return (
      <Layout page={page} settings={settings} navigation={navigation}>
        <HeroDetailPage
          uid={page?.uid}
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
        <TileFooter uid={page?.uid} footer_cards={footer_cards} />
      </Layout>
    );
  } catch (error) {
    console.error("Error loading tour page:", error);
    return (
      <div>
        <h1>Page Error</h1>
        <p>Could not load tour page: {uid}</p>
      </div>
    );
  }
}
