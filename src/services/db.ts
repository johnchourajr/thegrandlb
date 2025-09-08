import { Client } from "pg";

const connectionString = process.env.NEXT_DATABASE_URL;

if (!connectionString) {
  console.error("NEXT_DATABASE_URL environment variable is not set");
}

const db = new Client({ connectionString });

// Add connection timeout and error handling
let isConnected = false;

const connectWithTimeout = async () => {
  try {
    console.log("Attempting database connection...");
    console.log("Connection string exists:", !!connectionString);
    console.log(
      "Connection string preview:",
      connectionString ? `${connectionString.substring(0, 20)}...` : "MISSING"
    );

    await Promise.race([
      db.connect(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Connection timeout")), 10000)
      ),
    ]);
    isConnected = true;
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : "No stack trace",
    });
    isConnected = false;
  }
};

connectWithTimeout();

// Export both the client and connection status
export default db;
export { isConnected };
