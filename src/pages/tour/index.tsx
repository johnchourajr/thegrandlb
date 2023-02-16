import Link from "@components/Link";
import { createClient } from "prismicio";

const Page = ({ tourPages }: any) => {
  return (
    <div>
      <div className={"flex gap-1"}>
        <Link href={"/"} className={"underline"}>
          Home
        </Link>
        /
        <Link href={"/tour"} className={""}>
          Tour
        </Link>
      </div>
      <ul>
        {tourPages.results.map((item: any) => (
          <li key={item.id}>
            <a href={`/tour/${item.uid}`}>{item.data.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;

export async function getStaticProps({ previewData }: any) {
  const client = createClient({ previewData });

  const tourPages = await client.getByType("tour_page");

  return {
    props: {
      tourPages,
    },
  };
}
