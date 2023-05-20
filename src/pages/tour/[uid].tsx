import { SliceZone } from "@prismicio/react";

import CtaFooter from "@/components/CtaFooter";
import SliceData from "@/components/dev/SliceData";
import HeroDetailPage from "@/components/HeroDetailPage";
import fetchLinks from "@/utils/fetchLinks";
import Layout from "@components/Layout";
import { createClient } from "../../../prismicio";
import { components } from "../../../slices";

const Page = ({ navigation, settings, cta, page }: any) => {
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
    </Layout>
  );
};
export default Page;

export async function getStaticProps({ params, previewData }: any) {
  const client = createClient({ previewData });

  const [navigation, settings, cta, page] = await Promise.all([
    client.getByType("nav_links"),
    client.getByType("settings"),
    client.getByType("fragment_cta_footer", {
      fetchLinks,
    }),
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
