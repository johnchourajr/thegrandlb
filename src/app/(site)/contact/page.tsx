import Layout from "@components/Layout";
import { getExtra } from "@/services/get-extra";
import { DynamicSliceZone } from "@/components/DynamicExports";
import { contactPage } from "./content";

export const revalidate = false;

export default async function ContactPage() {
  const { settings, navigation } = await getExtra({});

  return (
    <Layout page={contactPage} navigation={navigation} settings={settings}>
      <DynamicSliceZone slices={contactPage.data.slices} />
    </Layout>
  );
}

export async function generateMetadata() {
  return {
    title: "Contact The Grand LB | Event Venue in Long Beach, CA",
    description:
      "Contact The Grand Long Beach at (562) 426-0555 or visit us at 4101 E. Willow St., Long Beach, CA 90815. Inquire about weddings, corporate events, and private celebrations.",
    alternates: { canonical: "/contact" },
  };
}
