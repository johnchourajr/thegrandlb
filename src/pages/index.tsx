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
import {
  DynamicCtaFooter,
  DynamicSliceZone,
} from "@/components/DynamicExports";
import { components } from "../../slices";

/**
 * @name Homepage
 */
const Homepage = ({ cta, page, settings, navigation }: any) => {
  const {
    data: { slices },
  } = page;

  return (
    <Layout page={page} settings={settings} navigation={navigation}>
      <DynamicSliceZone slices={slices} components={components} />
      <DynamicCtaFooter data={cta} />
    </Layout>
  );
};

export default Homepage;

export async function getStaticProps({ previewData }: any) {
  const client = createClient({ previewData });
  const extra = await getExtra({ previewData });

  const [page] = await Promise.all([
    client.getByUID("page", "home", {
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
