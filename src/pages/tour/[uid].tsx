import { SliceZone } from "@prismicio/react";

import SliceData from "@/components/dev/SliceData";
import HeroDetailPage from "@/components/HeroDetailPage";
import fetchLinks from "@/utils/fetchLinks";
import Layout from "@components/Layout";
import { createClient } from "../../../prismicio";
import { components } from "../../../slices";

const Page = ({ navigation, settings, cta, page }: any) => {
  // console.log({ navigation, settings, cta });

  const {
    data: { slices, ...pageRest },
  } = page;

  return (
    <Layout page={page} hidePageUid>
      <HeroDetailPage
        uid={page.uid}
        headline={pageRest.headline}
        media={pageRest.media}
        video_media={pageRest.video_media}
        subhead={pageRest.subhead}
        body={pageRest.body}
      />
      <SliceData slice={pageRest} hidden />
      <SliceZone slices={slices} components={components} />
    </Layout>
  );
};
export default Page;

export async function getStaticProps({ params, previewData }: any) {
  const client = createClient({ previewData });

  const [navigation, settings, cta, page] = await Promise.all([
    client.getByType("nav_links"),
    client.getByType("settings"),
    client.getByType("fragment_cta_footer"),
    client.getByUID("tour_page", params.uid, {
      fetchLinks,
    }),
  ]);

  return {
    props: {
      navigation,
      settings,
      cta,
      page,
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
    fallback: false,
  };
}
