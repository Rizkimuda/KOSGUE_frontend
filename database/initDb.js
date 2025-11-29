const pool = require("../apps/server/config/db");

const createTables = async () => {
  try {
    // Create Users Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create Kos Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS kos (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        price VARCHAR(255) NOT NULL,
        image TEXT NOT NULL,
        summary TEXT,
        size VARCHAR(100),
        capacity VARCHAR(100),
        rating DECIMAL(3, 1) DEFAULT 0,
        reviews INTEGER DEFAULT 0,
        facilities TEXT[],
        services TEXT[],
        gallery TEXT[],
        owner_name VARCHAR(255),
        owner_phone VARCHAR(50),
        owner_whatsapp VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Tables created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error creating tables:", error);
    process.exit(1);
  }
};

createTables();
