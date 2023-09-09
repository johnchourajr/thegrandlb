import CtaFooter from "@/components/CtaFooter";
import SliceData from "@/components/dev/SliceData";
import GridBase from "@/components/grid-index/GridBase";
import { getEventIndexLayout } from "@/components/grid-index/utils";
import HeroCategoryPage from "@/components/HeroCategoryPage";
import Layout from "@/components/Layout";
import TileFooter from "@/components/TileFooter";
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import { createClient } from "../../../prismicio";
import { components } from "../../../slices/";

import dynamic from "next/dynamic";

const DynamicSliceZone = dynamic(() =>
  import("@prismicio/react").then((mod) => mod.SliceZone)
);

const Page = ({ page, settings, navigation, cta, footer_cards }: any) => {
  // if (!page || !cta || !footer_cards) return null;

  const {
    data: {
      slices = [],
      title = "",
      gallery = [],
      video_media = "",
      media = "",
      ...pageRest
    } = {},
  } = page || {};

  const { icon_media, headline, body, event_pages } = pageRest;
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
      <SliceData slice={pageRest} hidden />
      <GridBase
        uid={page?.uid}
        sectionId="event-index"
        items={event_pages}
        layoutLoader={getEventIndexLayout}
      />
      <DynamicSliceZone slices={page?.data.slices} components={components} />
      <CtaFooter data={cta} />
      <TileFooter uid={page?.uid} footer_cards={footer_cards} />
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }: any) {
  const client = createClient({ previewData });
  const extra = await getExtra({ previewData });

  const [page, childPages] = await Promise.all([
    client.getByUID("event_index_page", "events", {
      fetchLinks,
    }),
    client.getByType("event_page"),
  ]);

  return {
    props: {
      page,
      childPages,
      ...extra,
    },
  };
}
