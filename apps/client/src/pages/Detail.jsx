import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getKosBySlug, addReview } from "../services/api";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const BookingForm = ({ ownerPhone, kosName, harga, onClose }) => {
  const [formData, setFormData] = useState({
    nama: "",
    tanggalSurvei: "",
    waktuSurvei: "",
    rencanaSewa: "1 Tahun",
    catatan: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleKirimWA = (e) => {
    e.preventDefault();

    let formattedPhone = ownerPhone;
    if (formattedPhone.startsWith("0")) {
      formattedPhone = "62" + formattedPhone.slice(1);
    }

    const message = `Halo, saya mendapat info dari website *KosGue*.
Saya tertarik dengan kos Anda :

🏠 *${kosName}*
🔗 Link : ${window.location.href}
💰 Harga : ${harga}

Saya ingin mengajukan jadwal survei lokasi:
👤 Nama : ${formData.nama}
📅 Tgl Survei : ${formData.tanggalSurvei}
⏰ Waktu : ${formData.waktuSurvei}
⏳ Rencana Sewa : ${formData.rencanaSewa}
📝 Catatan : ${formData.catatan}

Mohon informasinya apakah unit masih tersedia dan jadwal tersebut bisa diterima?
Terima kasih.`;

    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
    onClose(); // Close the modal after opening WhatsApp
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-cream">
          <h3 className="text-xl font-serif font-bold text-dark">
            Jadwalkan Survei
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-dark transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleKirimWA} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold text-dark/70 uppercase tracking-wider mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="nama"
              onChange={handleChange}
              required
              className="w-full p-3 bg-cream border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold/20 focus:border-gold outline-none transition-all text-dark placeholder-gray-400"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-dark/70 uppercase tracking-wider mb-2">
              Tanggal Survei
            </label>
            <input
              type="date"
              name="tanggalSurvei"
              onChange={handleChange}
              required
              className="w-full p-3 bg-cream border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold/20 focus:border-gold outline-none transition-all text-dark"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-dark/70 uppercase tracking-wider mb-2">
              Waktu Survei
            </label>
            <input
              type="time"
              name="waktuSurvei"
              onChange={handleChange}
              required
              className="w-full p-3 bg-cream border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold/20 focus:border-gold outline-none transition-all text-dark"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-dark/70 uppercase tracking-wider mb-2">
              Rencana Sewa
            </label>
            <select
              name="rencanaSewa"
              onChange={handleChange}
              className="w-full p-3 bg-cream border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold/20 focus:border-gold outline-none transition-all text-dark"
            >
              <option value="1 Bulan">1 Bulan</option>
              <option value="3 Bulan">3 Bulan</option>
              <option value="6 Bulan">6 Bulan</option>
              <option value="1 Tahun">1 Tahun</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-dark/70 uppercase tracking-wider mb-2">
              Catatan (Opsional)
            </label>
            <textarea
              name="catatan"
              onChange={handleChange}
              rows="3"
              className="w-full p-3 bg-cream border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold/20 focus:border-gold outline-none transition-all text-dark placeholder-gray-400"
              placeholder="Ada pertanyaan khusus?"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gold text-dark font-bold rounded-xl hover:bg-[#c5a575] transition-colors shadow-lg shadow-gold/20 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Kirim ke WhatsApp Pemilik
          </button>
        </form>
      </div>
    </div>
  );
};

function Detail() {
  const { slug } = useParams();
  const [kos, setKos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getKosBySlug(slug);
        setKos(data);
      } catch (error) {
        console.error("Error fetching kos detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("Silakan login untuk memberikan review");
      return;
    }
    setSubmitting(true);
    try {
      await addReview(slug, userRating, userComment);
      const data = await getKosBySlug(slug);
      setKos(data);
      setUserComment("");
      alert("Review berhasil dikirim!");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Gagal mengirim review");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>Loading...</p>
      </div>
    );
  }

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
    <div className="min-h-screen bg-cream font-sans text-dark">
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
              {kos.facilities && kos.facilities.length > 0 ? (
                kos.facilities.map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 bg-cream text-dark rounded-lg font-medium text-sm border border-gold/20"
                  >
                    {item}
                  </span>
                ))
              ) : (
                <p className="text-muted italic">Tidak ada data fasilitas.</p>
              )}
            </div>
          </section>

          <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-serif font-bold text-dark mb-6">
              Layanan Tambahan
            </h2>
            {kos.services && kos.services.length > 0 ? (
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
            ) : (
              <p className="text-muted italic">Tidak ada data layanan.</p>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-dark mb-6">
              Galeri
            </h2>
            {kos.gallery && kos.gallery.length > 0 ? (
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
            ) : (
              <p className="text-muted italic">Belum ada galeri foto.</p>
            )}
          </section>

          {kos.latitude && kos.longitude && (
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-serif font-bold text-dark mb-6">
                Lokasi
              </h2>
              <div className="h-64 w-full rounded-xl overflow-hidden border border-gray-200 z-0 relative">
                <MapContainer
                  center={[kos.latitude, kos.longitude]}
                  zoom={15}
                  scrollWheelZoom={false}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[kos.latitude, kos.longitude]} />
                </MapContainer>
              </div>
              <div className="mt-4 flex items-center gap-2 text-muted">
                <svg
                  className="w-5 h-5 text-gold"
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
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${kos.latitude},${kos.longitude}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gold transition-colors underline"
                >
                  Buka di Google Maps
                </a>
              </div>
            </section>
          )}

          <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-serif font-bold text-dark mb-6">
              Ulasan Penghuni
            </h2>

            {isLoggedIn ? (
              <form
                onSubmit={handleReviewSubmit}
                className="mb-8 bg-gray-50 p-6 rounded-xl"
              >
                <h3 className="font-bold mb-4">Tulis Ulasan Anda</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setUserRating(star)}
                        className={`text-2xl ${
                          star <= userRating ? "text-gold" : "text-gray-300"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Komentar
                  </label>
                  <textarea
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    rows="3"
                    placeholder="Bagikan pengalaman Anda..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-gold text-dark font-bold rounded-lg hover:bg-[#c5a575] transition-colors disabled:opacity-50"
                >
                  {submitting ? "Mengirim..." : "Kirim Ulasan"}
                </button>
              </form>
            ) : (
              <div className="mb-8 p-4 bg-blue-50 text-blue-700 rounded-lg">
                Silakan{" "}
                <Link to="/login" className="font-bold underline">
                  login
                </Link>{" "}
                untuk memberikan ulasan.
              </div>
            )}

            <div className="space-y-6">
              {kos.reviewsList && kos.reviewsList.length > 0 ? (
                kos.reviewsList.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-100 pb-6 last:border-0"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-bold text-dark">
                        {review.username || "User"}
                      </div>
                      <div className="text-sm text-muted">
                        {new Date(review.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex text-gold mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < review.rating ? "text-gold" : "text-gray-200"
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted italic">Belum ada ulasan.</p>
              )}
            </div>
          </section>
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-xl shadow-black/5 border border-gray-100">
            <div className="mb-6">
              <p className="text-sm text-muted mb-1">Mulai dari</p>
              <p className="text-3xl font-serif font-bold text-gold">
                {kos.price}
              </p>
              <p className="text-xs text-muted mt-2">
                Harga sudah termasuk listrik, air, dan layanan kebersihan.
              </p>
            </div>

            <button
              onClick={() => setShowBookingForm(true)}
              className="w-full py-4 bg-gold text-dark font-bold rounded-xl hover:bg-[#c5a575] transition-colors shadow-lg shadow-gold/20 mb-8"
            >
              Jadwalkan Survei
            </button>

            <div className="border-t border-gray-100 pt-6">
              <p className="text-xs font-bold text-muted uppercase tracking-wider mb-4">
                Pengelola
              </p>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center text-xl font-bold text-gold border border-gold/20">
                  {kos.owner?.name ? kos.owner.name.charAt(0) : "?"}
                </div>
                <div>
                  <h3 className="font-bold text-dark">
                    {kos.owner?.name || "Tanpa Nama"}
                  </h3>
                  <p className="text-sm text-muted">
                    {kos.owner?.phone || "-"}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {kos.owner?.phone && (
                  <a
                    href={`tel:${kos.owner.phone}`}
                    className="flex items-center justify-center py-2.5 border border-gray-200 rounded-lg text-sm font-bold text-muted hover:bg-gray-50 transition-colors"
                  >
                    Telepon
                  </a>
                )}
                {kos.owner?.whatsapp ? (
                  <a
                    href={kos.owner.whatsapp}
                    className="flex items-center justify-center py-2.5 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20"
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp
                  </a>
                ) : (
                  <button
                    disabled
                    className="flex items-center justify-center py-2.5 bg-gray-300 text-white rounded-lg text-sm font-bold cursor-not-allowed"
                  >
                    WhatsApp
                  </button>
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {showBookingForm && (
        <BookingForm
          ownerPhone={kos.owner?.phone || ""}
          kosName={kos.name}
          harga={kos.price}
          onClose={() => setShowBookingForm(false)}
        />
      )}

      <footer className="bg-white border-t border-gray-200 py-12 mt-12">
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
export default Detail;
