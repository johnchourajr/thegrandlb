import Layout from "@components/Layout";
import { getExtra } from "@/services/get-extra";

export const revalidate = false;

export default async function InquirePage() {
  const { settings, navigation } = await getExtra({});

  return (
    <Layout
      page={{ uid: "inquire", data: {} }}
      settings={settings}
      navigation={navigation}
      className={"!min-h-[0vh]"}
      wrapperClassName={"!min-h-[0vh]"}
    />
  );
}

export async function generateMetadata() {
  return {
    title: {
      absolute: "Tour or Proposal | The Grand Long Beach",
    },
    description:
      "Schedule a site tour or request a proposal from our planners. Weddings, corporate meetings, quinceañeras, and private events at The Grand Long Beach—40,000 sq ft, in-house catering, 20 min from LAX.",
    alternates: { canonical: "/inquire" },
  };
}
