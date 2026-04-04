import Layout from "@components/Layout";
import { notFound } from "next/navigation";
import { getExtra } from "@/services/get-extra";
import { DynamicSliceZone } from "@/components/DynamicExports";
import { generalPages, generalPageUids } from "./content";

export const revalidate = false;

export default async function Page({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;
  const page = generalPages[uid];
  if (!page) notFound();

  const { settings, navigation } = await getExtra({});

  return (
    <Layout page={page} settings={settings} navigation={navigation}>
      <DynamicSliceZone slices={page.data?.slices} />
    </Layout>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;
  const page = generalPages[uid];
  if (!page) {
    return { title: "The Grand LB", description: "The Grand LB - Luxury Event Venue" };
  }
  return {
    title: page.data.meta_title || `The Grand LB - ${page.data.title}`,
    description: page.data.meta_description || "The Grand LB - Luxury Event Venue",
  };
}

export async function generateStaticParams() {
  return generalPageUids.map((uid) => ({ uid }));
}
