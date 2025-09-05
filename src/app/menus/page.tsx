import HeroCategoryPage from "@/components/HeroCategoryPage";
import Layout from "@/components/Layout";
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import { createClient } from "../../../prismicio";
import { DynamicCtaFooter, DynamicSliceZone } from "@/components/DynamicExports";

/**
 * Types
 */

export default async function Page() {
  const client = createClient();
  const extra = await getExtra({});

  const [page] = await Promise.all([
    client.getByUID("page", "menus", {
      fetchLinks,
    }),
  ]);

  const { settings, navigation, cta } = extra;
  const {
    data: { slices, title, gallery, video_media, media },
  } = page;

  return (
    <Layout page={page} settings={settings} navigation={navigation} hidePageUid>
      <HeroCategoryPage
        headline={title}
        gallery={gallery}
        video_media={video_media}
        media={media}
      />
      <DynamicSliceZone slices={page.data.slices} />
      <DynamicCtaFooter data={cta} />
    </Layout>
  );
}

export async function generateMetadata() {
  return {
    title: "Menus - The Grand LB",
    description: "Explore our exquisite menu offerings at The Grand LB",
  };
}
