import Button from "@/components/Button";
import Headline from "@/components/Headline";
import Text from "@/components/Paragraph";
import { FieldTypeValues } from "@/data/form.types";
import clsx from "clsx";
import Image from "next/image";
import { GridSection } from "../GridSection";

export type HandleFormFunction = (
  fieldName: FieldTypeValues,
  value: any,
  page_key: any,
  validations: any
) => void;

//?event_name=Team%20Gathering&event_type=business&desired_date=2026-06-10&desired_time=6pm&head_count=80&desired_space=board-room&full_name=Sample%20Contact&email=sample.user%40example.com&phone=555-555-5555&additional_details=Automated%20sample%20submission

export default function InquireThanks() {
  return (
    <GridSection
      id="inquire-form"
      topSpacer={"None"}
      bottomSpacer={"Large"}
      className={clsx(
        "relative h-[100%] min-h-[100%] !gap-0 overflow-y-scroll rounded-tl-md rounded-tr-md text-white "
      )}
    >
      <div
        className={clsx(
          "grid-inset col-span-full flex min-h-[100%] flex-col items-center justify-center gap-6 text-center"
        )}
      >
        <Image
          src="https://the-grand.cdn.prismic.io/the-grand/12534b2c-98c9-41da-a5ed-21df334b02b0_handshake.svg"
          alt="Handshake"
          role="presentation"
          width={56}
          height={56}
        />
        <Headline size={"3xl"} uppercase>
          Thanks!
        </Headline>
        <Text className={clsx("max-w-[20em]")}>
          Thanks for telling us about your event, our sales team should reach
          out in the next 2-3 business days.
        </Text>
        <Button
          text={"Return to site"}
          href={"/"}
          eventCategory="thanks_page"
          eventLabel="return_action"
        />
      </div>
    </GridSection>
  );
}
