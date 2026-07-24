import { getExtra } from "@/services/get-extra";
import Layout from "@components/Layout";
import {
  DynamicCtaFooter,
  DynamicSliceZone,
} from "@/components/DynamicExports";
import { accessibilityPage } from "./content";

export const revalidate = false;

export default async function Page() {
  const { settings, navigation, cta } = await getExtra({});

  return (
    <Layout
      page={accessibilityPage}
      settings={settings}
      navigation={navigation}
    >
      <DynamicSliceZone slices={accessibilityPage.data.slices} />
      <DynamicCtaFooter data={cta} />
    </Layout>
  );
}

export async function generateMetadata() {
  return {
    title: {
      absolute:
        accessibilityPage.data.meta_title ||
        "Accessibility Statement | The Grand LB",
    },
    description:
      accessibilityPage.data.meta_description ||
      "The Grand Long Beach is committed to digital accessibility. Read our WCAG 2.1 AA accessibility statement, conformance status, and how to reach us.",
    alternates: { canonical: "/accessibility" },
  };
}
