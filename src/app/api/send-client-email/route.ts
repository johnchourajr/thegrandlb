import ClientEmail from "@/emails/clientEmail";
import SalesEmail from "@/emails/salesEmail";
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
  try {
    const body: RequestBody = await request.json();
    const { email = "", formState = {} } = body;

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
    return new Response(JSON.stringify({ message: "Failed to send email" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
