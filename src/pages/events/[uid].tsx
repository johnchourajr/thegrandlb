import { SliceZone } from "@prismicio/react";

import CtaFooter from "@/components/CtaFooter";
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
        title={pageRest.title}
        headline={pageRest.headline}
      />
      <SliceZone slices={page.data.slices} components={components} />
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
    client.getByUID("event_page", params.uid, {
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

  const pages = await client.getAllByType("event_page");

  return {
    paths: pages.map((page) => ({
      params: { uid: page.uid?.toString() },
    })),
    fallback: false,
  };
}
