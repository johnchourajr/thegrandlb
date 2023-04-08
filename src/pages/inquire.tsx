import React from "react";
import { createClient } from "../../prismicio";

const Page = () => {
  return (
    <div>
      <h1>Inquire</h1>
    </div>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }: any) {
  const client = createClient({ previewData });

  const [navigation, page] = await Promise.all([
    client.getByType("nav_links"),
    client.getByUID("inquire_page", "inquire"),
  ]);

  return {
    props: {
      navigation,
      page,
    },
  };
}
