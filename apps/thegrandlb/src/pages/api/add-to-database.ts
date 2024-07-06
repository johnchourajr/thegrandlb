import { formatPhoneForDatabase } from "@/components/form/InputPhone";
import { formatDate } from "@/utils/utils";
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../services/db"; // Update the path accordingly

const TABLE = process.env.NEXT_PUBLIC_DATABASE_TABLE || "glb_submissions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  } else {
    // Your form data from the request body
    const { phone, desired_date, ...formData } = req.body;
    const formattedPhone = formatPhoneForDatabase(phone);
    const formattedDate = formatDate(desired_date);

    const fields = {
      phone: formattedPhone,
      desired_date: formattedDate,
      created_date: new Date().toISOString(),
      ...formData,
    };

    try {
      // Map form data to fields

      const sqlCommand = `INSERT INTO ${TABLE} (full_name, email, phone, event_name, event_type, head_count, desired_date, desired_time, desired_space, additional_details, created_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;

      await db.query(sqlCommand, [
        fields.full_name,
        fields.email,
        fields.phone,
        fields.event_name,
        fields.event_type,
        fields.head_count,
        fields.desired_date,
        fields.desired_time,
        fields.desired_space,
        fields.additional_details,
        fields.created_date,
      ]);

      res.status(200).json({ message: "Data inserted successfully" });
    } catch (error: any) {
      console.error("Error inserting data:", error);
      res.status(500).json({ error, fields, message: "Internal server error" });
    }
  }
}
