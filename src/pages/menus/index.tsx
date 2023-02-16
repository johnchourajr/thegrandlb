import Link from "@components/Link";
import * as prismic from "@prismicio/client";

import { getPrismicMenus } from "../../services/get-prismic-menus";

const Page = ({ menus }: any) => {
  console.log({ menus });
  return (
    <div>
      <div className={"flex gap-1"}>
        <Link href={"/"} className={"underline"}>
          Home
        </Link>
        /
        <Link href={"/menus"} className={""}>
          Menus
        </Link>
      </div>
      <ul>
        {menus.map((menu) => (
          <li key={menu.id}>
            <a href={`/menus/${menu.uid}`}>{menu.data.page_title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;

export async function getStaticProps() {
  // use client to fetch menus
  const res = async () => {
    const response = getPrismicMenus.getAllByType("menu_collection");

    return response;
  };
  const result = await res();
  // filter array to only include items with a tag of "The Grand"
  const menus = result.filter((menu) => {
    return menu.tags.includes("The Grand");
  });

  return {
    props: {
      menus,
    },
  };
}
