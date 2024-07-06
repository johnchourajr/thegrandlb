import { FormState } from "@/data/form.types";
import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
} from "@react-email/components";
import EmailBody from "../components/email/emailBody";

function formatDate(date: string) {
  if (!date) return "";
  const dateObj = new Date(date);
  dateObj.setUTCHours(0, 0, 0, 0); // Set time to midnight in UTC

  const month = dateObj.toLocaleString("default", { month: "long" });
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  return `${month} ${day}, ${year}`;
}

export const SalesEmail = (props: any) => {
  const {
    event_name = { value: "" },
    full_name = { value: "" },
    desired_date = { value: "" },
  } = props as FormState;

  const previewText = `New ${
    event_name?.value || "event"
  } inquiry has been received!`;

  const formattedDate = formatDate(desired_date.value);
  const nowFormatted = formatDate(new Date().toISOString());

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="my-auto mx-auto bg-white font-sans">
          <Container className="relative mx-auto mt-[24px] max-w-[529px] overflow-hidden rounded bg-[#FAF2EB] px-[32px] pt-[24px] pb-[32px]">
            <div className="absolute top-0 left-0 right-0 inline-block overflow-hidden bg-[#FFC42D]">
              <span className="inline-block whitespace-nowrap py-[4px]">
                SALES EMAIL SALES EMAIL SALES EMAIL SALES EMAIL SALES EMAIL
                SALES EMAIL
              </span>
            </div>
            <Section className="mt-[24px] mb-[16px]">
              <a href="https://thegrandlb.com" target="_blank" rel="noreferrer">
                <Img
                  src={`https://images.prismic.io/the-grand/cb6bbe74-9712-4cf9-bec3-145cc675a490_logo.png?auto=compress,format`}
                  width="177"
                  height="65"
                  alt="The Grand"
                  className="logo-light"
                />
              </a>
            </Section>
            <hr className="border-[1px] !border-solid border-[white] !outline-[none]" />
            <h1 className="text-[20px]">Hey sales team.</h1>
            <p className="text-[16px]">
              {full_name.value || "Someone"} just submitted an inquiry for{" "}
              {`"${event_name?.value}"` || "an event"} on{" "}
              {formattedDate || "a date"} via thegrandlb.com website on{" "}
              {nowFormatted}.
            </p>
            <hr className="border-[1px] !border-solid border-[white] !outline-[none]" />
            <p>Details:</p>
            <EmailBody {...props} />
          </Container>
          <Section className="my-[16px] w-[465px]">
            <p className="text-[12px]">
              <a href="https://thegrandlb.com" target="_blank" rel="noreferrer">
                thegrandlb.com
              </a>
            </p>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default SalesEmail;
