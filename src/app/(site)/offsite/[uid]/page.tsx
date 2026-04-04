import {
  DynamicCtaFooter,
  DynamicSliceZone,
  DynamicTileFooter,
} from "@/components/DynamicExports";
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import Layout from "@components/Layout";
import { createClient } from "@/prismicio";
import { redirect } from "next/navigation";

export const revalidate = false;

export default async function OffsitePage({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const client = createClient();
  const extra = await getExtra({});

  const { uid } = await params;

  let page;
  try {
    [page] = await Promise.all([
      client.getByUID("offsite_page", uid, {
        fetchLinks,
      }),
    ]);
  } catch (error) {
    console.warn(`[404] /offsite/${uid} — offsite page not found`);
    redirect("/offsite");
  }

  if (!page) {
    console.warn(`[404] /offsite/${uid} — offsite page not found`);
    redirect("/offsite");
  }

  const { cta, settings, navigation, footer_cards } = extra;

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
  const client = createClient();
  const { uid } = await params;

  try {
    const page = await client.getByUID("offsite_page", uid, {
      fetchLinks,
    });

    return {
      title: page.data.meta_title || `The Grand LB - ${page.data.title}`,
      description:
        page.data.meta_description || "The Grand LB - Luxury Event Venue",
    };
  } catch (error) {
    return {
      title: "Offsite - The Grand LB",
      description: "The Grand LB - Luxury Event Venue",
    };
  }
}

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType("offsite_page");

  return pages.map((page) => ({
    uid: page.uid?.toString(),
  }));
}
