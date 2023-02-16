import Link from "@components/Link";

import { getPrismicMenus } from "@/services/get-prismic-menus";

const Page = ({ menu }: any) => {
  return (
    <div>
      <div className={"flex gap-1"}>
        <Link href={"/"} className={"underline"}>
          Home
        </Link>
        /
        <Link href={"/menus"} className={"underline"}>
          Menus
        </Link>
        /<h1>{menu.data.page_title}</h1>
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
  const menus = result.filter((menu) => {
    return menu.tags.includes("The Grand");
  });

  const paths = menus.map((menu) => {
    return {
      params: {
        uid: menu.uid,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
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
  const menu = await res();

  return {
    props: {
      menu,
    },
  };
}

export default Page;
