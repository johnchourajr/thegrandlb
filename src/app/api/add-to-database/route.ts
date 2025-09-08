import { formatPhoneForDatabase } from "@/utils/phone-formatter";
import { formatDate } from "@/utils/utils";
import type { NextRequest } from "next/server";
import db, { isConnected } from "../../../services/db";

const TABLE = process.env.NEXT_PUBLIC_DATABASE_TABLE || "glb_submissions";

type FormData = {
  full_name: string;
  email: string;
  phone: string;
  event_name: string;
  event_type: string;
  head_count: string | number;
  desired_date: string;
  desired_time: string;
  desired_space: string;
  additional_details: string;
  [key: string]: string | number;
};

export async function POST(request: NextRequest) {
  try {
    // Check required environment variables
    if (!process.env.NEXT_DATABASE_URL) {
      console.error("NEXT_DATABASE_URL environment variable is not set");
      return new Response(
        JSON.stringify({ error: "Database configuration missing" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check database connection
    if (!isConnected) {
      console.error("Database is not connected");
      // Temporary: Try to proceed anyway to see if it's just our connection check being too strict
      console.warn(
        "Proceeding despite connection check failure - this is temporary for debugging"
      );
      // return new Response(
      //   JSON.stringify({ error: "Database connection unavailable" }),
      //   { status: 503, headers: { "Content-Type": "application/json" } }
      // );
    }

    const body: FormData = await request.json();

    const { phone, desired_date, head_count, ...formData } = body;
    const formattedPhone = formatPhoneForDatabase(phone);
    const formattedDate = formatDate(desired_date);

    const fields = {
      phone: formattedPhone,
      desired_date: formattedDate,
      head_count: String(head_count), // Ensure head_count is a string
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

    return new Response(
      JSON.stringify({ message: "Data inserted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error inserting data:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : "No stack trace",
    });

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Internal server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
