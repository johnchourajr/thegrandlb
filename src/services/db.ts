import { Client } from "pg";

const connectionString = process.env.NEXT_DATABASE_URL;
const db = new Client({ connectionString });

db.connect()
  .then(() => console.log("Connected to the database"))
  .catch((error) => console.error("Error connecting to the database", error));

export default db;
