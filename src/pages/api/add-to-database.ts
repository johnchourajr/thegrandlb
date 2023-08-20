import { formatPhoneForDatabase } from "@/components/form/InputPhone";
import { formatDate } from "@/utils/utils";
import Airtable from "airtable";
import { NextApiRequest, NextApiResponse } from "next";

// const API_KEY = process.env.NEXT_AIRTABLE_API_KEY;
const API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
const BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || "";
const TABLE = process.env.NEXT_PUBLIC_AIRTABLE_TABLE || "submissions";
const base = new Airtable({ apiKey: API_KEY }).base(BASE_ID);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).end(); // Method Not Allowed
    return;
  } else {
    // Your form data from the request body
    const { phone, desired_date, ...formData } = req.body;
    const formattedPhone = formatPhoneForDatabase(phone);
    const formattedDate = formatDate(desired_date);

    try {
      // Map form data to fields
      const fields = {
        phone: formattedPhone,
        desired_date: formattedDate,
        ...formData,
      };

      // Create a new record in Airtable
      const createdRecord = await base(TABLE).create([{ fields }]);

      res.status(200).json({
        message: "Record created successfully",
        record: createdRecord,
      });
    } catch (error: any) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ message: "An error occurred", error: error.message });
    }
  }
}
