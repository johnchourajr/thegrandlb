import Link from "@components/Link";

import { getPrismicMenus } from "@/services/get-prismic-menus";
import { createClient } from "../../../prismicio";

const Page = ({ page }: any) => {
  return (
    <div>
      <div className={"flex gap-1"}>
        <h1>{page.data.page_title}</h1>
      </div>
    </div>
  );
};

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
  const page = await res();

  const [navigation] = await Promise.all([client.getByType("nav_links")]);

  return {
    props: {
      navigation,
      page,
    },
  };
}
