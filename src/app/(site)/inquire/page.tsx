import Layout from "@components/Layout";
import { getExtra } from "@/services/get-extra";

export const revalidate = false;

export default async function InquirePage() {
  const { settings, navigation } = await getExtra({});

  return (
    <Layout
      page={{ uid: "inquire", data: {} } as any}
      settings={settings}
      navigation={navigation}
      className={"!min-h-[0vh]"}
      wrapperClassName={"!min-h-[0vh]"}
    />
  );
}

export async function generateMetadata() {
  return {
    title: "Make an Inquiry | Book Your Event at The Grand LB in Long Beach",
    description:
      "Request a proposal or schedule a tour at The Grand Long Beach. Inquire about weddings, quinceañeras, corporate events, and private celebrations in Long Beach, CA.",
  };
}
