/**
 * Component(s)
 */
import Layout from "@components/Layout";

/**
 * Services
 */
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import { createClient } from "@/prismicio";

/**
 * Types
 */

export const revalidate = false;

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
    title: "Inquire",
    description:
      "Request a proposal or schedule a tour. Inquire about weddings, corporate events and private celebrations.",
  };
}
