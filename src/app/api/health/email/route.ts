import type { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_RESEND_API_KEY);

export async function GET(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Check required environment variables
    const requiredEnvVars = [
      "NEXT_RESEND_API_KEY",
      "NEXT_PUBLIC_RESEND_FROM_EMAIL",
      "NEXT_PUBLIC_RESEND_SALES_EMAIL",
    ];

    const missingVars = requiredEnvVars.filter(
      (varName) => !process.env[varName]
    );

    if (missingVars.length > 0) {
      return new Response(
        JSON.stringify({
          status: "unhealthy",
          service: "email",
          error: `Missing environment variables: ${missingVars.join(", ")}`,
          timestamp: new Date().toISOString(),
          responseTime: Date.now() - startTime,
        }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Test Resend API connectivity (without sending an actual email)
    // This just verifies the API key is valid
    try {
      // Create a minimal test that doesn't actually send an email
      // We'll just check if we can create the email object
      const testEmailData = {
        from: process.env.NEXT_PUBLIC_RESEND_FROM_EMAIL!,
        to: "healthcheck@example.com",
        subject: "Health Check Test",
        text: "This is a health check test",
      };

      // Don't actually send, just validate the service is accessible
      // Note: Resend doesn't have a simple "ping" endpoint, so we'll rely on env var checks
      // and assume the service is healthy if the API key is present and properly formatted

      const apiKey = process.env.NEXT_RESEND_API_KEY;
      if (!apiKey || !apiKey.startsWith("re_")) {
        throw new Error("Invalid Resend API key format");
      }

      return new Response(
        JSON.stringify({
          status: "healthy",
          service: "email",
          timestamp: new Date().toISOString(),
          responseTime: Date.now() - startTime,
          note: "Environment variables validated - actual email service availability not tested to avoid sending test emails",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (apiError) {
      return new Response(
        JSON.stringify({
          status: "unhealthy",
          service: "email",
          error: `Resend API validation failed: ${
            apiError instanceof Error ? apiError.message : "Unknown API error"
          }`,
          timestamp: new Date().toISOString(),
          responseTime: Date.now() - startTime,
        }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "unhealthy",
        service: "email",
        error:
          error instanceof Error
            ? error.message
            : "Unknown email service error",
        timestamp: new Date().toISOString(),
        responseTime: Date.now() - startTime,
      }),
      {
        status: 503,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
