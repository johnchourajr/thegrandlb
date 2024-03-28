/**
 * Component(s)
 */
import Layout from "@components/Layout";

/**
 * Services
 */
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import { createClient } from "../../prismicio";

const InquirePage = ({ page, settings }: any) => {
  return (
    <Layout
      page={page}
      settings={settings}
      className={"!min-h-[0vh]"}
      wrapperClassName={"!min-h-[0vh]"}
      hidePageUid
    />
  );
};

export default InquirePage;

export async function getStaticProps({ previewData }: any) {
  const client = createClient({ previewData });
  const extra = await getExtra({ previewData });

  const [page] = await Promise.all([
    client.getByUID("inquire_page", "inquire", {
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
