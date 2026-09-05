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
 * The flag read is a genuine runtime access — `flags/next` calls `cookies()`
 * and `headers()` from `next/headers` under the hood — so it resolves per
 * visitor either way. What the `<Suspense>` boundary changes is *where the
 * prerender stops*.
 *
 * Awaited at the top level of the page, the read blocks the prerender: every
 * thing below it becomes dynamic and the static shell collapses to almost
 * nothing. Behind a boundary, the shell prerenders normally and only the arm
 * streams. Next would normally flag the unwrapped case as a blocking-route
 * insight, but that is dev-overlay only, and `instant = false` suppresses the
 * static-shell check that would otherwise catch it — so it degrades quietly.
 *
 * A boundary is the mechanism rather than a preference: `export const dynamic`
 * was removed in Next 16 when Cache Components is enabled.
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
