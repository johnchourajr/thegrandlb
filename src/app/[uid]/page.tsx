import dynamic from "next/dynamic";

/**
 * Components
 */
import Layout from "@components/Layout";

/**
 * Services
 */
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import { createClient } from "../../../prismicio";

/**
 * Slices
 */
import { DynamicSliceZone } from "@/components/DynamicExports";

/**
 * Types
 */

/**
 * @name Page
 */
export default async function Page({ params }: { params: { uid: string } }) {
  const client = createClient();
  const extra = await getExtra({});

  const [page] = await Promise.all([
    client.getByUID("page", params.uid, {
      fetchLinks,
    }),
  ]);

  const { settings, navigation } = extra;

  return (
    <Layout page={page} settings={settings} navigation={navigation}>
      <DynamicSliceZone
        slices={page?.data?.slices as unknown as any}
      />
    </Layout>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { uid: string };
}) {
  const client = createClient();

  try {
    const page = await client.getByUID("page", params.uid, {
      fetchLinks,
    });

    return {
      title: page.data.meta_title || `The Grand LB - ${page.data.title}`,
      description:
        page.data.meta_description || "The Grand LB - Luxury Event Venue",
    };
  } catch (error) {
    return {
      title: "The Grand LB",
      description: "The Grand LB - Luxury Event Venue",
    };
  }
}

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByTag("general_page");

  return pages.map((page) => ({
    uid: page.uid?.toString(),
  }));
}
