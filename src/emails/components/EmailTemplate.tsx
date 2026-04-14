import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { ReactNode } from "react";

type EmailTemplateProps = {
  preview: string;
  eyebrow?: string;
  title?: string;
  ctaHref?: string;
  ctaLabel?: string;
  footer?: ReactNode;
  showLogo?: boolean;
  children: ReactNode;
};

const logoUrl =
  "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/bf87763c-0f39-4979-462c-f7ca3b03e300/public";

const logoStyle = {
  margin: "0 0 20px",
};

const bodyStyle = {
  backgroundColor: "#FAF2EB",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  margin: 0,
  padding: "32px 16px",
};

const cardStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: "8px",
  margin: "0 auto",
  maxWidth: "560px",
  padding: "32px",
};

const eyebrowStyle = {
  color: "#9e8d7a",
  fontSize: "11px",
  letterSpacing: "0.12em",
  margin: "0 0 16px",
  textTransform: "uppercase" as const,
};

const titleStyle = {
  color: "#311514",
  fontSize: "22px",
  fontWeight: "600",
  lineHeight: "1.35",
  margin: "0 0 16px",
};

const buttonStyle = {
  backgroundColor: "#311514",
  borderRadius: "6px",
  color: "#FFFFFF",
  display: "inline-block",
  fontSize: "13px",
  fontWeight: "500",
  marginBottom: "28px",
  padding: "10px 20px",
  textDecoration: "none",
};

const footerStyle = {
  borderTop: "1px solid #eee",
  color: "#aaa",
  fontSize: "12px",
  margin: "28px 0 0",
  paddingTop: "20px",
};

export default function EmailTemplate({
  preview,
  eyebrow,
  title,
  ctaHref,
  ctaLabel,
  footer,
  showLogo = false,
  children,
}: EmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={bodyStyle}>
        <Container style={cardStyle}>
          <Section>
            {showLogo ? (
              <Section style={logoStyle}>
                <Link href="https://thegrandlb.com" target="_blank" rel="noreferrer">
                  <Img
                    src={logoUrl}
                    width="177"
                    height="65"
                    alt="The Grand LB"
                  />
                </Link>
              </Section>
            ) : null}

            {eyebrow ? <Text style={eyebrowStyle}>{eyebrow}</Text> : null}
            {title ? <Text style={titleStyle}>{title}</Text> : null}

            {ctaHref && ctaLabel ? (
              <Link href={ctaHref} style={buttonStyle}>
                {ctaLabel}
              </Link>
            ) : null}

            {children}

            {footer ? <Text style={footerStyle}>{footer}</Text> : null}
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
