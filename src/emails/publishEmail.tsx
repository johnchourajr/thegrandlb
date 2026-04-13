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
import { inlineDiff } from "@/app/(admin)/admin/(protected)/menus/[uid]/utils/diff";
import type { ChangeEntry } from "@/app/(admin)/admin/(protected)/menus/[uid]/utils/diff";

type PublishEmailProps = {
  menuTitle: string;
  menuUrl: string;
  publishedBy: string;
  changes: ChangeEntry[];
};

const borderColor: Record<string, string> = {
  modified: "#e5e5e5",
  added: "#d4b896",
  removed: "#f5c6c6",
};

const bgColor: Record<string, string> = {
  modified: "#fafafa",
  added: "#fdf8f3",
  removed: "#fff5f5",
};

export default function PublishEmail({
  menuTitle = "Classic",
  menuUrl = "https://thegrandlb.com/menus/classic",
  publishedBy = "editor@thegrandlb.com",
  changes = [],
}: Partial<PublishEmailProps> = {}) {
  return (
    <Html>
      <Head />
      <Preview>
        {`${menuTitle} menu published — ${changes.length} change${changes.length !== 1 ? "s" : ""}`}
      </Preview>
      <Body style={{ backgroundColor: "#FAF2EB", fontFamily: "sans-serif", margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: "560px", margin: "40px auto", padding: "32px", backgroundColor: "#FFFFFF", borderRadius: "8px" }}>
          <Section>
            {/* Eyebrow */}
            <Text style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#9e8d7a", margin: "0 0 16px" }}>
              The Grand LB · Content Update
            </Text>

            {/* Title */}
            <Text style={{ fontSize: "22px", fontWeight: "600", color: "#311514", margin: "0 0 16px" }}>
              {menuTitle} menu published
            </Text>

            {/* Menu link — top, always visible */}
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
                marginBottom: "28px",
              }}
            >
              View {menuTitle} menu →
            </Link>

            {/* Deploy note */}
            <Text style={{ fontSize: "13px", color: "#888", margin: "0 0 24px", lineHeight: "1.5" }}>
              Changes are deploying to Vercel and should be live in a few minutes.
            </Text>

            {/* Diff section */}
            {changes.length > 0 && (
              <>
                <Text style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9e8d7a", margin: "0 0 12px", borderTop: "1px solid #eee", paddingTop: "24px" }}>
                  {changes.length} change{changes.length !== 1 ? "s" : ""}
                </Text>

                {changes.map((c, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: "8px",
                      padding: "12px 14px",
                      backgroundColor: bgColor[c.kind] ?? "#fafafa",
                      borderRadius: "6px",
                      borderLeft: `3px solid ${borderColor[c.kind] ?? "#e5e5e5"}`,
                    }}
                  >
                    {/* Path label */}
                    <p style={{ fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#aaa", margin: "0 0 6px", fontFamily: "sans-serif" }}>
                      {c.path}
                    </p>

                    {/* Modified — inline word diff */}
                    {c.kind === "modified" && (
                      <p style={{ fontSize: "13px", color: "#333", margin: 0, lineHeight: "1.6", fontFamily: "sans-serif" }}>
                        {inlineDiff(c.before, c.after).map((part, pi) =>
                          part.kind === "del" ? (
                            <span key={pi} style={{ backgroundColor: "#fee2e2", color: "#b91c1c", textDecoration: "line-through", borderRadius: "2px", padding: "0 1px" }}>
                              {part.text}
                            </span>
                          ) : part.kind === "add" ? (
                            <span key={pi} style={{ backgroundColor: "#fef3c7", color: "#92400e", borderRadius: "2px", padding: "0 1px" }}>
                              {part.text || "·"}
                            </span>
                          ) : (
                            <span key={pi}>{part.text}</span>
                          )
                        )}
                      </p>
                    )}

                    {/* Added */}
                    {c.kind === "added" && (
                      <p style={{ fontSize: "13px", color: "#92400e", margin: 0, fontFamily: "sans-serif" }}>
                        {c.after}
                      </p>
                    )}

                    {/* Removed */}
                    {c.kind === "removed" && (
                      <p style={{ fontSize: "13px", color: "#b91c1c", textDecoration: "line-through", margin: 0, fontFamily: "sans-serif" }}>
                        {c.before}
                      </p>
                    )}
                  </div>
                ))}
              </>
            )}

            {/* Footer */}
            <Text style={{ fontSize: "12px", color: "#aaa", margin: "28px 0 0", borderTop: "1px solid #eee", paddingTop: "20px" }}>
              Published by {publishedBy}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
