import clsx from "clsx";
import Head from "next/head";

/**
 * Components
 */
import { GridSection } from "@/components/GridSection";
import Headline from "@/components/Headline";
import Tick from "@/components/TickerContainer";
import Layout from "@components/Layout";

/**
 * Services
 */
import { getExtra } from "@/services/get-extra";

/**
 * @name TickerPage
 */
const TickerPage = () => {
  return (
    <Layout className="">
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <GridSection
        className="py-10"
        id=""
        topSpacer={"Large"}
        bottomSpacer={"Large"}
      >
        <Tick toLeft={false} className={clsx("col-span-full")} animateOnce>
          <Headline
            as="span"
            size={"2xl"}
            className={`inline-flex !whitespace-pre py-3 lg:py-6`}
            disableMotion
            emphasis
            aria-hidden={true}
          >
            Goes on and on until it starts over{" "}
          </Headline>
        </Tick>

        <Tick toLeft={false} className={clsx("col-span-full")} animateOnce>
          <span
            className={clsx(
              `inline-flex h-32 w-60 items-center justify-center rounded-full bg-[red]`
            )}
          />
          <span
            className={clsx(
              `inline-flex h-32 w-60 items-center justify-center rounded-full bg-[#e5e5e5]`
            )}
          />
          <span
            className={clsx(
              `inline-flex h-32 w-60 items-center justify-center rounded-full bg-[#e5e5e5]`
            )}
          />
          <span
            className={clsx(
              `inline-flex h-32 w-60 items-center justify-center rounded-full bg-[#e5e5e5]`
            )}
          />
        </Tick>
      </GridSection>
    </Layout>
  );
};

export default TickerPage;

export async function getStaticProps({ previewData }: any) {
  const extra = await getExtra({ previewData });

  return {
    props: {
      ...extra,
    },
  };
}
