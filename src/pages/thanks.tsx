// import SendSMS from "@/components/SendSMS";
import Layout from "@components/Layout";

import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import Head from "next/head";
import { createClient } from "../../prismicio";

const Page = ({ page, settings, navigation }: any) => {
  return (
    <Layout
      page={page}
      settings={settings}
      className={"!min-h-[0vh]"}
      wrapperClassName={"!min-h-[0vh]"}
      hidePageUid
    >
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }: any) {
  const client = createClient({ previewData });
  const extra = await getExtra({ previewData });

  const [page] = await Promise.all([
    client.getByUID("inquire_page", "inquire", {
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
