import {
  DynamicCtaFooter,
  DynamicSliceZone,
  DynamicTileFooter,
} from "@/components/DynamicExports";
import Layout from "@components/Layout";
import { getExtra } from "@/services/get-extra";
import { notFound } from "next/navigation";
import { offsitePages, offsitePageUids } from "./content";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

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
      <DynamicSliceZone slices={page.data.slices} />
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
  // TODO: Cache Components adoption. offsitePages is empty, so this route has no
  // real uids and every request 404s. Cache Components rejects an empty
  // generateStaticParams, so this yields one param that falls through to
  // notFound() — same behavior as before. Revisit: either populate
  // offsitePages or delete this route.
  if (offsitePageUids.length === 0) return [{ uid: "__placeholder__" }];
  return offsitePageUids.map((uid) => ({ uid }));
}
