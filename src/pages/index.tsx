// import SendSMS from "@/components/SendSMS";
import { SliceZone } from "@prismicio/react";

import CtaFooter from "@/components/CtaFooter";
import SliceData from "@/components/dev/SliceData";
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import Layout from "@components/Layout";
import { createClient } from "../../prismicio";
import { components } from "../../slices";

const Page = ({ cta, page }: any) => {
  // if (!page || !cta) return null;
  const {
    data: { slices, ...pageRest },
  } = page;

  return (
    <Layout page={page} hidePageUid>
      <SliceData slice={pageRest} hidden />
      <SliceZone slices={slices} components={components} />
      <CtaFooter data={cta} />
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }: any) {
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
