import { SliceZone } from "@prismicio/react";

import CtaFooter from "@/components/CtaFooter";
import SliceData from "@/components/dev/SliceData";
import HeroDetailPage from "@/components/HeroDetailPage";
import TileFooter from "@/components/TileFooter";
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import Layout from "@components/Layout";
import { createClient } from "../../../prismicio";
import { components } from "../../../slices";

const Page = ({ page, cta, footer_cards }: any) => {
  // if (!page || !cta || !footer_cards) return null;

  const { data: { slices = [], ...pageRest } = {} } = page || {};

  return (
    <Layout page={page} hidePageUid>
      <HeroDetailPage
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
      <SliceData slice={pageRest} hidden />
      <SliceZone context={page} slices={slices} components={components} />
      <CtaFooter data={cta} />
      <TileFooter uid={page?.uid} footer_cards={footer_cards} />
    </Layout>
  );
};
export default Page;

export async function getStaticProps({ params, previewData }: any) {
  const client = createClient({ previewData });
  const extra = await getExtra({ previewData });

  const [page] = await Promise.all([
    client.getByUID("tour_page", params.uid, {
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

export async function getStaticPaths() {
  const client = createClient();

  const pages = await client.getAllByType("tour_page");

  return {
    paths: pages.map((page) => ({
      params: { uid: page.uid?.toString() },
    })),
    fallback: true,
  };
}
