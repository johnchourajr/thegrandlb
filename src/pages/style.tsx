// import SendSMS from "@/components/SendSMS";

import { GridSection } from "@/components/GridSection";
import Headline from "@/components/Headline";
import Text from "@/components/Paragraph";
import StringText from "@/components/StringText";
import Layout from "@components/Layout";
import { createClient } from "../../prismicio";

const Page = ({ navigation, settings, cta }: any) => {
  return (
    <Layout className="">
      <GridSection
        className="py-10"
        id=""
        topSpacer={"Large"}
        bottomSpacer={"Large"}
      >
        <div className="col-span-full flex flex-col gap-10 xl:col-span-10 xl:col-start-2">
          <Headline size="3xl" uppercase>
            Headline 3xl Morbi leo risus, porta ac consectetur ac, vestibulum at
            eros.
          </Headline>
          <Headline size="2xl" emphasis>
            Headline 2xl Morbi leo risus, porta ac consectetur ac, vestibulum at
            eros.
          </Headline>
          <Headline size="xl" uppercase>
            Headline xl Morbi leo risus, porta ac consectetur ac, vestibulum at
            eros.
          </Headline>
          <Headline size="lg">
            Headline lg Morbi leo risus, porta ac consectetur ac, vestibulum at
            eros.
          </Headline>
          <Headline size="md" uppercase>
            Headline md Morbi leo risus, porta ac consectetur ac, vestibulum at
            eros.
          </Headline>
          <Headline size="sm">
            Headline sm Morbi leo risus, porta ac consectetur ac, vestibulum at
            eros.
          </Headline>
          <hr />
          <StringText size="large" uppercase bold>
            StringText large
          </StringText>
          <StringText uppercase bold>
            StringText default
          </StringText>
          <StringText size="small" uppercase bold>
            StringText small
          </StringText>
          <hr />
          <Text size="large">
            Paragraph base Morbi leo risus, porta ac consectetur ac, vestibulum
            at eros. Cras justo odio, dapibus ac facilisis in, egestas eget
            quam.
          </Text>
          <Text paragraph>
            Paragraph Morbi leo risus, porta ac consectetur ac, vestibulum at
            eros. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
            Nullam id dolor id nibh ultricies vehicula ut id elit. Donec id elit
            non mi porta gravida at eget metus. Etiam porta sem malesuada magna
            mollis euismod. Donec ullamcorper nulla non metus auctor fringilla.
            Maecenas sed diam eget risus varius blandit sit amet non magna.
            Curabitur blandit tempus porttitor. Donec id elit non mi porta
            gravida at eget metus. Vivamus sagittis lacus vel augue laoreet
            rutrum faucibus dolor auctor. Curabitur blandit tempus porttitor.
          </Text>
          <Text size="small">
            Paragraph caption Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Cras justo odio, dapibus ac facilisis in,
            egestas eget quam.
          </Text>
          <Headline size="4xl" uppercase>
            Moments{`\r`}start{`\r`}here
          </Headline>
        </div>
      </GridSection>
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }: any) {
  const client = createClient({ previewData });

  const [navigation, settings] = await Promise.all([
    client.getByType("nav_links"),
    client.getByType("settings"),
  ]);

  return {
    props: {
      navigation,
      settings,
    },
  };
}
