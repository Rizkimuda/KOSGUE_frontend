import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import UserMenu from "../components/UserMenu";
import { useState } from "react";
import { formatPrice } from "../utils/formatPrice";

function AddKos() {
  const navigate = useNavigate();
  const { addKos, isAuthenticated, user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    price: "",
    image: "",
    summary: "",
    size: "",
    capacity: "",
    facilities: [],
    services: [],
  });
  const [facilityInput, setFacilityInput] = useState("");
  const [serviceInput, setServiceInput] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Redirect if not authenticated or not owner
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  if (!user?.isOwner) {
    navigate("/register-owner");
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!formData.name || !formData.city || !formData.price || !formData.image || !formData.summary) {
      setError("Field yang wajib diisi: Nama, Kota, Harga, Gambar, dan Deskripsi.");
      return;
    }

    // Generate slug from name
    const slug = formData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Format price if it's a number
    const formattedPrice = formatPrice(formData.price);

    const kosData = {
      slug: slug,
      name: formData.name,
      city: formData.city,
      price: formattedPrice,
      image: formData.image,
      summary: formData.summary,
      size: formData.size || "3 x 4 m",
      capacity: formData.capacity || "1-2 orang",
      rating: 0,
      reviews: 0,
      facilities: formData.facilities,
      services: formData.services,
      gallery: formData.image ? [formData.image] : [],
      owner: {
        name: user.name,
        phone: user.ownerInfo?.businessPhone || user.phone || "",
        whatsapp: user.phone ? `https://wa.me/62${user.phone.replace(/^0/, "").replace(/\D/g, "")}` : "",
      },
    };

    const result = addKos(kosData);

    if (result.success) {
      setSuccess(true);
      // Reset form
      setFormData({
        name: "",
        city: "",
        price: "",
        image: "",
        summary: "",
        size: "",
        capacity: "",
        facilities: [],
        services: [],
      });
      setFacilityInput("");
      setServiceInput("");
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setError("Gagal menambahkan kos. Silakan coba lagi.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const addFacility = () => {
    if (facilityInput.trim()) {
      setFormData({
        ...formData,
        facilities: [...formData.facilities, facilityInput.trim()],
      });
      setFacilityInput("");
    }
  };

  const removeFacility = (index) => {
    setFormData({
      ...formData,
      facilities: formData.facilities.filter((_, i) => i !== index),
    });
  };

  const addService = () => {
    if (serviceInput.trim()) {
      setFormData({
        ...formData,
        services: [...formData.services, serviceInput.trim()],
      });
      setServiceInput("");
    }
  };

  const removeService = (index) => {
    setFormData({
      ...formData,
      services: formData.services.filter((_, i) => i !== index),
    });
  };

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
            <Link to="/" className="hover:text-gold transition-colors">
              Beranda
            </Link>
            <a href="/#tentang" className="hover:text-gold transition-colors">
              Tentang
            </a>
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
            {isAuthenticated ? <UserMenu /> : null}
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-serif font-bold text-dark mb-2">
              Tambah Kos Baru
            </h1>
            <p className="text-muted">
              Lengkapi informasi kosmu untuk ditampilkan di platform KosGue.
            </p>
          </header>

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
              Kos berhasil ditambahkan! Mengalihkan ke halaman utama...
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-dark">
                  Nama Kos <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Contoh: Kos Melati Padang Bulan"
                  required
                  className="w-full p-3 bg-cream border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-dark">
                  Kota & Lokasi <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Contoh: Padang Bulan, Medan"
                  required
                  className="w-full p-3 bg-cream border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-dark">
                  Harga per Bulan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={(e) => {
                    // Allow only numbers
                    const value = e.target.value.replace(/\D/g, "");
                    setFormData({ ...formData, price: value });
                    setError("");
                  }}
                  placeholder="Contoh: 1350000 (akan otomatis diformat)"
                  required
                  className="w-full p-3 bg-cream border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                />
                {formData.price && (
                  <p className="text-xs text-muted">
                    Format: {formatPrice(formData.price)}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-dark">
                  URL Gambar <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  required
                  className="w-full p-3 bg-cream border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-dark">
                Deskripsi <span className="text-red-500">*</span>
              </label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                placeholder="Deskripsi singkat tentang kosmu..."
                required
                rows="4"
                className="w-full p-3 bg-cream border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all resize-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-dark">Ukuran Kamar</label>
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  placeholder="Contoh: 3.2 x 4.5 m"
                  className="w-full p-3 bg-cream border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-dark">Kapasitas</label>
                <input
                  type="text"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  placeholder="Contoh: 1-2 orang"
                  className="w-full p-3 bg-cream border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-dark">Fasilitas</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={facilityInput}
                  onChange={(e) => setFacilityInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFacility())}
                  placeholder="Contoh: AC, Wi-Fi, dll"
                  className="flex-1 p-3 bg-cream border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                />
                <button
                  type="button"
                  onClick={addFacility}
                  className="px-4 py-2 bg-gold text-dark font-semibold rounded-lg hover:bg-[#c5a575] transition-colors"
                >
                  Tambah
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.facilities.map((facility, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gold/20 text-dark text-xs font-semibold rounded-full flex items-center gap-2"
                  >
                    {facility}
                    <button
                      type="button"
                      onClick={() => removeFacility(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-dark">Layanan</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={serviceInput}
                  onChange={(e) => setServiceInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addService())}
                  placeholder="Contoh: Laundry, Cleaning, dll"
                  className="flex-1 p-3 bg-cream border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                />
                <button
                  type="button"
                  onClick={addService}
                  className="px-4 py-2 bg-gold text-dark font-semibold rounded-lg hover:bg-[#c5a575] transition-colors"
                >
                  Tambah
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.services.map((service, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gold/20 text-dark text-xs font-semibold rounded-full flex items-center gap-2"
                  >
                    {service}
                    <button
                      type="button"
                      onClick={() => removeService(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 py-3 bg-gold text-dark font-bold rounded-lg hover:bg-[#c5a575] transition-colors shadow-lg shadow-gold/20"
              >
                Tambah Kos
              </button>
              <Link
                to="/"
                className="px-6 py-3 border border-gray-300 text-dark font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                Batal
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddKos;

