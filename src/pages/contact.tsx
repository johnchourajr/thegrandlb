// import SendSMS from "@/components/SendSMS";
import Layout from "@components/Layout";

import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import { createClient } from "../../prismicio";
import { components } from "../../slices/";

import dynamic from "next/dynamic";

const DynamicSliceZone = dynamic(() =>
  import("@prismicio/react").then((mod) => mod.SliceZone)
);

const Page = ({ navigation, settings, page }: any) => {
  return (
    <Layout page={page} navigation={navigation} settings={settings} hidePageUid>
      <DynamicSliceZone slices={page.data.slices} components={components} />
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }: any) {
  const client = createClient({ previewData });
  const extra = await getExtra({ previewData });

  const [page] = await Promise.all([
    client.getByUID("page", "contact", {
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
