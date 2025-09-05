import { formatPhoneForDatabase } from "@/components/form/InputPhone";
import { formatDate } from "@/utils/utils";
import type { NextRequest } from "next/server";
import db from "../../../services/db";

const TABLE = process.env.NEXT_PUBLIC_DATABASE_TABLE || "glb_submissions";

type FormData = {
  full_name: string;
  email: string;
  phone: string;
  event_name: string;
  event_type: string;
  head_count: string;
  desired_date: string;
  desired_time: string;
  desired_space: string;
  additional_details: string;
  [key: string]: string;
};

export async function POST(request: NextRequest) {
  try {
    const body: FormData = await request.json();
    const { phone, desired_date, ...formData } = body;
    const formattedPhone = formatPhoneForDatabase(phone);
    const formattedDate = formatDate(desired_date);

    const fields = {
      phone: formattedPhone,
      desired_date: formattedDate,
      created_date: new Date().toISOString(),
      ...formData,
    };

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

    return Response.json({ message: "Data inserted successfully" });
  } catch (error) {
    console.error("Error inserting data:", error);
    return Response.json(
      { error, message: "Internal server error" },
      { status: 500 }
    );
  }
}
