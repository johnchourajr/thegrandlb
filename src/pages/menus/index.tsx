import HeroCategoryPage from "@/components/HeroCategoryPage";
import Layout from "@/components/Layout";
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import { createClient } from "../../../prismicio";
import { components } from "../../../slices/";

import { DynamicCtaFooter } from "@/components/DynamicExports";
import dynamic from "next/dynamic";

const DynamicSliceZone = dynamic(() =>
  import("@prismicio/react").then((mod) => mod.SliceZone)
);

const Page = ({ cta, page, settings, navigation }: any) => {
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
      <DynamicSliceZone slices={page.data.slices} components={components} />
      <DynamicCtaFooter data={cta} />
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }: any) {
  const client = createClient({ previewData });
  const extra = await getExtra({ previewData });

  const [page] = await Promise.all([
    client.getByUID("page", "menus", {
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
