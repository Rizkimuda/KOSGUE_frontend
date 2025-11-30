const pool = require("./config/db");

const createReviewsTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        kos_slug TEXT REFERENCES kos(slug) ON DELETE CASCADE,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("Reviews table created successfully");
  } catch (err) {
    console.error("Error creating reviews table:", err);
  } finally {
    pool.end();
  }
};

createReviewsTable();
