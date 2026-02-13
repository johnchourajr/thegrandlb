/**
 * Component(s)
 */
import Layout from "@components/Layout";

/**
 * Services
 */
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import { createClient } from "../../../../prismicio";

/**
 * Types
 */

export default async function InquirePage() {
  const client = createClient();
  const extra = await getExtra({});

  const [page] = await Promise.all([
    client.getByUID("inquire_page", "inquire", {
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
    title: "Inquire - The Grand LB",
    description: "Inquire about hosting your event at The Grand LB",
  };
}
