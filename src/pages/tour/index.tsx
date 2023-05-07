import { SliceZone } from "@prismicio/react";

import SliceData from "@/components/dev/SliceData";
import Layout from "@/components/Layout";
import fetchLinks from "@/utils/fetchLinks";
import { createClient } from "../../../prismicio";
import { components } from "../../../slices/";

const Page = ({ navigation, settings, cta, page, childPages }: any) => {
  const {
    data: { slices, ...pageRest },
  } = page;

  return (
    <Layout page={page}>
      <></>
      <SliceData slice={pageRest} />
      <SliceZone slices={slices} components={components} />
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }: any) {
  const client = createClient({ previewData });

  const [navigation, settings, cta, page, childPages] = await Promise.all([
    client.getByType("nav_links"),
    client.getByType("settings"),
    client.getByType("fragment_cta_footer"),
    client.getByUID("tour_index_page", "tour", {
      fetchLinks,
    }),
    client.getByType("tour_page"),
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
