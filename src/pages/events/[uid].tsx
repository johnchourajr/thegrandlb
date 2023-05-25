import { SliceZone } from "@prismicio/react";

import CtaFooter from "@/components/CtaFooter";
import HeroDetailPage from "@/components/HeroDetailPage";
import TileFooter from "@/components/TileFooter";
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import Layout from "@components/Layout";
import { createClient } from "../../../prismicio";
import { components } from "../../../slices";

const Page = ({ page, cta, footer_cards }: any) => {
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
      <TileFooter uid={page.uid} footer_cards={footer_cards} />
    </Layout>
  );
};
export default Page;

export async function getStaticProps({ params, previewData }: any) {
  const client = createClient({ previewData });
  const extra = await getExtra({ previewData });

  const [page] = await Promise.all([
    client.getByUID("event_page", params.uid, {
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

  const pages = await client.getAllByType("event_page");

  return {
    paths: pages.map((page) => ({
      params: { uid: page.uid?.toString() },
    })),
    fallback: false,
  };
}
