import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

const accountSid: string | undefined = process.env.NEXT_TWILIO_ACCOUNT_SID;
const authToken: string | undefined = process.env.NEXT_TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { phone = "", formState = {} } = req.body;

    await client.messages.create({
      body: `Your inquiry for ${formState.event_name.value} the The Grand Long Beach has been received. We will be in touch soon.`,
      from: process.env.NEXT_TWILIO_PHONE_NUMBER,
      to: phone.value,
    });

    res.status(200).json({ message: "SMS message sent", data: null });
  } catch (error) {
    // console.log(error);
    res
      .status(500)
      .json({ message: "Failed to send SMS message", data: error });
  }
}
