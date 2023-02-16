import { SliceZone } from "@prismicio/react";
import Link from "@components/Link";

import { createClient } from "../../../prismicio";
import { components } from "../../../slices";

const Page = ({ page }: any) => {
  return (
    <>
      <div>
        <div className={"flex gap-1"}>
          <Link href={"/"} className={"underline"}>
            Home
          </Link>
          /
          <Link href={"/events"} className={"underline"}>
            Events
          </Link>
          /<h1>{page.data.title}</h1>
        </div>
      </div>
      <SliceZone slices={page.data.slices} components={components} />
    </>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }: any) {
  const client = createClient({ previewData });

  const page = await client.getByUID("event_page", params.uid);
  // const navigation = await client.getSingle("navigation");
  // const settings = await client.getSingle("settings");

  return {
    props: {
      page,
      // navigation,
      // settings,
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
