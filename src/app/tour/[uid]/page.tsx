import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import Layout from "@components/Layout";
import { createClient } from "../../../../prismicio";
import {
  DynamicCtaFooter,
  DynamicHeroDetailPage,
  DynamicSliceZone,
  DynamicTileFooter,
} from "@/components/DynamicExports";

/**
 * Types
 */
import type { GetStaticPropsParams, PageProps } from "@/types/page-props";

const Page = ({ page, cta, settings, navigation, footer_cards }: PageProps) => {
  const { data: { slices = [], ...pageRest } = {} } = page || {};

  return (
    <Layout page={page} settings={settings} navigation={navigation} hidePageUid>
      <DynamicHeroDetailPage
        uid={page?.uid}
        headline={pageRest.headline}
        media={pageRest.media}
        video_media={pageRest.video_media}
        subhead={pageRest.subhead}
        body={pageRest.body}
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
      <DynamicSliceZone
        context={page}
        slices={slices}
      />
      <DynamicCtaFooter data={cta} />
      <DynamicTileFooter uid={page?.uid} footer_cards={footer_cards} />
    </Layout>
  );
};

export default Page;

export async function generateMetadata({
  params,
}: {
  params: { uid: string };
}) {
  const client = createClient();

  try {
    const page = await client.getByUID("tour_page", params.uid, {
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

export async function getStaticProps({
  params,
  previewData,
}: GetStaticPropsParams) {
  const client = createClient({ previewData });
  const extra = await getExtra({ previewData });

  const [page] = await Promise.all([
    client.getByUID("tour_page", params?.uid || "", {
      fetchLinks,
    }),
  ]);

  return {
    props: {
      page,
      ...extra,
    },
  };
}
