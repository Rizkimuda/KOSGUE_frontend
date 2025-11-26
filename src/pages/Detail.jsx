import { Link, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import kosList from "../data/kosList";
import { formatPrice } from "../utils/formatPrice";

function Detail() {
  const { slug } = useParams();
  const { getKosList } = useAuth();
  
  // Combine default kosList with user-added kos
  const userAddedKos = getKosList ? getKosList() : [];
  const allKosList = [...kosList, ...userAddedKos];
  const kos = allKosList.find((item) => item.slug === slug);

  if (!kos) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-6">
            Ups, kos yang kamu cari tidak ditemukan.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors"
          >
            Kembali ke beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream font-sans text-dark pb-24">
      <div className="relative h-[50vh] min-h-[400px] bg-dark">
        <img
          src={kos.image}
          alt={kos.name}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-linear-to-t from-dark/90 via-dark/40 to-transparent flex items-end pb-12">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <Link
              to="/"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors font-medium"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
              Beranda
            </Link>
            <p className="text-gold font-bold tracking-wide uppercase text-sm mb-2">
              Kos Eksklusif
            </p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              {kos.name}
            </h1>
            <p className="text-xl text-white/80 mb-8 flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              {kos.city}
            </p>
            <div className="flex flex-wrap gap-8 text-white">
              <div className="flex items-center gap-3">
                <div className="bg-gold text-dark font-bold px-2 py-1 rounded text-sm">
                  {kos.rating} ★
                </div>
                <span className="text-sm text-white/80">
                  {kos.reviews} review
                </span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-white/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  ></path>
                </svg>
                <div>
                  <p className="font-bold">{kos.size}</p>
                  <span className="text-xs text-white/60">Luas kamar</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-white/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
                <div>
                  <p className="font-bold">{kos.capacity}</p>
                  <span className="text-xs text-white/60">Kapasitas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12 py-12">
        <div className="lg:col-span-2 space-y-12">
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-serif font-bold text-dark mb-4">
              Ringkasan
            </h2>
            <p className="text-muted leading-relaxed text-lg">{kos.summary}</p>
          </section>

          <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-serif font-bold text-dark mb-6">
              Fasilitas Kamar
            </h2>
            <div className="flex flex-wrap gap-3">
              {kos.facilities.map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 bg-cream text-dark rounded-lg font-medium text-sm border border-gold/20"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-serif font-bold text-dark mb-6">
              Layanan Tambahan
            </h2>
            <ul className="grid sm:grid-cols-2 gap-4">
              {kos.services.map((item) => (
                <li key={item} className="flex items-center gap-3 text-muted">
                  <svg
                    className="w-5 h-5 text-gold shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-dark mb-6">
              Galeri
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {kos.gallery.map((url) => (
                <img
                  key={url}
                  src={url}
                  alt={kos.name}
                  className="w-full h-64 object-cover rounded-xl shadow-sm hover:shadow-md transition-shadow"
                />
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-xl shadow-black/5 border border-gray-100">
            <div className="mb-6">
              <p className="text-sm text-muted mb-1">Mulai dari</p>
              <p className="text-3xl font-serif font-bold text-gold">
                {formatPrice(kos.price)}
              </p>
              <p className="text-xs text-muted mt-2">
                Harga sudah termasuk listrik, air, dan layanan kebersihan.
              </p>
            </div>

            <button className="w-full py-4 bg-gold text-dark font-bold rounded-xl hover:bg-[#c5a575] transition-colors shadow-lg shadow-gold/20 mb-8">
              Ajukan Booking
            </button>

            <div className="border-t border-gray-100 pt-6">
              <p className="text-xs font-bold text-muted uppercase tracking-wider mb-4">
                Pengelola
              </p>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center text-xl font-bold text-gold border border-gold/20">
                  {kos.owner.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-dark">{kos.owner.name}</h3>
                  <p className="text-sm text-muted">{kos.owner.phone}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${kos.owner.phone}`}
                  className="flex items-center justify-center py-2.5 border border-gray-200 rounded-lg text-sm font-bold text-muted hover:bg-gray-50 transition-colors"
                >
                  Telepon
                </a>
                <a
                  href={kos.owner.whatsapp}
                  className="flex items-center justify-center py-2.5 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20"
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Detail;
