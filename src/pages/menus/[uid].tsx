import { SliceZone } from "@prismicio/react";

import { getPrismicMenus } from "@/services/get-prismic-menus";
import fetchLinks from "@/utils/fetchLinks";
import Layout from "@components/Layout";
import { createClient } from "../../../prismicio";
import { components } from "../../../slices";

const Page = ({ navigation, settings, cta, page, source }: any) => {
  console.log({ source });

  return (
    <Layout page={source}>
      <h1>{page.data.page_title}</h1>
      <></>
      <SliceZone slices={page.data.slices} components={components} />
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }: any) {
  const client = createClient({ previewData });

  const res = async () => {
    const response = getPrismicMenus.getByUID("menu_collection", params.uid, {
      fetchLinks: [
        "menu.page_title",
        "menu.page_description",
        "menu.page_disclaimer",
        "menu.body",
      ],
    });

    return response;
  };
  const source = await res();

  const [navigation, settings, cta, page] = await Promise.all([
    client.getByType("nav_links"),
    client.getByType("settings"),
    client.getByType("fragment_cta_footer"),
    client.getByUID("menu_page", params.uid, {
      fetchLinks,
    }),
  ]);

  return {
    props: {
      navigation,
      settings,
      cta,
      page,
      source,
    },
  };
}

export async function getStaticPaths() {
  const res = async () => {
    const response = getPrismicMenus.getAllByType("menu_collection");

    return response;
  };
  const result = await res();
  // filter array to only include items with a tag of "The Grand"
  const menus = result.filter((page) => {
    return page.tags.includes("The Grand");
  });

  const paths = menus.map((page) => {
    return {
      params: {
        uid: page.uid,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
