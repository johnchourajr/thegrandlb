// import SendSMS from "@/components/SendSMS";
import Layout from "@components/Layout";

import CtaFooter from "@/components/CtaFooter";
import SliceData from "@/components/dev/SliceData";
import TileFooter from "@/components/TileFooter";
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import { createClient } from "../../prismicio";
import { components } from "../../slices/";

import dynamic from "next/dynamic";

const DynamicSliceZone = dynamic(() =>
  import("@prismicio/react").then((mod) => mod.SliceZone)
);

const Page = ({ page, settings, navigation, cta, footer_cards }: any) => {
  return (
    <Layout page={page} settings={settings} navigation={navigation} hidePageUid>
      <></>
      <DynamicSliceZone slices={page.data.slices} components={components} />
      <SliceData slice={page} hidden />
      <CtaFooter data={cta} />
      <TileFooter uid={page.uid} footer_cards={footer_cards} />
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }: any) {
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
