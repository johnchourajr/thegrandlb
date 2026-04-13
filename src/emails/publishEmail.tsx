import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type PublishEmailProps = {
  menuTitle: string;
  menuUrl: string;
  publishedBy: string;
};

export default function PublishEmail({
  menuTitle = "Classic",
  menuUrl = "https://thegrandlb.com/menus/classic",
  publishedBy = "editor@thegrandlb.com",
}: Partial<PublishEmailProps> = {}) {
  return (
    <Html>
      <Head />
      <Preview>
        {menuTitle} menu has been published and is deploying to thegrandlb.com
      </Preview>
      <Body style={{ backgroundColor: "#FAF2EB", fontFamily: "sans-serif", margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: "480px", margin: "40px auto", padding: "32px", backgroundColor: "#FFFFFF", borderRadius: "8px" }}>
          <Section>
            <Text style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#9e8d7a", margin: "0 0 24px" }}>
              The Grand LB · Content Update
            </Text>
            <Text style={{ fontSize: "22px", fontWeight: "600", color: "#311514", margin: "0 0 8px" }}>
              {menuTitle} menu published
            </Text>
            <Text style={{ fontSize: "14px", color: "#666", margin: "0 0 24px", lineHeight: "1.6" }}>
              Changes are deploying to Vercel and should be live on the site in a few minutes.
            </Text>

            <Link
              href={menuUrl}
              style={{
                display: "inline-block",
                backgroundColor: "#311514",
                color: "#FFFFFF",
                fontSize: "13px",
                fontWeight: "500",
                padding: "10px 20px",
                borderRadius: "6px",
                textDecoration: "none",
              }}
            >
              View {menuTitle} menu →
            </Link>

            <Text style={{ fontSize: "12px", color: "#aaa", margin: "32px 0 0", borderTop: "1px solid #eee", paddingTop: "20px" }}>
              Published by {publishedBy}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
