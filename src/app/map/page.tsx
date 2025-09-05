/**
 * Component(s)
 */
import Layout from "@components/Layout";

/**
 * Services
 */
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import { createClient } from "../../../prismicio";

/**
 * Types
 */
import type { GetStaticPropsParams, PageProps } from "@/types/page-props";

export default async function MapPage() {
  const client = createClient();
  const extra = await getExtra({});

  const [page] = await Promise.all([
    client.getByUID("page", "map", {
      fetchLinks,
    }),
  ]);

  const { settings } = extra;

  return (
    <Layout
      page={page}
      settings={settings}
      className={"!min-h-[0vh]"}
      wrapperClassName={"!min-h-[0vh]"}
    />
  );
}

export async function generateMetadata() {
  return {
    title: "Map - The Grand LB",
    description: "Find The Grand LB location",
  };
}

