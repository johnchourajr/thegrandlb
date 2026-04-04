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
    title: "Contact",
    description:
      "Get in touch with The Grand LB. Phone, address and contact form for venue inquiries and bookings.",
  };
}
