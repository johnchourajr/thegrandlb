import { SliceZone } from "@prismicio/react";

import CtaFooter from "@/components/CtaFooter";
import Layout from "@/components/Layout";
import { getPrismicMenus } from "@/services/get-prismic-menus";
import fetchLinks from "@/utils/fetchLinks";
import { createClient } from "../../../prismicio";
import { components } from "../../../slices/";

const Page = ({ navigation, settings, cta, page, childPages }: any) => {
  const updateUID = (uid: any) => {
    switch (uid) {
      case "weddings-the-grand":
        return "weddings";
      default:
        return uid;
    }
  };

  return (
    <Layout page={page}>
      <div>
        <ul>
          {childPages.map((menu: any) => (
            <li key={menu.id}>
              <a href={`/menus/${updateUID(menu.uid)}`}>
                {menu.data.page_title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <SliceZone slices={page.data.slices} components={components} />
      <CtaFooter data={cta} />
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }: any) {
  const client = createClient({ previewData });

  // use client to fetch menus
  const res = async () => {
    const response = getPrismicMenus.getAllByType("menu_collection" as any);

    return response;
  };
  const result = await res();
  // filter array to only include items with a tag of "The Grand"
  const childPages = result.filter((menu) => {
    return menu.tags.includes("The Grand");
  });

  const [navigation, settings, cta, page] = await Promise.all([
    client.getByType("nav_links"),
    client.getByType("settings"),
    client.getByType("fragment_cta_footer", {
      fetchLinks,
    }),
    client.getByUID("page", "menus", {
      fetchLinks,
    }),
  ]);

  return {
    props: {
      navigation,
      settings,
      cta,
      page,
      childPages,
    },
  };
}
