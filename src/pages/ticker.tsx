// import SendSMS from "@/components/SendSMS";

import { GridSection } from "@/components/GridSection";
import Headline from "@/components/Headline";
import Tick from "@/components/TickerContainer";
import { getExtra } from "@/services/get-extra";
import Layout from "@components/Layout";
import clsx from "clsx";
import Head from "next/head";
import { createClient } from "../../prismicio";

const Page = ({ navigation, settings, cta }: any) => {
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
          <div
            className={clsx(
              `inline-flex h-32 w-60 items-center justify-center rounded-full bg-[red]`
            )}
          />
          <div
            className={clsx(
              `inline-flex h-32 w-60 items-center justify-center rounded-full bg-[#e5e5e5]`
            )}
          />
          <div
            className={clsx(
              `inline-flex h-32 w-60 items-center justify-center rounded-full bg-[#e5e5e5]`
            )}
          />
          <div
            className={clsx(
              `inline-flex h-32 w-60 items-center justify-center rounded-full bg-[#e5e5e5]`
            )}
          />
        </Tick>
      </GridSection>
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }: any) {
  const client = createClient({ previewData });
  const extra = await getExtra({ previewData });

  return {
    props: {
      ...extra,
    },
  };
}
