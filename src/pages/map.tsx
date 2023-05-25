// import SendSMS from "@/components/SendSMS";
import Layout from "@components/Layout";
import { SliceZone } from "@prismicio/react";

import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import { createClient } from "../../prismicio";
import { components } from "../../slices";

const Page = ({ navigation, settings, cta, page }: any) => {
  // console.log({ navigation, settings, cta });

  return (
    <Layout page={page}>
      <></>
      <SliceZone slices={page.data.slices} components={components} />
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }: any) {
  const client = createClient({ previewData });
  const extra = await getExtra({ previewData });

  const [page] = await Promise.all([
    client.getByUID("page", "map", {
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
