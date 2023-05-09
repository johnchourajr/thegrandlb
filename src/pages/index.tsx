// import SendSMS from "@/components/SendSMS";
import { SliceZone } from "@prismicio/react";

import CtaFooter from "@/components/CtaFooter";
import SliceData from "@/components/dev/SliceData";
import fetchLinks from "@/utils/fetchLinks";
import Layout from "@components/Layout";
import { createClient } from "../../prismicio";
import { components } from "../../slices";

const Page = ({ navigation, settings, cta, page }: any) => {
  // console.log({ navigation, settings, cta });
  const {
    data: { slices, ...pageRest },
  } = page;

  return (
    <Layout page={page} hidePageUid>
      <SliceData slice={pageRest} hidden />
      <SliceZone slices={slices} components={components} />
      <CtaFooter data={cta} />
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }: any) {
  const client = createClient({ previewData });

  const [navigation, settings, cta, page] = await Promise.all([
    client.getByType("nav_links"),
    client.getByType("settings"),
    client.getByType("fragment_cta_footer", {
      fetchLinks,
    }),
    client.getByUID("page", "home", {
      fetchLinks,
    }),
  ]);

  return {
    props: {
      navigation,
      settings,
      cta,
      page,
    },
  };
}
