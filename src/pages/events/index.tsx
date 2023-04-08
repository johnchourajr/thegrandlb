import Link from "@components/Link";
import { createClient } from "../../../prismicio";

const Page = ({ childPages }: any) => {
  return <div></div>;
};

export default Page;

export async function getStaticProps({ params, previewData }: any) {
  const client = createClient({ previewData });

  const [navigation, page, childPages] = await Promise.all([
    client.getByType("nav_links"),
    client.getByUID("event_index_page", "events"),
    client.getByType("event_page"),
  ]);

  return {
    props: {
      navigation,
      page,
      childPages,
    },
  };
}
