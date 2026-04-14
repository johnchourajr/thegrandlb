import {
  Hr,
  Section,
  Text,
} from "@react-email/components";
import EmailTemplate from "./components/EmailTemplate";

type ErrorEmailProps = {
  service: "email" | "database" | "general";
  endpoint: string;
  errorMessage: string;
  errorStack?: string;
  timestamp: string;
  environment: "development" | "production";
  metadata?: Record<string, any>;
  throttleInfo?: {
    count: number;
    isThrottled: boolean;
  };
};

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

export const ErrorNotificationEmail = (props: ErrorEmailProps) => {
  const {
    service = "general",
    endpoint = "unknown",
    errorMessage = "Unknown error",
    errorStack,
    timestamp = new Date().toISOString(),
    environment = "unknown",
    metadata,
    throttleInfo,
  } = props;

  const isProduction = environment === "production";
  const previewText = `${service || "SYSTEM"} Error: ${endpoint}`;
  const formattedTime = formatTimestamp(timestamp);

  return (
    <EmailTemplate
      preview={previewText}
      eyebrow="The Grand LB · Automated Error"
      title={`${service || "SYSTEM"} Error`}
      footer="The Grand LB · Automated Error Monitoring"
    >
      <Section style={{ marginBottom: "24px" }}>
        <Text
          style={{
            color: "#666666",
            fontSize: "14px",
            margin: "0 0 4px",
          }}
        >
          {formattedTime} · {environment || "UNKNOWN"}
        </Text>
        {throttleInfo && throttleInfo.count > 1 && (
          <Text
            style={{
              color: "#c56a00",
              fontSize: "12px",
              fontWeight: "600",
              margin: 0,
            }}
          >
            {throttleInfo.count} similar errors in the last hour
          </Text>
        )}
      </Section>

      <Hr style={{ borderColor: "#d4d4d4", margin: "0 0 24px" }} />

      <Section style={{ marginBottom: "24px" }}>
        <Text
          style={{
            color: "#1f1f1f",
            fontSize: "14px",
            fontWeight: "600",
            margin: "0 0 8px",
          }}
        >
          Error Message
        </Text>
        <div
          style={{
            backgroundColor: "#fff5f5",
            borderLeft: "4px solid #e57373",
            borderRadius: "6px",
            padding: "16px",
          }}
        >
          <Text
            style={{
              color: "#b91c1c",
              fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
              fontSize: "14px",
              margin: 0,
            }}
          >
            {errorMessage || "Unknown error occurred"}
          </Text>
        </div>
      </Section>

      <Section style={{ marginBottom: "24px" }}>
        <Text
          style={{
            color: "#1f1f1f",
            fontSize: "14px",
            fontWeight: "600",
            margin: "0 0 8px",
          }}
        >
          Context
        </Text>
        <div
          style={{
            backgroundColor: "#fafafa",
            border: "1px solid #e5e5e5",
            borderRadius: "6px",
            padding: "16px",
          }}
        >
          <div style={{ color: "#555555", fontSize: "13px", lineHeight: "1.7" }}>
            <div>
              <strong>Endpoint:</strong>{" "}
              <span
                style={{
                  fontFamily:
                    'Menlo, Monaco, Consolas, "Courier New", monospace',
                }}
              >
                {endpoint || "unknown"}
              </span>
            </div>
            <div>
              <strong>Service:</strong> {service || "general"}
            </div>
            <div>
              <strong>Environment:</strong> {environment || "unknown"}
            </div>
          </div>
        </div>
      </Section>

      {metadata && Object.keys(metadata).length > 0 && (
        <Section style={{ marginBottom: "24px" }}>
          <Text
            style={{
              color: "#1f1f1f",
              fontSize: "14px",
              fontWeight: "600",
              margin: "0 0 8px",
            }}
          >
            Additional Details
          </Text>
          <div
            style={{
              backgroundColor: "#fafafa",
              border: "1px solid #e5e5e5",
              borderRadius: "6px",
              padding: "16px",
            }}
          >
            <pre
              style={{
                color: "#555555",
                fontFamily:
                  'Menlo, Monaco, Consolas, "Courier New", monospace',
                fontSize: "12px",
                margin: 0,
                whiteSpace: "pre-wrap",
              }}
            >
              {JSON.stringify(metadata, null, 2)}
            </pre>
          </div>
        </Section>
      )}

      {errorStack && (
        <Section style={{ marginBottom: "24px" }}>
          <Text
            style={{
              color: "#1f1f1f",
              fontSize: "14px",
              fontWeight: "600",
              margin: "0 0 8px",
            }}
          >
            Stack Trace
          </Text>
          <div
            style={{
              backgroundColor: "#1f1f1f",
              borderRadius: "6px",
              padding: "16px",
            }}
          >
            <pre
              style={{
                color: "#f5f5f5",
                fontFamily:
                  'Menlo, Monaco, Consolas, "Courier New", monospace',
                fontSize: "11px",
                margin: 0,
                whiteSpace: "pre-wrap",
              }}
            >
              {errorStack}
            </pre>
          </div>
        </Section>
      )}

      <Hr style={{ borderColor: "#d4d4d4", margin: "0 0 16px" }} />

      <Text
        style={{
          color: "#9a9a9a",
          fontSize: "11px",
          lineHeight: "1.6",
          margin: 0,
        }}
      >
        This error has been logged and will be throttled if it occurs repeatedly.
        {isProduction ? " Production services may require immediate review." : ""}
      </Text>
    </EmailTemplate>
  );
};

export default ErrorNotificationEmail;
