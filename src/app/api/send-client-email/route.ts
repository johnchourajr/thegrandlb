import ClientEmail from "@/emails/clientEmail";
import SalesEmail from "@/emails/salesEmail";
import errorNotificationService from "@/services/error-notifications";
import type { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_RESEND_API_KEY);
const fromEmail = `${process.env.NEXT_PUBLIC_RESEND_FROM_EMAIL}`;
const salesEmail = `${process.env.NEXT_PUBLIC_RESEND_SALES_EMAIL}`.split(", ");
const replyEmails = `${process.env.NEXT_PUBLIC_RESEND_REPLY_EMAILS}`.split(
  ", "
);
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
      console.error(`Missing environment variables: ${missingVars.join(", ")}`);

      // Send error notification
      await errorNotificationService.notifyApiError(
        "email",
        "/api/send-client-email",
        new Error(`Missing environment variables: ${missingVars.join(", ")}`),
        { missingVars, endpoint: "send-client-email" }
      );

      return new Response(
        JSON.stringify({ error: "Email configuration missing" }),
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
      reply_to: replyEmails || "dan@grandfandb.com",
      subject: `${testText}Inquiry confirmation: ${
        formState.event_name?.value || "Grand LB Event"
      }`,
      react: ClientEmail(formState),
    });

    /**
     * Send email to the sales team using the ReSend client
     */
    await resend.emails.send({
      from: fromEmail,
      to: salesEmail,
      reply_to: formState.email?.value,
      subject: `${testText}New inquiry from ${
        formState.full_name?.value || "Grand LB Website"
      }`,
      react: SalesEmail(formState),
    });

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error(error);

    // Send error notification
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

    return new Response(JSON.stringify({ message: "Failed to send email" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
