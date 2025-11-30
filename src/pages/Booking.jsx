import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import kosList from "../data/kosList";
import { formatPrice } from "../utils/formatPrice";

function Booking() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, createBooking, getKosList } = useAuth();
  
  // Combine default kosList with user-added kos
  const userAddedKos = getKosList ? getKosList() : [];
  const allKosList = [...kosList, ...userAddedKos];
  const kos = allKosList.find((item) => item.slug === slug);

  const [formData, setFormData] = useState({
    checkInDate: "",
    duration: "1",
    name: user?.name || "",
    phone: user?.phone || "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login?redirect=/booking/" + slug);
      return;
    }

    if (!kos) {
      navigate("/");
      return;
    }

    // Pre-fill user data if available
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || prev.name,
        phone: user.phone || prev.phone,
      }));
    }
  }, [isAuthenticated, user, kos, navigate, slug]);

  if (!kos) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.checkInDate) {
      newErrors.checkInDate = "Tanggal check-in harus diisi";
    } else {
      const selectedDate = new Date(formData.checkInDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.checkInDate = "Tanggal check-in tidak boleh di masa lalu";
      }
    }

    if (!formData.duration || parseInt(formData.duration) < 1) {
      newErrors.duration = "Durasi minimal 1 bulan";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Nama lengkap harus diisi";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor telepon harus diisi";
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = "Format nomor telepon tidak valid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateTotalPrice = () => {
    const priceMatch = kos.price.match(/[\d.]+/g);
    if (!priceMatch) return 0;
    const monthlyPrice = parseInt(priceMatch[0].replace(/\./g, ""));
    return monthlyPrice * parseInt(formData.duration || 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Calculate check-out date
    const checkInDate = new Date(formData.checkInDate);
    const checkOutDate = new Date(checkInDate);
    checkOutDate.setMonth(checkOutDate.getMonth() + parseInt(formData.duration));

    const bookingData = {
      kosSlug: kos.slug,
      kosName: kos.name,
      kosImage: kos.image,
      kosCity: kos.city,
      kosPrice: kos.price,
      checkInDate: formData.checkInDate,
      checkOutDate: checkOutDate.toISOString().split("T")[0],
      duration: parseInt(formData.duration),
      totalPrice: calculateTotalPrice(),
      guestName: formData.name,
      guestPhone: formData.phone,
      notes: formData.notes,
      ownerName: kos.owner.name,
      ownerPhone: kos.owner.phone,
      ownerWhatsapp: kos.owner.whatsapp,
    };

    const result = createBooking(bookingData);

    setIsSubmitting(false);

    if (result.success) {
      navigate(`/booking/${result.booking.id}/confirmation`);
    } else {
      alert(result.message || "Terjadi kesalahan saat membuat booking. Silakan coba lagi.");
    }
  };

  const monthlyPrice = parseInt(kos.price.match(/[\d.]+/g)?.[0]?.replace(/\./g, "") || "0");
  const totalPrice = calculateTotalPrice();

  return (
    <div className="min-h-screen bg-cream font-sans text-dark pb-24">
      {/* Header */}
      <div className="bg-dark text-white py-6">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            to={`/kos/${slug}`}
            className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors font-medium"
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
            Kembali ke Detail Kos
          </Link>
          <h1 className="text-3xl font-serif font-bold">Formulir Booking</h1>
          <p className="text-white/80 mt-2">Lengkapi informasi di bawah untuk mengajukan booking</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <div>
                <h2 className="text-2xl font-serif font-bold text-dark mb-6">
                  Informasi Booking
                </h2>
              </div>

              {/* Check-in Date */}
              <div>
                <label htmlFor="checkInDate" className="block text-sm font-bold text-dark mb-2">
                  Tanggal Check-in <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="checkInDate"
                  name="checkInDate"
                  value={formData.checkInDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.checkInDate ? "border-red-500" : "border-gray-200"
                  } focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent`}
                  min={new Date().toISOString().split("T")[0]}
                />
                {errors.checkInDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.checkInDate}</p>
                )}
              </div>

              {/* Duration */}
              <div>
                <label htmlFor="duration" className="block text-sm font-bold text-dark mb-2">
                  Durasi (Bulan) <span className="text-red-500">*</span>
                </label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.duration ? "border-red-500" : "border-gray-200"
                  } focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent`}
                >
                  {[1, 2, 3, 6, 12].map((month) => (
                    <option key={month} value={month}>
                      {month} {month === 1 ? "bulan" : "bulan"}
                    </option>
                  ))}
                </select>
                {errors.duration && (
                  <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
                )}
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-xl font-serif font-bold text-dark mb-6">
                  Informasi Pribadi
                </h3>
              </div>

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-dark mb-2">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.name ? "border-red-500" : "border-gray-200"
                  } focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent`}
                  placeholder="Masukkan nama lengkap Anda"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-dark mb-2">
                  Nomor Telepon <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.phone ? "border-red-500" : "border-gray-200"
                  } focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent`}
                  placeholder="08xx-xxxx-xxxx"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notes" className="block text-sm font-bold text-dark mb-2">
                  Catatan (Opsional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="Catatan tambahan untuk pemilik kos..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gold text-dark font-bold rounded-xl hover:bg-[#c5a575] transition-colors shadow-lg shadow-gold/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Memproses..." : "Ajukan Booking"}
              </button>
            </form>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-xl shadow-black/5 border border-gray-100">
              <h3 className="text-xl font-serif font-bold text-dark mb-4">
                Ringkasan Booking
              </h3>

              {/* Kos Info */}
              <div className="mb-6">
                <img
                  src={kos.image}
                  alt={kos.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <h4 className="font-bold text-dark mb-1">{kos.name}</h4>
                <p className="text-sm text-muted flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
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
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Harga per bulan</span>
                  <span className="font-bold text-dark">{formatPrice(kos.price)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Durasi</span>
                  <span className="font-bold text-dark">
                    {formData.duration || 0} {parseInt(formData.duration || 0) === 1 ? "bulan" : "bulan"}
                  </span>
                </div>
                {formData.checkInDate && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Check-in</span>
                    <span className="font-bold text-dark">
                      {new Date(formData.checkInDate).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-dark">Total</span>
                    <span className="text-2xl font-serif font-bold text-gold">
                      Rp{totalPrice.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-cream rounded-lg">
                <p className="text-xs text-muted">
                  <strong>Catatan:</strong> Booking yang Anda ajukan akan diproses oleh pemilik kos. 
                  Anda akan menerima konfirmasi melalui kontak yang Anda berikan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;

