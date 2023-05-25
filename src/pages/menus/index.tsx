import { SliceZone } from "@prismicio/react";

import CtaFooter from "@/components/CtaFooter";
import HeroCategoryPage from "@/components/HeroCategoryPage";
import Layout from "@/components/Layout";
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import { createClient } from "../../../prismicio";
import { components } from "../../../slices/";

const Page = ({ navigation, settings, cta, page }: any) => {
  const {
    data: { slices, title, gallery, video_media, media, ...pageRest },
  } = page;

  console.log("page", page);

  const updateUID = (uid: any) => {
    switch (uid) {
      case "weddings-the-grand":
        return "weddings";
      default:
        return uid;
    }
  };

  return (
    <Layout page={page} hidePageUid>
      <HeroCategoryPage
        headline={title}
        gallery={gallery}
        video_media={video_media}
        media={media}
      />
      <SliceZone slices={page.data.slices} components={components} />
      <CtaFooter data={cta} />
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
