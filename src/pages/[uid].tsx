// import SendSMS from "@/components/SendSMS";
import Layout from "@components/Layout";
import { SliceZone } from "@prismicio/react";

import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import { createClient } from "../../prismicio";
import { components } from "../../slices";

const Page = ({ page, settings, navigation }: any) => {
  return (
    <Layout page={page} settings={settings} navigation={navigation} hidePageUid>
      <SliceZone slices={page?.data?.slices} components={components} />
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }: any) {
  const client = createClient({ previewData });
  const extra = await getExtra({ previewData });

  // wrap in a try catch
  try {
    const [page] = await Promise.all([
      client.getByUID("page", params.uid, {
        fetchLinks,
      }),
    ]);

    return {
      props: {
        page,
        ...extra,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        page: null,
        ...extra,
      },
    };
  }
}

export async function getStaticPaths() {
  const client = createClient();

  const pages = await client.getAllByTag("general_page");

  return {
    paths: pages.map((page) => ({
      params: { uid: page.uid?.toString() },
    })),
    fallback: true,
  };
}
