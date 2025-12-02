import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getKosList, upgradeToOwner } from "../services/api";
import { CITIES } from "../utils/constants";

function AllKos() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [kosList, setKosList] = useState([]);
  const [filteredKosList, setFilteredKosList] = useState([]);
  const [user, setUser] = useState(null);
  const [searchCity, setSearchCity] = useState(searchParams.get("city") || "");
  const [searchPrice, setSearchPrice] = useState(
    searchParams.get("price") || ""
  );
  const [sortBy, setSortBy] = useState("rating"); // rating, price-asc, price-desc

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchData = async () => {
      try {
        const data = await getKosList();
        setKosList(data);
        setFilteredKosList(data);
      } catch (error) {
        console.error("Error fetching kos list:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let results = [...kosList];

    // Filter by city
    if (searchCity) {
      results = results.filter((kos) =>
        kos.city.toLowerCase().includes(searchCity.toLowerCase())
      );
    }

    // Filter by price
    if (searchPrice) {
      results = results.filter((kos) => {
        const price = parseInt(kos.price.replace(/\D/g, ""));
        if (searchPrice === "<1.5") {
          return price < 1500000;
        } else if (searchPrice === "1.5-2") {
          return price >= 1500000 && price <= 2000000;
        } else if (searchPrice === ">2") {
          return price > 2000000;
        }
        return true;
      });
    }

    // Sort results
    results.sort((a, b) => {
      if (sortBy === "rating") {
        return parseFloat(b.rating || 0) - parseFloat(a.rating || 0);
      } else if (sortBy === "price-asc") {
        const priceA = parseInt(a.price.replace(/\D/g, ""));
        const priceB = parseInt(b.price.replace(/\D/g, ""));
        return priceA - priceB;
      } else if (sortBy === "price-desc") {
        const priceA = parseInt(a.price.replace(/\D/g, ""));
        const priceB = parseInt(b.price.replace(/\D/g, ""));
        return priceB - priceA;
      }
      return 0;
    });

    setFilteredKosList(results);
  }, [kosList, searchCity, searchPrice, sortBy]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  const handleUpgradeToOwner = async () => {
    if (window.confirm("Apakah Anda yakin ingin menjadi Juragan Kos?")) {
      try {
        await upgradeToOwner();
        // Update local storage and state
        const newUser = { ...user, role: "owner" };
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
        alert("Selamat! Anda sekarang adalah Juragan Kos.");
      } catch (error) {
        console.error("Error upgrading to owner:", error);
        alert("Gagal upgrade ke owner: " + error.message);
      }
    }
  };

  const handleReset = () => {
    setSearchCity("");
    setSearchPrice("");
    setSortBy("rating");
    setSearchParams({});
  };

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchCity) {
      params.set("city", searchCity);
    }
    if (searchPrice) {
      params.set("price", searchPrice);
    }
    setSearchParams(params, { replace: true });
  }, [searchCity, searchPrice, setSearchParams]);

  return (
    <div className="min-h-screen bg-cream font-sans text-dark">
      <header className="bg-dark">
        <nav className="bg-dark/80 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link
              to="/"
              className="text-2xl font-serif font-bold tracking-tight text-gold hover:text-white transition-colors"
            >
              KosGue
            </Link>
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/80">
              <Link to="/" className="hover:text-gold transition-colors">
                Beranda
              </Link>
              <Link to="/all-kos" className="hover:text-gold transition-colors">
                Semua Kos
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-white/90 font-medium">
                    Halo, {user.username}
                  </span>
                  {user.role === "admin" && (
                    <Link
                      to="/admin"
                      className="text-sm font-medium text-gold hover:text-white transition-colors"
                    >
                      Dashboard
                    </Link>
                  )}
                  {user.role === "owner" && (
                    <Link
                      to="/owner"
                      className="text-sm font-medium text-gold hover:text-white transition-colors"
                    >
                      Owner Dashboard
                    </Link>
                  )}
                  {user.role === "user" && (
                    <button
                      onClick={handleUpgradeToOwner}
                      className="text-sm font-medium text-gold hover:text-white transition-colors"
                    >
                      Jadi Juragan Kos
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="px-5 py-2.5 text-sm font-medium text-dark bg-gold rounded-full hover:bg-[#c5a575] transition-colors shadow-lg shadow-gold/20"
                  >
                    Keluar
                  </button>
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted uppercase tracking-wider">
                  Kota
                </label>
                <select
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="w-full p-2.5 bg-cream rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gold/50 text-dark"
                >
                  <option value="">Semua Kota</option>
                  {CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted uppercase tracking-wider">
                  Budget
                </label>
                <select
                  value={searchPrice}
                  onChange={(e) => setSearchPrice(e.target.value)}
                  className="w-full p-2.5 bg-cream rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gold/50 text-dark"
                >
                  <option value="">Semua Harga</option>
                  <option value="<1.5">&lt; Rp1.500.000</option>
                  <option value="1.5-2">Rp1.500.000 - Rp2.000.000</option>
                  <option value=">2">&gt; Rp2.000.000</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted uppercase tracking-wider">
                  Urutkan
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2.5 bg-cream rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gold/50 text-dark"
                >
                  <option value="rating">Rating Tertinggi</option>
                  <option value="price-asc">Harga Terendah</option>
                  <option value="price-desc">Harga Tertinggi</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted uppercase tracking-wider">
                  Aksi
                </label>
                <button
                  onClick={handleReset}
                  className="w-full p-2.5 bg-gray-100 text-dark font-bold rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {filteredKosList.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredKosList.map((item) => (
                <article
                  key={item.slug || item.name}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-4/3 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-dark shadow-sm">
                      {item.rating || 0} ★
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm font-medium text-muted mb-2">
                      {item.city}
                    </p>
                    <h3 className="text-xl font-serif font-bold text-dark mb-2 group-hover:text-gold transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-gold font-bold mb-6">{item.price}</p>
                    <Link
                      to={`/kos/${item.slug}`}
                      className="block w-full py-3 text-center bg-cream text-dark font-bold rounded-xl hover:bg-gold hover:text-white transition-colors border border-gray-100"
                    >
                      Detail Kos
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
              <p className="text-xl text-muted mb-4">
                Tidak ada kos yang sesuai dengan kriteria pencarian.
              </p>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-gold text-dark font-bold rounded-lg hover:bg-[#c5a575] transition-colors"
              >
                Reset Pencarian
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-muted text-sm">
            © {new Date().getFullYear()} KosGue. Semua hak dilindungi.
          </p>
          <div className="flex items-center gap-6 text-sm font-medium text-muted">
            <a href="#" className="hover:text-gold transition-colors">
              Kebijakan Privasi
            </a>
            <span className="text-gray-300">•</span>
            <a href="#" className="hover:text-gold transition-colors">
              Pusat Bantuan
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AllKos;
