import {
  DynamicCtaFooter,
  DynamicSliceZone,
  DynamicTileFooter,
} from "@/components/DynamicExports";
import Layout from "@components/Layout";
import { getExtra } from "@/services/get-extra";
import { notFound } from "next/navigation";
import { offsitePages, offsitePageUids } from "./content";

export const revalidate = false;

export default async function OffsitePage({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;
  const page = offsitePages[uid];
  if (!page) notFound();

  const { cta, settings, navigation, footer_cards } = await getExtra({});

  return (
    <Layout page={page} navigation={navigation} settings={settings}>
      <DynamicSliceZone slices={page.data?.slices} />
      <DynamicCtaFooter data={cta} />
      <DynamicTileFooter uid={page.uid} footer_cards={footer_cards} />
    </Layout>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;
  const page = offsitePages[uid];
  if (!page) {
    return { title: "Offsite - The Grand LB", description: "The Grand LB - Luxury Event Venue" };
  }
  return {
    title: page.data.meta_title || `The Grand LB - ${page.data.title}`,
    description: page.data.meta_description || "The Grand LB - Luxury Event Venue",
  };
}

export async function generateStaticParams() {
  return offsitePageUids.map((uid) => ({ uid }));
}
