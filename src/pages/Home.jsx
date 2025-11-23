import { Link } from "react-router-dom";
import kosList from "../data/kosList";

const facilities = [
  {
    title: "Kamar Luas",
    description: "Tempat tidur queen, lemari besar, dan meja kerja nyaman.",
  },
  {
    title: "Area Komunal",
    description: "Ruang santai dengan pantry modern dan kursi empuk.",
  },
  {
    title: "Keamanan 24 Jam",
    description: "Akses kartu, CCTV, serta petugas siap sedia.",
  },
];

const testimonials = [
  {
    name: "Rafi Hidayat",
    role: "Product Designer",
    message:
      "KosGue membantu saya menemukan kos dekat kantor dalam waktu singkat. Proses bookingnya simpel banget",
  },
  {
    name: "Anisa Putri",
    role: "Mahasiswi",
    message:
      "Desain kamarnya cantik banget, cocok buat produktif dan istirahat. Admin kos sangat responsif.",
  },
  {
    name: "Rio Pratama",
    role: "Software Engineer",
    message:
      "Aplikasi ini bikin hunting kos jadi seru. Saya bisa lihat review, fasilitas, sampai simulasi biaya sekaligus.",
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-cream font-sans text-dark">
      <header className="relative bg-dark">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="text-2xl font-serif font-bold tracking-tight text-gold">
              KosGue
            </div>
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/80">
              <a href="#tentang" className="hover:text-gold transition-colors">
                Tentang
              </a>
              <a href="#featured" className="hover:text-gold transition-colors">
                Kos Pilihan
              </a>
              <a
                href="#fasilitas"
                className="hover:text-gold transition-colors"
              >
                Fasilitas
              </a>
              <a
                href="#testimoni"
                className="hover:text-gold transition-colors"
              >
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

        <div className="relative pt-32 pb-20 px-6 min-h-[90vh] flex flex-col justify-center">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1500&q=80"
              alt="Hero Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-br from-dark/90 to-dark/50"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto w-full">
            <div className="max-w-3xl">
              <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur border border-white/20 text-gold text-xs font-bold tracking-wide uppercase mb-6">
                #SeriusNyariKos
              </span>
              <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-white leading-[1.1] mb-8">
                Temukan ruang tinggal terbaik dengan standar hotel,
                <span className="text-gold block"> kosnya KosGue.</span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-2xl mb-12">
                Dari kamar eksklusif hingga kos harian yang hangat, semua kurasi
                kami hadir dengan fasilitas moderen, interior estetis, dan
                kehangatan seperti rumah sendiri.
              </p>

              <div className="bg-white p-4 md:p-6 rounded-2xl shadow-xl shadow-black/20 grid md:grid-cols-4 gap-4 items-end">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted uppercase tracking-wider">
                    Kota
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan kota"
                    className="w-full p-3 bg-cream rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gold/50 text-dark"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted uppercase tracking-wider">
                    Tanggal masuk
                  </label>
                  <input
                    type="date"
                    className="w-full p-3 bg-cream rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gold/50 text-dark"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted uppercase tracking-wider">
                    Anggaran
                  </label>
                  <select className="w-full p-3 bg-cream rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gold/50 text-dark">
                    <option>&lt; Rp1.500.000</option>
                    <option>Rp1.500.000 - Rp2.000.000</option>
                    <option>&gt; Rp2.000.000</option>
                  </select>
                </div>
                <button className="w-full p-3 bg-gold text-dark font-bold rounded-lg hover:bg-[#c5a575] transition-colors">
                  Cari Kos
                </button>
              </div>

              <div className="mt-16 flex items-center gap-12 border-t border-white/10 pt-8">
                <div>
                  <p className="text-3xl font-serif font-bold text-white">
                    230+
                  </p>
                  <p className="text-sm text-white/60 mt-1">
                    Kos terverifikasi
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-serif font-bold text-white">
                    4.9/5
                  </p>
                  <p className="text-sm text-white/60 mt-1">Rating penghuni</p>
                </div>
                <div>
                  <p className="text-3xl font-serif font-bold text-white">
                    15+
                  </p>
                  <p className="text-sm text-white/60 mt-1">Kota populer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section id="tentang" className="py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div className="aspect-square rounded-3xl bg-white overflow-hidden relative shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
                alt="Interior Kos"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-gold font-bold tracking-wide uppercase text-sm">
                Tentang KosGue
              </span>
              <h2 className="text-4xl font-serif font-bold text-dark mt-4 mb-6">
                Kurasi kos dengan rasa premium untuk gaya hidup modern.
              </h2>
              <p className="text-lg text-muted leading-relaxed mb-8">
                Tim kami mengunjungi langsung setiap kos untuk memastikan
                kenyamanan, keamanan, serta estetika interior yang membuatmu
                betah. Pilih tipe kamar, cek fasilitas, dan pesan langsung dari
                satu aplikasi.
              </p>
              <ul className="space-y-4">
                {[
                  "Interior hangat bernuansa earth tone.",
                  "Wi-Fi kencang, area komunal, dan layanan cleaning.",
                  "CS personal yang siap membantu 24/7.",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-dark font-medium"
                  >
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
            </div>
          </div>
        </section>

        <section id="featured" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-gold font-bold tracking-wide uppercase text-sm">
                  Kos Pilihan
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark mt-3">
                  Referensi hunian favorit minggu ini.
                </h2>
              </div>
              <button className="hidden md:block text-gold font-bold hover:text-[#c5a575] transition-colors">
                Lihat semua &rarr;
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {kosList.map((item) => (
                <article
                  key={item.name}
                  className="group bg-cream rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-4/3 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-dark shadow-sm">
                      {item.rating} ★
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
                      className="block w-full py-3 text-center bg-white text-dark font-bold rounded-xl hover:bg-gray-50 transition-colors border border-gray-100"
                    >
                      Detail Kos
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 text-center md:hidden">
              <button className="text-gold font-bold hover:text-[#c5a575] transition-colors">
                Lihat semua &rarr;
              </button>
            </div>
          </div>
        </section>

        <section id="fasilitas" className="py-24 bg-dark text-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <span className="text-gold font-bold tracking-wide uppercase text-sm">
              Fasilitas Andalan
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mt-3 mb-16">
              Kami pastikan setiap kos lengkap dan siap huni.
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {facilities.map((item) => (
                <article
                  key={item.title}
                  className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <h3 className="text-xl font-serif font-bold mb-4 text-gold">
                    {item.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="testimoni" className="py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-gold font-bold tracking-wide uppercase text-sm">
                Cerita Penghuni
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark mt-3">
                Testimoni hangat dari komunitas KosGue.
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((item) => (
                <article
                  key={item.name}
                  className="bg-white p-8 rounded-2xl shadow-sm"
                >
                  <div className="flex gap-1 text-gold mb-6">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-muted leading-relaxed mb-6">
                    “{item.message}”
                  </p>
                  <div>
                    <h3 className="font-bold text-dark">{item.name}</h3>
                    <span className="text-sm text-muted">{item.role}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-gold text-dark">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <span className="text-dark/60 font-bold tracking-wide uppercase text-sm">
              Siap pindah?
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6">
              Tinggal pilih kos, kami bantu urus sisanya.
            </h2>
            <p className="text-xl text-dark/80 max-w-2xl mx-auto mb-12">
              Hubungi konsultan KosGue dan dapatkan rekomendasi personal sesuai
              gaya hidup, budget, dan lokasi impianmu.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-dark text-white font-bold rounded-full hover:bg-black transition-colors shadow-lg">
                Hubungi Konsultan
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-transparent text-dark font-bold rounded-full hover:bg-white/20 transition-colors border border-dark">
                Eksplor semua kos
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 py-12">
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

export default Home;
