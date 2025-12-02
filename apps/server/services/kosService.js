const pool = require("../config/db");

const getAllKos = async () => {
  const result = await pool.query("SELECT * FROM kos");
  return result.rows.map((row) => ({
    ...row,
    owner: {
      name: row.owner_name,
      phone: row.owner_phone,
      whatsapp: row.owner_whatsapp,
    },
  }));
};

const getKosByOwner = async (ownerId) => {
  const result = await pool.query("SELECT * FROM kos WHERE owner_id = $1", [
    ownerId,
  ]);
  return result.rows.map((row) => ({
    ...row,
    owner: {
      name: row.owner_name,
      phone: row.owner_phone,
      whatsapp: row.owner_whatsapp,
    },
  }));
};

const getKosBySlug = async (slug) => {
  const result = await pool.query("SELECT * FROM kos WHERE slug = $1", [slug]);
  if (result.rows.length === 0) {
    return null;
  }
  const row = result.rows[0];

  const reviewsResult = await pool.query(
    "SELECT r.*, u.username FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.kos_slug = $1 ORDER BY r.created_at DESC",
    [slug]
  );

  return {
    ...row,
    owner: {
      name: row.owner_name,
      phone: row.owner_phone,
      whatsapp: row.owner_whatsapp,
    },
    reviewsList: reviewsResult.rows,
  };
};

const addReview = async (slug, userId, rating, comment) => {
  await pool.query(
    "INSERT INTO reviews (kos_slug, user_id, rating, comment) VALUES ($1, $2, $3, $4)",
    [slug, userId, rating, comment]
  );

  const statsResult = await pool.query(
    "SELECT COUNT(*) as count, AVG(rating) as average FROM reviews WHERE kos_slug = $1",
    [slug]
  );

  const count = parseInt(statsResult.rows[0].count);
  const average = parseFloat(statsResult.rows[0].average).toFixed(1);

  await pool.query("UPDATE kos SET rating = $1, reviews = $2 WHERE slug = $3", [
    average,
    count,
    slug,
  ]);

  return { rating: average, reviews: count };
};

const createKos = async (data) => {
  const {
    slug,
    name,
    city,
    price,
    image,
    summary,
    size,
    capacity,
    rating,
    reviews,
    facilities,
    services,
    gallery,
    owner,
    latitude,
    longitude,
    owner_id,
  } = data;

  const query = `
    INSERT INTO kos (
      slug, name, city, price, image, summary, size, capacity, rating, reviews, 
      facilities, services, gallery, owner_name, owner_phone, owner_whatsapp,
      latitude, longitude, owner_id
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
    RETURNING *
  `;

  const values = [
    slug,
    name,
    city,
    price,
    image,
    summary,
    size,
    capacity,
    rating || 0,
    reviews || 0,
    facilities || [],
    services || [],
    gallery || [],
    owner?.name || null,
    owner?.phone || null,
    owner?.whatsapp || null,
    latitude || null,
    longitude || null,
    owner_id || null,
  ];

  const result = await pool.query(query, values);
  const row = result.rows[0];
  return {
    ...row,
    owner: {
      name: row.owner_name,
      phone: row.owner_phone,
      whatsapp: row.owner_whatsapp,
    },
  };
};

const updateKos = async (slug, data) => {
  const {
    name,
    city,
    price,
    image,
    summary,
    size,
    capacity,
    facilities,
    services,
    gallery,
    owner,
    latitude,
    longitude,
  } = data;

  const query = `
    UPDATE kos SET
      name = $1, city = $2, price = $3, image = $4, summary = $5, size = $6, capacity = $7,
      facilities = $8, services = $9, gallery = $10, owner_name = $11, owner_phone = $12, owner_whatsapp = $13,
      latitude = $14, longitude = $15
    WHERE slug = $16
    RETURNING *
  `;

  const values = [
    name,
    city,
    price,
    image,
    summary,
    size,
    capacity,
    facilities || [],
    services || [],
    gallery || [],
    owner?.name || null,
    owner?.phone || null,
    owner?.whatsapp || null,
    latitude || null,
    longitude || null,
    slug,
  ];

  const result = await pool.query(query, values);
  if (result.rows.length === 0) return null;

  const row = result.rows[0];
  return {
    ...row,
    owner: {
      name: row.owner_name,
      phone: row.owner_phone,
      whatsapp: row.owner_whatsapp,
    },
  };
};

const deleteKos = async (slug) => {
  const result = await pool.query(
    "DELETE FROM kos WHERE slug = $1 RETURNING *",
    [slug]
  );
  return result.rows[0];
};

module.exports = {
  getAllKos,
  getKosByOwner,
  getKosBySlug,
  createKos,
  updateKos,
  deleteKos,
  addReview,
};
