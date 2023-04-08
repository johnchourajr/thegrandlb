import React from "react";
import Link from "@components/Link";
import { createClient } from "../../prismicio";

const Page = () => {
  return (
    <div>
      {/* <div className={"flex gap-1"}>
        <Link href={"/"} className={"underline"}>
          Home
        </Link>
        /
        <Link href={"/contact"} className={""}>
          Contact
        </Link>
      </div> */}
    </div>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }: any) {
  const client = createClient({ previewData });

  const [navigation, page] = await Promise.all([
    client.getByType("nav_links"),
    client.getByUID("page", "contact"),
  ]);

  return {
    props: {
      navigation,
      page,
    },
  };
}
