import errorNotificationService from "@/services/error-notifications";
import type { NextRequest } from "next/server";

type TestErrorRequest = {
  service?: "email" | "database" | "general";
  errorType?: string;
  message?: string;
};

export async function POST(request: NextRequest) {
  // Only allow in development environment
  if (process.env.NODE_ENV === "production") {
    return new Response(
      JSON.stringify({
        error: "Test endpoint not available in production",
        message: "Use /api/health endpoints for monitoring in production",
      }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const body: TestErrorRequest = await request.json().catch(() => ({}));
    const {
      service = "general",
      errorType = "test",
      message = "This is a test error notification",
    } = body;

    // Create a test error
    const testError = new Error(`Test ${errorType}: ${message}`);

    // Add some test stack trace context
    testError.stack = `Error: Test ${errorType}: ${message}
    at POST (/api/test-error-notification)
    at testFunction (test-context:1:1)
    at simulateError (error-simulation:5:10)
    at Object.<anonymous> (monitoring-test:12:15)`;

    // Send the test notification
    await errorNotificationService.notifyApiError(
      service,
      "/api/test-error-notification",
      testError,
      {
        testData: true,
        service,
        errorType,
        timestamp: new Date().toISOString(),
        userAgent: request.headers.get("user-agent"),
        requestMethod: request.method,
        testContext:
          "This is a test notification to verify the monitoring system is working correctly.",
      }
    );

    return new Response(
      JSON.stringify({
        message: "Test error notification sent successfully",
        details: {
          service,
          errorType,
          message,
          timestamp: new Date().toISOString(),
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error sending test notification:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to send test notification",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function GET(request: NextRequest) {
  // Only allow in development environment
  if (process.env.NODE_ENV === "production") {
    return new Response(
      JSON.stringify({
        error: "Test endpoint not available in production",
      }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  const throttleStats = errorNotificationService.getThrottleStats();

  return new Response(
    JSON.stringify({
      message: "Error notification test endpoint",
      environment: "development",
      throttleStats:
        throttleStats.length > 0 ? throttleStats : "No recent alerts",
      usage: {
        testError: "POST /api/test-error-notification",
        examples: {
          basic: "POST {} (empty body for default test)",
          email:
            'POST { "service": "email", "errorType": "smtp", "message": "SMTP connection failed" }',
          database:
            'POST { "service": "database", "errorType": "connection", "message": "Connection timeout" }',
        },
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
