import ExperimentArm from "@/components/ExperimentArm";
import { inquiryFormVariant } from "@/flags";
import { getExtra } from "@/services/get-extra";
import Layout from "@components/Layout";
import { Suspense } from "react";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

/**
 * Resolves the visitor's arm at request time.
 *
 * This has to sit inside a `<Suspense>` boundary. Cache Components prerenders
 * everything it can into a static shell, and a flag read *outside* a boundary
 * is resolved once during that prerender — where there is no request and so no
 * `glb.exp` cookie. The adapter then lands on `defaultValue`, and that single
 * arm is baked into the shell and served to everyone from the CDN.
 *
 * That is not a theoretical risk: before this boundary existed, two requests
 * carrying different `glb.exp` cookies came back byte-identical, both with
 * `arm:"control"`. It was invisible only because every environment is still
 * pinned to control — the moment #217 ramps, bucketing would not have varied
 * per visitor and the funnel would have been meaningless.
 *
 * A boundary is the mechanism, not a preference: `export const dynamic` was
 * removed in Next 16 when Cache Components is enabled.
 *
 * The arm now arrives a beat after the shell, so the very first event of a
 * visit can be stamped `null`. That is survivable by design — `experiment_funnel`
 * attributes a session with `MAX(event_data->>'experiment_arm')`, so one event
 * carrying the arm attributes the whole session.
 */
async function ResolvedExperimentArm() {
  // Resolved server-side so a Flags Explorer override is respected — an
  // override changes the render without changing the cookie, and reporting an
  // arm the visitor is not seeing is worse than reporting none.
  const arm = await inquiryFormVariant();
  return <ExperimentArm arm={arm} />;
}

export default async function InquirePage() {
  const { settings, navigation } = await getExtra({});

  return (
    <>
      <Suspense fallback={null}>
        <ResolvedExperimentArm />
      </Suspense>
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
