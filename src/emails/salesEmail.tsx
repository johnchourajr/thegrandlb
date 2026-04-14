import type { FormState } from "@/data/form.types";
import { Text } from "@react-email/components";
import EmailBody from "../components/email/emailBody";
import EmailTemplate from "./components/EmailTemplate";

function formatDate(date: string) {
  if (!date) return "";
  const dateObj = new Date(date);
  dateObj.setUTCHours(0, 0, 0, 0); // Set time to midnight in UTC

  const month = dateObj.toLocaleString("default", { month: "long" });
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  return `${month} ${day}, ${year}`;
}

type SalesEmailProps = Partial<FormState>;

export const SalesEmail = (props: SalesEmailProps) => {
  const {
    event_name = { value: "" },
    full_name = { value: "" },
    desired_date = { value: "" },
  } = props;

  const previewText = `New ${
    event_name?.value || "event"
  } inquiry has been received!`;

  const formattedDate = formatDate(String(desired_date.value));
  const nowFormatted = formatDate(new Date().toISOString());

  return (
    <EmailTemplate
      preview={previewText}
      showLogo
      eyebrow="The Grand LB · New Inquiry"
      title="Hey, sales team."
      footer="Generated from thegrandlb.com"
    >
      <Text
        style={{
          fontSize: "16px",
          color: "#333333",
          lineHeight: "1.6",
          margin: "0 0 24px",
        }}
      >
        {full_name.value || "Someone"} just submitted an inquiry for{" "}
        {event_name?.value ? `"${event_name.value}"` : "an event"} on{" "}
        {formattedDate || "a date"} via thegrandlb.com website on{" "}
        {nowFormatted}.
      </Text>

      <Text
        style={{
          fontSize: "11px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#9e8d7a",
          margin: "0 0 12px",
          borderTop: "1px solid #eee",
          paddingTop: "24px",
        }}
      >
        Details
      </Text>

      <EmailBody {...props} />
    </EmailTemplate>
  );
};

export default SalesEmail;
