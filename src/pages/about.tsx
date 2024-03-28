import dynamic from "next/dynamic";

/**
 * Components
 */
import CtaFooter from "@/components/CtaFooter";
import SliceData from "@/components/dev/SliceData";
import TileFooter from "@/components/TileFooter";
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
 * @name AboutPage
 */
const AboutPage = ({ page, settings, navigation, cta, footer_cards }: any) => {
  return (
    <Layout page={page} settings={settings} navigation={navigation}>
      <></>
      <DynamicSliceZone slices={page.data.slices} components={components} />
      <SliceData slice={page} hidden />
      <CtaFooter data={cta} />
      <TileFooter uid={page.uid} footer_cards={footer_cards} />
    </Layout>
  );
};

export default AboutPage;

export async function getStaticProps({ previewData }: any) {
  const client = createClient({ previewData });
  const extra = await getExtra({ previewData });

  const [page] = await Promise.all([
    client.getByUID("page", "about", {
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
