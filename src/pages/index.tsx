import dynamic from "next/dynamic";

/**
 * Components
 */
import CtaFooter from "@/components/CtaFooter";
import SliceData from "@/components/dev/SliceData";
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
import { components } from "../../slices";
const DynamicSliceZone = dynamic(() =>
  import("@prismicio/react").then((mod) => mod.SliceZone)
);

/**
 * @name Homepage
 */
const Homepage = ({ cta, page, settings, navigation }: any) => {
  const {
    data: { slices, ...pageRest },
  } = page;

  return (
    <Layout page={page} settings={settings} navigation={navigation}>
      <SliceData slice={pageRest} hidden />
      <DynamicSliceZone slices={slices} components={components} />
      <CtaFooter data={cta} />
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
