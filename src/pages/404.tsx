import Button from "@/components/Button";
import { GridSection } from "@/components/GridSection";
import Headline from "@/components/Headline";
import Layout from "@/components/Layout";
import Text from "@/components/Paragraph";
import { getExtra } from "@/services/get-extra";
import fetchLinks from "@/utils/fetchLinks";
import { stringToUnderscore } from "@/utils/utils";
import clsx from "clsx";
import { useRouter } from "next/router";
import { createClient } from "prismicio";

const Page = ({ page, settings, navigation }: any) => {
  const router = useRouter();
  const { asPath } = router;
  return (
    <Layout
      page={page}
      settings={settings}
      navigation={navigation}
      className="min-h-fit"
      hidePageUid
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
          <Text>404 Error — Page at &quot;{asPath}&quot; not found</Text>
          <Headline size={"4xl"} text={`Better moments to come`} uppercase />
          <br />
          <Button
            href={"/"}
            eventCategory={stringToUnderscore(`${asPath} 404 Page Action`)}
            eventLabel={stringToUnderscore(`Primary CTA`)}
          >
            Go back home
          </Button>
        </div>
      </GridSection>
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
