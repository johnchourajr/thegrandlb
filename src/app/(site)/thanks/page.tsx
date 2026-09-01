import Layout from "@components/Layout";
import { getExtra } from "@/services/get-extra";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default async function ThanksPage() {
  const { settings, navigation } = await getExtra({});

  return (
    <Layout
      page={{ uid: "thanks", data: {} }}
      settings={settings}
      navigation={navigation}
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
