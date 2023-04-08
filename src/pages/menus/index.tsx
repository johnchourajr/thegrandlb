import Link from "@components/Link";
import * as prismic from "@prismicio/client";
import { createClient } from "../../../prismicio";

import { getPrismicMenus } from "../../services/get-prismic-menus";

const Page = ({ childPages }: any) => {
  return (
    <div>
      <ul>
        {childPages.map((menu: any) => (
          <li key={menu.id}>
            <a href={`/menus/${menu.uid}`}>{menu.data.page_title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }: any) {
  const client = createClient({ previewData });

  // use client to fetch menus
  const res = async () => {
    const response = getPrismicMenus.getAllByType("menu_collection");

    return response;
  };
  const result = await res();
  // filter array to only include items with a tag of "The Grand"
  const childPages = result.filter((menu) => {
    return menu.tags.includes("The Grand");
  });

  const [navigation, page] = await Promise.all([
    client.getByType("nav_links"),
    client.getByUID("event_index_page", "events"),
  ]);

  return {
    props: {
      navigation,
      page,
      childPages,
    },
  };
}
