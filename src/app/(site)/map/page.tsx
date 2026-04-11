import Layout from "@components/Layout";
import { getExtra } from "@/services/get-extra";
import { generalPages } from "../[uid]/content";

export const revalidate = false;

export default async function MapPage() {
  const { settings, navigation } = await getExtra({});
  const page = generalPages["map"];

  return (
    <Layout
      page={page}
      settings={settings}
      navigation={navigation}
      className={"!min-h-[0vh]"}
      wrapperClassName={"!min-h-[0vh]"}
    />
  );
}

export async function generateMetadata() {
  return {
    title: "Directions & Map | The Grand LB in Long Beach, CA",
    description:
      "Directions and map for The Grand LB. 4101 E. Willow St, Long Beach, CA 90815. 20 minutes from LAX.",
    alternates: { canonical: "/map" },
  };
}
