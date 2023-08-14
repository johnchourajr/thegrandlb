import Airtable from "airtable";
import { NextApiRequest, NextApiResponse } from "next";

const API_KEY = process.env.NEXT_AIRTABLE_API_KEY;
const BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || "";
const base = new Airtable({ apiKey: API_KEY }).base(BASE_ID);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  // Your form data from the request body
  const formData = req.body;

  try {
    const table = "submissions";

    // Map form data to fields
    const fields = {
      ...formData,
    };

    // Create a new record in Airtable
    const createdRecord = await base(table).create([{ fields }]);

    res
      .status(200)
      .json({ message: "Record created successfully", record: createdRecord });

    res.status(200).json({ message: "Record created successfully" });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
}
