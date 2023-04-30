// import SendSMS from "@/components/SendSMS";
import { SliceZone } from "@prismicio/react";

import fetchLinks from "@/utils/fetchLinks";
import Layout from "@components/Layout";
import { createClient } from "../../prismicio";
import { components } from "../../slices";

const Page = ({ navigation, settings, cta, page }: any) => {
  // console.log({ navigation, settings, cta });

  return (
    <Layout page={page} hidePageUid>
      <></>
      {/* <SendSMS /> */}
      <SliceZone slices={page.data.slices} components={components} />
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }: any) {
  const client = createClient({ previewData });

  const [navigation, settings, cta, page] = await Promise.all([
    client.getByType("nav_links"),
    client.getByType("settings"),
    client.getByType("fragment_cta_footer"),
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
