import Link from "@components/Link";
import { createClient } from "prismicio";

const Page = ({ eventsPages }: any) => {
  return (
    <div>
      <div className={"flex gap-1"}>
        <Link href={"/"} className={"underline"}>
          Home
        </Link>
        /
        <Link href={"/events"} className={""}>
          Events
        </Link>
      </div>
      <ul>
        {eventsPages.results.map((item: any) => (
          <li key={item.id}>
            <a href={`/events/${item.uid}`}>{item.data.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;

export async function getStaticProps({ previewData }: any) {
  const client = createClient({ previewData });

  const eventsPages = await client.getByType("event_page");

  return {
    props: {
      eventsPages,
    },
  };
}
