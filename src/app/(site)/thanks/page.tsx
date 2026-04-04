import Layout from "@components/Layout";
import { getExtra } from "@/services/get-extra";

export const revalidate = false;

export default async function ThanksPage() {
  const { settings, navigation } = await getExtra({});

  return (
    <Layout
      page={{ uid: "thanks", data: {} } as any}
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
