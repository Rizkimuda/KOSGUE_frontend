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

const getKosBySlug = async (slug) => {
  const result = await pool.query("SELECT * FROM kos WHERE slug = $1", [slug]);
  if (result.rows.length === 0) {
    return null;
  }
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
  } = data;

  const query = `
    INSERT INTO kos (
      slug, name, city, price, image, summary, size, capacity, rating, reviews, 
      facilities, services, gallery, owner_name, owner_phone, owner_whatsapp
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
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
  } = data;

  const query = `
    UPDATE kos SET
      name = $1, city = $2, price = $3, image = $4, summary = $5, size = $6, capacity = $7,
      facilities = $8, services = $9, gallery = $10, owner_name = $11, owner_phone = $12, owner_whatsapp = $13
    WHERE slug = $14
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
  getKosBySlug,
  createKos,
  updateKos,
  deleteKos,
};
