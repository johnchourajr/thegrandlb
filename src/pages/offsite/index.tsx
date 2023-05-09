import { SliceZone } from "@prismicio/react";

import CtaFooter from "@/components/CtaFooter";
import Layout from "@/components/Layout";
import fetchLinks from "@/utils/fetchLinks";
import { createClient } from "../../../prismicio";
import { components } from "../../../slices/";

const Page = ({ navigation, settings, cta, page, childPages }: any) => {
  return (
    <Layout page={page}>
      <></>
      <SliceZone slices={page.data.slices} components={components} />
      <CtaFooter data={cta} />
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }: any) {
  const client = createClient({ previewData });

  const [navigation, settings, cta, page, childPages] = await Promise.all([
    client.getByType("nav_links"),
    client.getByType("settings"),
    client.getByType("fragment_cta_footer", {
      fetchLinks,
    }),
    client.getByUID("offsite_index_page", "offsite", {
      fetchLinks,
    }),
    client.getByType("offsite_page"),
  ]);

  return {
    props: {
      navigation,
      settings,
      cta,
      page,
      childPages,
    },
  };
}
