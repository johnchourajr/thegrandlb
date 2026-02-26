"use client";

import clsx from "clsx";
import { createClient } from "@/prismicio";

/**
 * Components
 */
import Button from "@/components/Button";
import { GridSection } from "@/components/GridSection";
import Headline from "@/components/Headline";
import Layout from "@/components/Layout";
import Text from "@/components/Paragraph";

/**
 * Services
 */
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import { stringToUnderscore } from "@/utils/utils";

/**
 * Types
 */
import type { GetStaticPropsParams, PageProps } from "@/types/page-props";

/**
 * @name FourOhFourPage
 */
const FourOhFourPage = ({ page, settings, navigation }: PageProps) => {
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <Layout
      page={page}
      settings={settings}
      navigation={navigation}
      className="min-h-fit"
    >
      <GridSection
        id="404"
        topSpacer={"None"}
        bottomSpacer={"None"}
        className={clsx("")}
      >
        <div
          className={clsx(
            "flex flex-col items-center justify-center space-y-4 text-center",
            "col-span-full h-full min-h-[80vh]"
          )}
        >
          <Text>404 Error — Page at &quot;{pathname}&quot; not found</Text>
          <Headline size={"4xl"} text={`Better moments to come`} uppercase />
          <br />
          <Button
            href={"/"}
            eventCategory={stringToUnderscore(`${pathname} 404 Page Action`)}
            eventLabel={stringToUnderscore(`Primary CTA`)}
          >
            Go back home
          </Button>
        </div>
      </GridSection>
    </Layout>
  );
};

export default FourOhFourPage;

export async function getStaticProps({ previewData }: GetStaticPropsParams) {
  const client = createClient({ previewData });
  const extra = await getExtra({ previewData });

  const [page] = await Promise.all([
    client.getByUID("page", "home", {
      fetchLinks,
    }),
  ]);

  return {
    props: {
      page,
      ...extra,
    },
  };
}
