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
    isConnected = false;
  }
};

connectWithTimeout();

// Export both the client and connection status
export default db;
export { isConnected };
