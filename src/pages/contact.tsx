import dynamic from "next/dynamic";

/**
 * Components
 */
import Layout from "@components/Layout";

/**
 * Services
 */
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import { createClient } from "../../prismicio";

/**
 * Slices
 */
import { components } from "../../slices/";
const DynamicSliceZone = dynamic(() =>
  import("@prismicio/react").then((mod) => mod.SliceZone)
);

/**
 * @name ContactPage
 */
const ContactPage = ({ navigation, settings, page }: any) => {
  return (
    <Layout page={page} navigation={navigation} settings={settings}>
      <DynamicSliceZone slices={page.data.slices} components={components} />
    </Layout>
  );
};

export default ContactPage;

export async function getStaticProps({ previewData }: any) {
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
