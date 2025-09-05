import {
  DynamicCtaFooter,
  DynamicSliceZone,
  DynamicTileFooter,
} from "@/components/DynamicExports";
import Layout from "@/components/Layout";
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import { createClient } from "../../../prismicio";

/**
 * Types
 */
import type { GetStaticPropsParams, PageProps } from "@/types/page-props";

const Page = ({ page, settings, navigation, cta, footer_cards }: PageProps) => {
  return (
    <Layout page={page} navigation={navigation} settings={settings}>
      <DynamicSliceZone slices={page.data.slices} />
      <DynamicCtaFooter data={cta} />
      <DynamicTileFooter uid={page.uid} footer_cards={footer_cards} />
    </Layout>
  );
};

export default Page;

export async function generateMetadata() {
  return {
    title: "Offsite - The Grand LB",
    description: "Explore our offsite event options at The Grand LB",
  };
}

export async function getStaticProps({ previewData }: GetStaticPropsParams) {
  const client = createClient({ previewData });
  const extra = await getExtra({ previewData });

  const [page, childPages] = await Promise.all([
    client.getByUID("offsite_index_page", "offsite", {
      fetchLinks,
    }),
    client.getByType("offsite_page"),
  ]);

  return {
    props: {
      page,
      childPages,
      ...extra,
    },
  };
}
