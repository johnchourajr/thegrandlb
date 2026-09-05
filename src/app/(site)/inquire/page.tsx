import Layout from "@components/Layout";
import { getExtra } from "@/services/get-extra";
import ExperimentArm from "@/components/ExperimentArm";
import { inquiryFormVariant } from "@/flags";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default async function InquirePage() {
  const { settings, navigation } = await getExtra({});
  // Resolved server-side so a Flags Explorer override is respected. Currently
  // pinned to the control arm for everyone — see INQUIRY_VARIANT_SHARE.
  const arm = await inquiryFormVariant();

  return (
    <>
      <ExperimentArm arm={arm} />
      <Layout
      page={{ uid: "inquire", data: {} }}
      settings={settings}
      navigation={navigation}
      className={"!min-h-[0vh]"}
      wrapperClassName={"!min-h-[0vh]"}
      />
    </>
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
