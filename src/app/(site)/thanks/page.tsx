/**
 * Services
 */
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import { createClient } from "../../../../prismicio";

/**
 * Component(s)
 */
import Layout from "@components/Layout";

/**
 * @name ThanksPage
 */
export default async function ThanksPage() {
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
    title: "Thank You - The Grand LB",
    description: "Thank you for your inquiry",
    robots: "noindex",
  };
}
