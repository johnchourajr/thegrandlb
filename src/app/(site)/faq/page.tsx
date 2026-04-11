import { getExtra } from "@/services/get-extra";
import Layout from "@components/Layout";
import {
  DynamicCtaFooter,
  DynamicHeroDetailPage,
  DynamicSliceZone,
} from "@/components/DynamicExports";
import JsonLdFaq from "@/components/JsonLdFaq";
import { faqPage } from "./content";

export const revalidate = false;

export default async function Page() {
  const { settings, navigation, cta } = await getExtra({});
  const { slices, title, headline, caption } = faqPage.data;

  return (
    <Layout page={faqPage} settings={settings} navigation={navigation}>
      <JsonLdFaq />
      <DynamicHeroDetailPage
        uid={faqPage.uid}
        title={title}
        headline={headline}
        caption={caption}
        media={undefined}
        video_url={undefined}
      />
      <DynamicSliceZone slices={slices} />
      <DynamicCtaFooter data={cta} />
    </Layout>
  );
}

export async function generateMetadata() {
  return {
    title: {
      absolute:
        faqPage.data.meta_title ||
        "FAQ | The Grand LB",
    },
    description:
      faqPage.data.meta_description ||
      "Frequently asked questions about The Grand Long Beach event venue.",
    alternates: { canonical: "/faq" },
  };
}
