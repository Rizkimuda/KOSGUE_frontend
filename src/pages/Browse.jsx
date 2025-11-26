import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import kosList from "../data/kosList";

const parsePrice = (price) => {
  if (!price) return 0;
  const match = price.match(/Rp([\d.]+)/);
  if (!match) return 0;
  return Number(match[1].replace(/\./g, ""));
};

const budgetRanges = {
  all: [0, Infinity],
  under1500: [0, 1500000],
  mid: [1500000, 1800000],
  above1800: [1800000, Infinity],
};

const ratingThreshold = {
  all: 0,
  "4.5": 4.5,
  "4.7": 4.7,
  "4.9": 4.9,
};

function Browse() {
  const [search, setSearch] = useState("");
  const [budget, setBudget] = useState("all");
  const [facility, setFacility] = useState("all");
  const [rating, setRating] = useState("all");
  const [sort, setSort] = useState("popularity");

  const facilityOptions = useMemo(() => {
    const unique = new Set();
    kosList.forEach((kos) => kos.facilities?.forEach((item) => unique.add(item)));
    return Array.from(unique);
  }, []);

  const filteredKos = useMemo(() => {
    return [...kosList]
      .filter((kos) => {
        if (search) {
          const keyword = search.toLowerCase();
          const haystack = `${kos.name} ${kos.city} ${kos.summary}`.toLowerCase();
          if (!haystack.includes(keyword)) return false;
        }

        if (facility !== "all" && !kos.facilities?.includes(facility)) {
          return false;
        }

        if (rating !== "all" && kos.rating < ratingThreshold[rating]) {
          return false;
        }

        const [min, max] = budgetRanges[budget];
        const value = parsePrice(kos.price);
        if (value < min || value > max) return false;

        return true;
      })
      .sort((a, b) => {
        if (sort === "price_low_high") {
          return parsePrice(a.price) - parsePrice(b.price);
        }
        if (sort === "price_high_low") {
          return parsePrice(b.price) - parsePrice(a.price);
        }
        if (sort === "rating") {
          return b.rating - a.rating;
        }
        return b.reviews - a.reviews;
      });
  }, [search, budget, facility, rating, sort]);

  return (
    <div className="min-h-screen bg-cream font-sans text-dark">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-serif font-bold tracking-tight text-gold"
          >
            KosGue
          </Link>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/80">
            <Link to="/browse" className="text-gold">
              Browse Kos
            </Link>
            <a href="/#featured" className="hover:text-gold transition-colors">
              Kos Pilihan
            </a>
            <a href="/#fasilitas" className="hover:text-gold transition-colors">
              Fasilitas
            </a>
            <a href="/#testimoni" className="hover:text-gold transition-colors">
              Testimoni
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-sm font-medium text-white hover:text-gold transition-colors"
            >
              Masuk
            </Link>
            <Link
              to="/register"
              className="px-5 py-2.5 text-sm font-medium text-dark bg-gold rounded-full hover:bg-[#c5a575] transition-colors shadow-lg shadow-gold/20"
            >
              Daftar
            </Link>
          </div>
        </div>
      </nav>

      <header className="relative bg-dark pt-32 pb-20 px-6">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1400&q=80"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-br from-dark/90 via-dark/70 to-dark/50"></div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center text-white">
          <p className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-xs font-bold tracking-wide uppercase mb-6">
            Jelajah Kos
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-6">
            Filter dan temukan kos yang pas dengan gaya hidupmu.
          </h1>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed">
            Susun preferensi harga, fasilitas, hingga rating sebelum bertemu
            langsung dengan pemilik. Kami kurasi setiap listing agar kamu bisa
            fokus pada detail penting saja.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16 space-y-12">
        <section className="bg-white rounded-3xl shadow-xl shadow-black/5 p-6 md:p-8 -mt-24 relative z-10">
          <div className="flex flex-col gap-8">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-muted uppercase tracking-wider">
                  Cari nama atau lokasi
                </label>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Contoh: Medan Baru, Harmoni..."
                  className="w-full mt-2 p-3.5 bg-cream rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-muted uppercase tracking-wider">
                  Anggaran
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full mt-2 p-3.5 bg-cream rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                >
                  <option value="all">Semua harga</option>
                  <option value="under1500">&lt; Rp1.500.000</option>
                  <option value="mid">Rp1.500.000 - Rp1.800.000</option>
                  <option value="above1800">&gt; Rp1.800.000</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-muted uppercase tracking-wider">
                  Fasilitas
                </label>
                <select
                  value={facility}
                  onChange={(e) => setFacility(e.target.value)}
                  className="w-full mt-2 p-3.5 bg-cream rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                >
                  <option value="all">Semua fasilitas</option>
                  {facilityOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="text-xs font-bold text-muted uppercase tracking-wider">
                  Minimal rating
                </label>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full mt-2 p-3.5 bg-cream rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                >
                  <option value="all">Semua rating</option>
                  <option value="4.5">≥ 4.5</option>
                  <option value="4.7">≥ 4.7</option>
                  <option value="4.9">≥ 4.9</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-muted uppercase tracking-wider">
                  Urutkan
                </label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full mt-2 p-3.5 bg-cream rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                >
                  <option value="popularity">Paling populer</option>
                  <option value="rating">Rating tertinggi</option>
                  <option value="price_low_high">Harga terendah</option>
                  <option value="price_high_low">Harga tertinggi</option>
                </select>
              </div>
              <div className="bg-cream rounded-2xl p-4 flex flex-col justify-center">
                <p className="text-xs font-semibold text-muted uppercase tracking-wider">
                  Hasil kurasi
                </p>
                <p className="text-3xl font-serif font-bold text-dark">
                  {filteredKos.length}
                </p>
                <p className="text-sm text-muted">
                  dari {kosList.length} kos terverifikasi
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          {filteredKos.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-inner p-12 text-center">
              <p className="text-2xl font-serif font-semibold text-dark mb-2">
                Kos belum ditemukan
              </p>
              <p className="text-muted">
                Coba hapus beberapa filter atau cari dengan kata kunci lain.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {filteredKos.map((kos) => (
                <article
                  key={kos.slug}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-black/5 flex flex-col"
                >
                  <div className="relative h-64">
                    <img
                      src={kos.image}
                      alt={kos.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-xs font-semibold text-dark">
                      {kos.city}
                    </div>
                    <div className="absolute top-4 right-4 bg-dark/80 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <span>⭐</span>
                      {kos.rating} • {kos.reviews}+ ulasan
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col gap-4">
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-2xl font-serif font-bold text-dark">
                          {kos.name}
                        </h3>
                        <p className="text-sm font-semibold text-gold whitespace-nowrap">
                          {kos.price}
                        </p>
                      </div>
                      <p className="text-muted mt-2">{kos.summary}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {kos.facilities?.slice(0, 3).map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1 rounded-full bg-cream text-xs font-semibold text-dark"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="px-6 pb-6 flex flex-wrap items-center gap-4 justify-between border-t border-gray-100 pt-4">
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wide">
                        Pemilik
                      </p>
                      <p className="font-semibold text-dark">{kos.owner?.name}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <a
                        href={kos.owner?.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 text-sm font-semibold text-dark border border-dark/20 rounded-full hover:bg-dark hover:text-white transition-colors"
                      >
                        Chat pemilik
                      </a>
                      <Link
                        to={`/kos/${kos.slug}`}
                        className="px-4 py-2 text-sm font-semibold text-white bg-gold rounded-full hover:bg-[#c5a575] transition-colors"
                      >
                        Lihat detail
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Browse;

