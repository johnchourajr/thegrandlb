import Head from "next/head";

/**
 * Services
 */
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import { createClient } from "../../prismicio";

/**
 * Component(s)
 */
import Layout from "@components/Layout";

/**
 * @name ThanksPage
 */
const ThanksPage = ({ page, settings }: any) => {
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

export default ThanksPage;

export async function getStaticProps({ previewData }: any) {
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
