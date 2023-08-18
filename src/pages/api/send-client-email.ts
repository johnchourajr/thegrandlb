import ClientEmail from "@/emails/clientEmail";
import SalesEmail from "@/emails/salesEmail";
import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_RESEND_API_KEY);
const fromEmail = `${process.env.NEXT_PUBLIC_RESEND_FROM_EMAIL}`;
const salesEmail = `${process.env.NEXT_PUBLIC_RESEND_SALES_EMAIL}`.split(", ");
const replyEmails = `${process.env.NEXT_PUBLIC_RESEND_REPLY_EMAILS}`.split(
  ", "
);
const isNotProduction = process.env.NODE_ENV !== "production";
const testText = isNotProduction && `TEST: `;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email = "", formState = {} } = req.body;

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

      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to send email" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
