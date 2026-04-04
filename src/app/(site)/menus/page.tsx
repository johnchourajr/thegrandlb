import { DynamicCtaFooter, DynamicSliceZone } from "@/components/DynamicExports";
import HeroCategoryPage from "@/components/HeroCategoryPage";
import Layout from "@/components/Layout";
import { getExtra } from "@/services/get-extra";
import { menuIndexPage } from "./content";

export const revalidate = false;

export default async function Page() {
  const { settings, navigation, cta } = await getExtra({});
  const { slices, title, gallery, media, video_url } = menuIndexPage.data;

  return (
    <Layout page={menuIndexPage} settings={settings} navigation={navigation} hidePageUid>
      <HeroCategoryPage
        headline={title}
        gallery={gallery}
        video_url={video_url}
        media={media}
      />
      <DynamicSliceZone slices={slices} />
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
