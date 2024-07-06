import GridBase from "@/components/grid-index/GridBase";
import { getTourIndexLayout } from "@/components/grid-index/utils";
import HeroCategoryPage from "@/components/HeroCategoryPage";
import Layout from "@/components/Layout";
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import { createClient } from "../../../prismicio";
import { components } from "../../../slices/";

import {
  DynamicCtaFooter,
  DynamicTileFooter,
} from "@/components/DynamicExports";
import dynamic from "next/dynamic";

const DynamicSliceZone = dynamic(() =>
  import("@prismicio/react").then((mod) => mod.SliceZone)
);

const Page = ({ page, cta, settings, navigation, footer_cards }: any) => {
  const {
    data: { slices, title, gallery, video_media, media, ...pageRest },
  } = page;

  const { icon_media, headline, body, spaces } = pageRest;

  return (
    <Layout page={page} settings={settings} navigation={navigation} hidePageUid>
      <HeroCategoryPage
        headline={title}
        gallery={gallery}
        video_media={video_media}
        media={media}
        icon_media={icon_media}
        subhead={headline}
        body={body}
      />
      <GridBase
        sectionId="tour-index"
        uid={page.uid}
        items={spaces}
        layoutLoader={getTourIndexLayout}
      />
      <DynamicSliceZone slices={slices} components={components} />
      <DynamicCtaFooter data={cta} />
      <DynamicTileFooter uid={page.uid} footer_cards={footer_cards} />
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }: any) {
  const client = createClient({ previewData });
  const extra = await getExtra({ previewData });

  const [page, childPages] = await Promise.all([
    client.getByUID("tour_index_page", "tour", {
      fetchLinks,
    }),
    client.getByType("tour_page"),
  ]);

  return {
    props: {
      page,
      childPages,
      ...extra,
    },
  };
}
