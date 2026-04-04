import clsx from "clsx";
import { getExtra } from "@/services/get-extra";
import Layout from "@/components/Layout";
import { GridSection } from "@/components/GridSection";
import Headline from "@/components/Headline";
import Text from "@/components/Paragraph";
import Button from "@/components/Button";

export default async function NotFound() {
  const extra = await getExtra({});
  const { settings, navigation } = extra;

  return (
    <Layout settings={settings} navigation={navigation}>
      <GridSection
        id="not-found"
        topSpacer={"None"}
        bottomSpacer={"None"}
      >
        <div
          className={clsx(
            "flex flex-col items-center justify-center space-y-4 text-center",
            "col-span-full h-full min-h-[80vh]"
          )}
        >
          <Text size="small">404 — Page Not Found</Text>
          <Headline size={"4xl"} text="Better moments to come" uppercase />
          <br />
          <Button href="/" type="black">
            Go back home
          </Button>
        </div>
      </GridSection>
    </Layout>
  );
}
