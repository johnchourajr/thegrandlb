import {
  DynamicCtaFooter,
  DynamicSliceZone,
} from "@/components/DynamicExports";
import HeroCategoryPage from "@/components/HeroCategoryPage";
import Layout from "@/components/Layout";
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import { createClient } from "../../../../prismicio";

export default async function Page() {
  const client = createClient();
  const extra = await getExtra({});

  const [page] = await Promise.all([
    client.getByUID("page", "menus", {
      fetchLinks,
    }),
  ]);

  const { settings, navigation, cta } = extra;
  const { data } = page;
  const { slices, title, gallery, media } = data;
  const video_url = (data as { video_url?: string }).video_url;

  return (
    <Layout page={page} settings={settings} navigation={navigation} hidePageUid>
      <HeroCategoryPage
        headline={title}
        gallery={gallery}
        video_url={video_url}
        media={media}
      />
      <DynamicSliceZone slices={page.data.slices} />
      <DynamicCtaFooter data={cta} />
    </Layout>
  );
}

export async function generateMetadata() {
  return {
    title: "Menus",
    description:
      "Catering and banquet menus for weddings, corporate events and private celebrations at The Grand LB.",
  };
}
