// import SendSMS from "@/components/SendSMS";

import CtaFooter from "@/components/CtaFooter";
import SliceData from "@/components/dev/SliceData";
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import Layout from "@components/Layout";
import { createClient } from "../../prismicio";
import { components } from "../../slices";

import dynamic from "next/dynamic";

const DynamicSliceZone = dynamic(() =>
  import("@prismicio/react").then((mod) => mod.SliceZone)
);

const Page = ({ cta, page, settings, navigation }: any) => {
  // if (!page || !cta) return null;
  const {
    data: { slices, ...pageRest },
  } = page;

  return (
    <Layout page={page} settings={settings} navigation={navigation} hidePageUid>
      <SliceData slice={pageRest} hidden />
      <DynamicSliceZone slices={slices} components={components} />
      <CtaFooter data={cta} />
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }: any) {
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
