const pool = require("../apps/server/config/db");
const bcrypt = require("../apps/server/node_modules/bcryptjs");

const kosList = [
  {
    slug: "kos-melati-pb",
    name: "Kos Melati Padang Bulan",
    city: "Padang Bulan, Medan",
    price: "Rp1.350.000 / bulan",
    image:
      "https://images.unsplash.com/photo-1735461932749-e602a9f6fc82?q=80&w=1125&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    summary:
      "Kos eksklusif 7 menit ke Kampus Universitas Sumatera Utara (USU) dengan interior earth tone dan balkon menghadap taman.",
    size: "3.2 x 4.5 m",
    capacity: "1-2 orang",
    rating: 4.9,
    reviews: 124,
    facilities: [
      "AC",
      "Kamar mandi dalam",
      "Air panas",
      "Wi-Fi 100 Mbps",
      "Smart TV 43”",
    ],
    services: [
      "Laundry mingguan",
      "General cleaning",
      "Penitipan paket",
      "Satpam 24/7",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1505692794400-0d9dc9b29f46?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1000&q=80",
    ],
    owner: {
      name: "Bu Melati",
      phone: "0822-5678-2222",
      whatsapp: "https://wa.me/6282256782222",
    },
  },
  {
    slug: "kos-harmoni-usu",
    name: "Kos Harmoni Simpang Selayang",
    city: "Simpang Selayang, Medan",
    price: "Rp1.850.000 / bulan",
    image:
      "https://images.unsplash.com/photo-1617068393685-43591915c003?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    summary:
      "Hunian strategis 5 menit ke gerbang utama USU dengan lounge bersama, pantry estetik, dan coworking mini untuk mahasiswa akhir.",
    size: "3 x 4 m",
    capacity: "1 orang",
    rating: 4.8,
    reviews: 98,
    facilities: [
      "AC inverter",
      "Meja kerja ergonomis",
      "Air panas",
      "Wi-Fi 150 Mbps",
    ],
    services: [
      "Cleaning 2x seminggu",
      "Coffee bar",
      "Smart lock",
      "CCTV koridor",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1505692794400-0d9dc9b29f46?auto=format&fit=crop&w=1000&q=80",
    ],
    owner: {
      name: "Pak Hartono",
      phone: "0813-4455-9000",
      whatsapp: "https://wa.me/6281344559000",
    },
  },
  {
    slug: "kos-taman-sari-usu",
    name: "Kos Taman Sari Medan Baru",
    city: "Medan Baru, Medan",
    price: "Rp1.550.000 / bulan",
    image:
      "https://images.unsplash.com/photo-1691941209466-e981f3a192a7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    summary:
      "Kos bernuansa Japandi dengan taman kecil dan area komunal semi outdoor, hanya 10 menit jalan kaki ke Fakultas Kedokteran USU.",
    size: "3.5 x 4 m",
    capacity: "1-2 orang",
    rating: 4.7,
    reviews: 76,
    facilities: [
      "AC",
      "Kamar mandi luar bersih",
      "Wi-Fi 80 Mbps",
      "Meja kerja luas",
    ],
    services: [
      "Laundry koin",
      "Dapur bersama",
      "Parkir motor",
      "Penjaga malam",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1505692794400-0d9dc9b29f46?auto=format&fit=crop&w=1000&q=80",
    ],
    owner: {
      name: "Bu Sari",
      phone: "0812-9988-1110",
      whatsapp: "https://wa.me/6281299881110",
    },
  },
];

const seedDb = async () => {
  try {
    // Clear existing data
    await pool.query("DELETE FROM kos");
    await pool.query("DELETE FROM users WHERE email = 'admin@kosgue.com'");

    // Create Admin User
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await pool.query(
      "INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4)",
      ["Admin KosGue", "admin@kosgue.com", hashedPassword, "admin"]
    );
    console.log("Admin user created: admin@kosgue.com / admin123");

    for (const kos of kosList) {
      const query = `
        INSERT INTO kos (
          slug, name, city, price, image, summary, size, capacity, rating, reviews, 
          facilities, services, gallery, owner_name, owner_phone, owner_whatsapp
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      `;

      const values = [
        kos.slug,
        kos.name,
        kos.city,
        kos.price,
        kos.image,
        kos.summary,
        kos.size,
        kos.capacity,
        kos.rating,
        kos.reviews,
        kos.facilities,
        kos.services,
        kos.gallery,
        kos.owner.name,
        kos.owner.phone,
        kos.owner.whatsapp,
      ];

      await pool.query(query, values);
    }

    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDb();
