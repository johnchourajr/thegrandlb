import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

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
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto mt-[24px] max-w-[600px] px-[24px] pb-[24px] pt-[24px]">
            {/* Header */}
            <Section className="mb-6">
              <Text className="text-gray-900 mb-1 text-[18px] font-semibold">
                {service || "SYSTEM"} Error
              </Text>
              <Text className="text-gray-600 text-[14px]">
                {formattedTime} • {environment || "UNKNOWN"}
              </Text>
              {throttleInfo && throttleInfo.count > 1 && (
                <Text className="text-orange-600 mt-1 text-[12px] font-medium">
                  {throttleInfo.count} similar errors in the last hour
                </Text>
              )}
            </Section>

            <Hr className="border-gray-300 mb-6 border-[1px]" />

            {/* Error Message */}
            <Section className="mb-6">
              <Text className="text-gray-900 mb-2 text-[14px] font-medium">
                Error Message
              </Text>
              <div className="bg-red-50 border-red-400 rounded border-l-4 p-4">
                <Text className="font-mono text-red-800 text-[14px]">
                  {errorMessage || "Unknown error occurred"}
                </Text>
              </div>
            </Section>

            {/* Context */}
            <Section className="mb-6">
              <Text className="text-gray-900 mb-2 text-[14px] font-medium">
                Context
              </Text>
              <div className="bg-gray-50 rounded border p-4">
                <div className="text-gray-700 text-[13px]">
                  <div className="mb-1">
                    <span className="font-medium">Endpoint:</span>{" "}
                    <span className="font-mono">{endpoint || "unknown"}</span>
                  </div>
                  <div className="mb-1">
                    <span className="font-medium">Service:</span>{" "}
                    {service || "general"}
                  </div>
                  <div>
                    <span className="font-medium">Environment:</span>{" "}
                    {environment || "unknown"}
                  </div>
                </div>
              </div>
            </Section>

            {/* Additional Metadata */}
            {metadata && Object.keys(metadata).length > 0 && (
              <Section className="mb-6">
                <Text className="text-gray-900 mb-2 text-[14px] font-medium">
                  Additional Details
                </Text>
                <div className="bg-gray-50 rounded border p-4">
                  <pre className="font-mono text-gray-700 whitespace-pre-wrap text-[12px]">
                    {JSON.stringify(metadata, null, 2)}
                  </pre>
                </div>
              </Section>
            )}

            {/* Stack Trace */}
            {errorStack && (
              <Section className="mb-6">
                <Text className="text-gray-900 mb-2 text-[14px] font-medium">
                  Stack Trace
                </Text>
                <div className="bg-gray-900 text-gray-100 max-h-[250px] overflow-auto rounded p-4">
                  <pre className="font-mono whitespace-pre-wrap text-[11px]">
                    {errorStack}
                  </pre>
                </div>
              </Section>
            )}

            <Hr className="border-gray-300 mb-4 border-[1px]" />

            {/* Footer */}
            <Section>
              <Text className="text-gray-500 text-[12px]">
                The Grand LB • Automated Error Monitoring
              </Text>
              <Text className="text-gray-400 mt-1 text-[11px]">
                This error has been logged and will be throttled if it occurs
                repeatedly.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ErrorNotificationEmail;
