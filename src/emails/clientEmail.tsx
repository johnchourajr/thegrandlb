import type { FormState } from "@/data/form.types";
import { Link, Text } from "@react-email/components";
import EmailBody from "../components/email/emailBody";
import EmailTemplate from "./components/EmailTemplate";

type ClientEmailProps = Partial<FormState>;

export const ClientEmail = (props: ClientEmailProps) => {
  const { event_name = { value: "" }, full_name = { value: "" } } =
    props;

  const previewText = `Your ${
    event_name?.value || "event"
  } inquiry has been received!`;

  return (
    <EmailTemplate
      preview={previewText}
      showLogo
      eyebrow="The Grand LB · Inquiry Received"
      title={`Hey, ${full_name.value || "there"}.`}
      ctaHref="https://thegrandlb.com/tour"
      ctaLabel="Explore our spaces"
      footer="thegrandlb.com"
    >
      <Text
        style={{
          fontSize: "16px",
          color: "#333333",
          lineHeight: "1.6",
          margin: "0 0 16px",
        }}
      >
        Thanks for your submission. Our sales team will reach out within 2-3
        business days to discuss your event and next steps.
      </Text>

      <Text
        style={{
          fontSize: "16px",
          color: "#333333",
          lineHeight: "1.6",
          margin: "0 0 16px",
        }}
      >
        In the meantime, feel free to{" "}
        <Link
          href="https://thegrandlb.com/menus"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#311514" }}
        >
          browse our menus
        </Link>
        .
      </Text>

      <Text
        style={{
          fontSize: "16px",
          color: "#333333",
          lineHeight: "1.6",
          margin: "0 0 24px",
        }}
      >
        Cheers,
        <br />
        The Grand Team
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
        What you shared
      </Text>

      <EmailBody {...props} />
    </EmailTemplate>
  );
};

export default ClientEmail;
