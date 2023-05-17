import { SliceZone } from "@prismicio/react";

import CtaFooter from "@/components/CtaFooter";
import SliceData from "@/components/dev/SliceData";
import GridBase from "@/components/grid-index/GridBase";
import { getEventIndexLayout } from "@/components/grid-index/utils";
import HeroCategoryPage from "@/components/HeroCategoryPage";
import Layout from "@/components/Layout";
import fetchLinks from "@/utils/fetchLinks";
import { createClient } from "../../../prismicio";
import { components } from "../../../slices/";

const Page = ({ navigation, settings, cta, page, childPages }: any) => {
  const {
    data: { slices, title, gallery, video_media, media, ...pageRest },
  } = page;

  const { icon_media, headline, body, event_pages } = pageRest;
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
        sectionId="event-index"
        items={event_pages}
        layoutLoader={getEventIndexLayout}
      />
      <SliceZone slices={page.data.slices} components={components} />
      <CtaFooter data={cta} />
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }: any) {
  const client = createClient({ previewData });

  const [navigation, settings, cta, page, childPages] = await Promise.all([
    client.getByType("nav_links"),
    client.getByType("settings"),
    client.getByType("fragment_cta_footer", {
      fetchLinks,
    }),
    client.getByUID("event_index_page", "events", {
      fetchLinks,
    }),
    client.getByType("event_page"),
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
