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
    title: "Inquire",
    description:
      "Request a proposal or schedule a tour. Inquire about weddings, corporate events and private celebrations.",
  };
}
