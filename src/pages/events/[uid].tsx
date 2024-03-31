import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import Layout from "@components/Layout";
import { createClient } from "../../../prismicio";
import { components } from "../../../slices";

import {
  DynamicCtaFooter,
  DynamicHeroDetailPage,
  DynamicSliceZone,
  DynamicTileFooter,
} from "@/components/DynamicExports";

const Page = ({ page, cta, settings, footer_cards, navigation }: any) => {
  // if (!page || !cta || !footer_cards) return null;
  const { data: { slices = [], ...pageRest } = {} } = page || {};

  return (
    <Layout page={page} settings={settings} navigation={navigation}>
      <DynamicHeroDetailPage
        uid={page?.uid}
        title={pageRest?.title}
        headline={pageRest?.headline}
      />
      <DynamicSliceZone slices={page?.data.slices} components={components} />
      <DynamicCtaFooter data={cta} />
      <DynamicTileFooter uid={page?.uid} footer_cards={footer_cards} />
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
    fallback: true,
  };
}
