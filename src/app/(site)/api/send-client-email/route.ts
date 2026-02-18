import ClientEmail from "@/emails/clientEmail";
import SalesEmail from "@/emails/salesEmail";
import errorNotificationService from "@/services/error-notifications";
import type { NextRequest } from "next/server";
import { Resend } from "resend";

const RESEND_API_BASE = "https://api.resend.com";
const resend = new Resend(process.env.NEXT_RESEND_API_KEY);
// Resend SDK bug: it uses 'http://localhost:3001' || process.env.RESEND_BASE_URL, so the string wins and env is never used. Patch the client.
const resendAny = resend as unknown as { baseUrl: string; request: { defaults: { baseURL: string } } };
resendAny.baseUrl = RESEND_API_BASE;
resendAny.request.defaults.baseURL = RESEND_API_BASE;
const fromEmail = process.env.NEXT_PUBLIC_RESEND_FROM_EMAIL ?? "";
const salesEmail = (process.env.NEXT_PUBLIC_RESEND_SALES_EMAIL ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const replyEmailsRaw = (process.env.NEXT_PUBLIC_RESEND_REPLY_EMAILS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const defaultReplyTo = replyEmailsRaw[0] ?? "dan@grandfandb.com";
const isNotProduction = process.env.NODE_ENV !== "production";
const testText = isNotProduction ? `TEST: ` : "";

type FormState = {
  [key: string]: {
    value: string;
  };
};

type RequestBody = {
  email?: string;
  formState?: FormState;
};

export async function POST(request: NextRequest) {
  let body: RequestBody | undefined;

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
      const msg = `Missing environment variables: ${missingVars.join(", ")}`;
      console.error(msg);
      await errorNotificationService.notifyApiError(
        "email",
        "/api/send-client-email",
        new Error(msg),
        { missingVars, endpoint: "send-client-email" }
      );
      return new Response(
        JSON.stringify({
          error: "Email configuration missing",
          ...(isNotProduction && { detail: msg }),
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!fromEmail) {
      const msg = "NEXT_PUBLIC_RESEND_FROM_EMAIL is empty";
      console.error(msg);
      return new Response(
        JSON.stringify({
          error: msg,
          ...(isNotProduction && { detail: msg }),
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    if (salesEmail.length === 0) {
      const msg = "NEXT_PUBLIC_RESEND_SALES_EMAIL has no valid addresses";
      console.error(msg);
      return new Response(
        JSON.stringify({
          error: msg,
          ...(isNotProduction && { detail: msg }),
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    body = await request.json();
    const { email = "", formState = {} } = body || {};

    /**
     * Send email to the client using the ReSend client
     */
    await resend.emails.send({
      from: fromEmail,
      to: email,
      reply_to: defaultReplyTo,
      subject: `${testText}Inquiry confirmation: ${
        formState.event_name?.value || "Grand LB Event"
      }`,
      react: ClientEmail(formState),
    });

    /**
     * Send email to the sales team using the ReSend client
     */
    const salesPayload: Parameters<typeof resend.emails.send>[0] = {
      from: fromEmail,
      to: salesEmail,
      subject: `${testText}New inquiry from ${
        formState.full_name?.value || "Grand LB Website"
      }`,
      react: SalesEmail(formState),
    };
    const inquirerEmail = formState.email?.value;
    if (inquirerEmail && typeof inquirerEmail === "string") {
      salesPayload.reply_to = inquirerEmail;
    }
    await resend.emails.send(salesPayload);

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorDetail = isNotProduction
      ? error instanceof Error
        ? error.stack
        : errorMessage
      : undefined;

    await errorNotificationService.notifyApiError(
      "email",
      "/api/send-client-email",
      error,
      {
        endpoint: "send-client-email",
        hasFormState: !!body?.formState,
        hasEmail: !!body?.email,
      }
    );

    return new Response(
      JSON.stringify({
        error: "Failed to send email",
        ...(isNotProduction && { detail: errorMessage, debug: errorDetail }),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
