import { SliceZone } from "@prismicio/react";
import Link from "@components/Link";

import { createClient } from "../../../prismicio";
import { components } from "../../../slices";

const Page = ({ page }: any) => {
  return <></>;
};

export default Page;

export async function getStaticProps({ params, previewData }: any) {
  const client = createClient({ previewData });

  const [navigation, page] = await Promise.all([
    client.getByType("nav_links"),
    client.getByUID("event_page", params.uid),
  ]);

  return {
    props: {
      navigation,
      page,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const pages = await client.getAllByType("event_page");

  return {
    paths: pages.map((page) => ({
      params: { uid: page.uid?.toString() },
    })),
    fallback: false,
  };
}
