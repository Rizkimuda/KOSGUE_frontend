const pool = require("./config/db");

const addLocationColumns = async () => {
  try {
    await pool.query(`
      ALTER TABLE kos 
      ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION,
      ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION;
    `);
    console.log("Location columns added successfully");
  } catch (err) {
    console.error("Error adding location columns:", err);
  } finally {
    pool.end();
  }
};

addLocationColumns();
