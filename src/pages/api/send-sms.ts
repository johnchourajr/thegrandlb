import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

type SmsResponse = {
  message: string;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SmsResponse>
): Promise<void> {
  const accountSid: string = process.env.NEXT_TWILIO_ACCOUNT_SID;
  const authToken: string = process.env.NEXT_TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  const { to, message } = req.body;

  try {
    await client.messages.create({
      body: message,
      from: process.env.NEXT_TWILIO_PHONE_NUMBER,
      to: to,
    });

    res.status(200).json({ message: "SMS message sent", data: null });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to send SMS message", data: error });
  }
}
