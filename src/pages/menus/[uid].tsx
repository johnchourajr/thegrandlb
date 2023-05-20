// import { SliceZone } from "@prismicio/react";

import { GridSection } from "@/components/GridSection";
import Headline from "@/components/Headline";
import Layout from "@/components/Layout";
import { MenuSection } from "@/components/menu";
import MenuSectionNav from "@/components/menu/menu-section-nav";
import { getPrismicMenus } from "@/pages/api/get-prismic-menus";
import fetchLinks from "@/utils/fetchLinks";
import { m } from "framer-motion";
import useSWR from "swr";
import { createClient } from "../../../prismicio";

const MenuPageContent = ({ page, source }: any) => {
  const { path, page_title, page_description, page_disclaimer } = source.data;

  return (
    <GridSection
      id={`${page.uid}-grid-section`}
      layoutId={`${page.uid}-grid-section`}
      className="grid-section"
      topSpacer={"Small"}
      bottomSpacer={"None"}
      overflowHidden={false}
    >
      <m.div
        layoutId={page.uid}
        className={
          "col-span-10 col-start-2 flex flex-col items-center justify-between"
        }
      >
        {page_title && (
          <Headline className={"!whitespace-nowrap text-center"} animateOnce>
            {page_title}
          </Headline>
        )}
      </m.div>
      <div
        className={
          "margin-top-md padding-bottom-md col-span-10 col-start-2 border-t-2 border-white"
        }
      />
      <MenuSectionNav uid={page.uid} group={source.data.group} />
      <MenuSection uid={page.uid} group={source.data.group} />
    </GridSection>
  );
};

const Page = ({ navigation, settings, cta, page }: any) => {
  const { data: source, error } = useSWR(`menu_collection/${page.uid}`, () =>
    getPrismicMenus.getByUID("menu_collection" as any, page.uid, {
      fetchLinks: [
        "menu.page_title",
        "menu.page_description",
        "menu.page_disclaimer",
        "menu.group",
        "menu.body",
      ],
    })
  );

  if (error) {
    // Handle error state
    return <></>;
  }

  if (!source) {
    // Handle loading state
    return <></>;
  }

  console.log({ source });

  return (
    <>
      <Layout page={source} hidePageUid>
        <MenuPageContent page={page} source={source} />
      </Layout>
    </>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }: any) {
  const client = createClient({ previewData });

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
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const res = async () => {
    const response = getPrismicMenus.getAllByType("menu_collection" as any);

    return response;
  };
  const result = await res();
  // filter array to only include items with a tag of "The Grand"
  const menus = result.filter((page) => {
    return page.tags.includes("The Grand");
  });

  const updateUID = (uid: any) => {
    switch (uid) {
      case "weddings-the-grand":
        return "weddings";
      default:
        return uid;
    }
  };

  const paths = menus.map((page) => {
    return {
      params: {
        uid: updateUID(page.uid),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
