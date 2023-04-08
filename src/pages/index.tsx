// import SendSMS from "@/components/SendSMS";
import Link from "@components/Link";
import Layout from "@components/Layout";
import React from "react";
import { SliceZone } from "@prismicio/react";

import { createClient } from "../../prismicio";

const Page = ({ page }: any) => {
  return (
    <Layout>
      <></>
      {/* <SendSMS /> */}
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }: any) {
  const client = createClient({ previewData });

  const [navigation, page] = await Promise.all([
    client.getByType("nav_links"),
    client.getByUID("page", "home"),
  ]);

  return {
    props: {
      navigation,
      page,
    },
  };
}
