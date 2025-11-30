const { Pool } = require("pg");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const isProduction = process.env.NODE_ENV === "production";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL is not defined in .env");
} else {
  console.log(
    "Attempting to connect to DB:",
    connectionString.replace(/:[^:@]+@/, ":****@")
  );
}

const pool = new Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }, // Force allow self-signed certs for Supabase
});

pool.on("connect", () => {
  console.log("Connected to the database");
});

module.exports = pool;
