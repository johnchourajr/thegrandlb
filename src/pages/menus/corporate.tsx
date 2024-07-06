// import { SliceZone } from "@prismicio/react";

import {
  DynamicCtaFooter,
  DynamicMenuPageContent,
} from "@/components/DynamicExports";
import Layout from "@/components/Layout";
import { getPrismicMenus } from "@/pages/api/get-prismic-menus";
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import useSWR from "swr";
import { createClient } from "../../../prismicio";

const Page = ({ cta, page, settings, navigation }: any) => {
  const { data: source, error } = useSWR(
    `menu_collection/${page.data.menu_api_uid}`,
    () =>
      getPrismicMenus.getByUID(
        "menu_collection" as any,
        page.data.menu_api_uid,
        {
          fetchLinks: [
            "menu.page_title",
            "menu.page_description",
            "menu.page_disclaimer",
            "menu.group",
            "menu.body",
          ],
        }
      )
  );

  if (error) {
    // Handle error state
    return <></>;
  }

  if (!source) {
    // Handle loading state
    return <></>;
  }

  return (
    <Layout page={source} settings={settings} navigation={navigation}>
      <DynamicMenuPageContent page={page} source={source} />
      <DynamicCtaFooter data={cta} />
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }: any) {
  const client = createClient({ previewData });
  const extra = await getExtra({ previewData });

  const [page] = await Promise.all([
    client.getByUID("menu_page", "corporate", {
      fetchLinks,
    }),
  ]);

  return {
    props: {
      page,
      ...extra,
    },
    revalidate: 60,
  };
}
