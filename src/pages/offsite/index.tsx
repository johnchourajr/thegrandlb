import { SliceZone } from "@prismicio/react";

import CtaFooter from "@/components/CtaFooter";
import Layout from "@/components/Layout";
import TileFooter from "@/components/TileFooter";
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import { createClient } from "../../../prismicio";
import { components } from "../../../slices/";

const Page = ({ page, childPages, cta, footer_cards }: any) => {
  return (
    <Layout page={page}>
      <></>
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
