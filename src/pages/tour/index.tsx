import { SliceZone } from "@prismicio/react";

import CtaFooter from "@/components/CtaFooter";
import SliceData from "@/components/dev/SliceData";
import GridBase from "@/components/grid-index/GridBase";
import { getTourIndexLayout } from "@/components/grid-index/utils";
import HeroCategoryPage from "@/components/HeroCategoryPage";
import Layout from "@/components/Layout";
import TileFooter from "@/components/TileFooter";
import fetchLinks from "@/utils/fetchLinks";
import { createClient } from "../../../prismicio";
import { components } from "../../../slices/";

const Page = ({ page, cta, footer_cards }: any) => {
  const {
    data: { slices, title, gallery, video_media, media, ...pageRest },
  } = page;

  const { icon_media, headline, body, spaces } = pageRest;

  return (
    <Layout page={page} hidePageUid>
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
        sectionId="tour-index"
        uid={page.uid}
        items={spaces}
        layoutLoader={getTourIndexLayout}
      />
      <SliceZone slices={slices} components={components} />
      <CtaFooter data={cta} />
      <TileFooter uid={page.uid} footer_cards={footer_cards} />
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }: any) {
  const client = createClient({ previewData });
  const [page, childPages, navigation, settings, cta] = await Promise.all([
    client.getByUID("tour_index_page", "tour", {
      fetchLinks,
    }),
    client.getByType("tour_page"),
    client.getByType("nav_links"),
    client.getByType("settings"),
    client.getByType("fragment_cta_footer", {
      fetchLinks,
    }),
  ]);

  const footer_cards = await Promise.all([
    client.getByUID("fragment_card", "tour-card", {
      fetchLinks,
    }),
    client.getByUID("fragment_card", "events-card", {
      fetchLinks,
    }),
    client.getByUID("fragment_card", "menus-card", {
      fetchLinks,
    }),
  ]);

  return {
    props: {
      page,
      navigation,
      settings,
      cta,
      footer_cards,
    },
  };

  // const [page, childPages] = await Promise.all([
  //   client.getByUID("tour_index_page", "tour", {
  //     fetchLinks,
  //   }),
  //   client.getByType("tour_page"),
  // ]);

  // return {
  //   props: {
  //     page,
  //     childPages,
  //     ...extra,
  //   },
  // };
}
