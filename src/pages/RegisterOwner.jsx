import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import UserMenu from "../components/UserMenu";
import { useState } from "react";

function RegisterOwner() {
  const navigate = useNavigate();
  const { registerAsOwner, isAuthenticated, user } = useAuth();
  const [formData, setFormData] = useState({
    businessName: "",
    businessAddress: "",
    businessPhone: "",
    ktpNumber: "",
  });
  const [error, setError] = useState("");

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  // Redirect if already owner
  if (user?.isOwner) {
    navigate("/add-kos");
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.businessName || !formData.businessAddress || !formData.businessPhone || !formData.ktpNumber) {
      setError("Semua field harus diisi.");
      return;
    }

    const result = registerAsOwner(formData);

    if (result.success) {
      navigate("/add-kos");
    } else {
      setError(result.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  return (
    <div className="h-screen flex flex-col font-sans text-dark">
      <nav className="z-50 bg-dark/95 backdrop-blur-md border-b border-white/10 shrink-0">
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

      <div className="flex-1 grid md:grid-cols-2 min-h-0">
        <div className="hidden md:flex flex-col justify-between bg-dark p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
          <div className="relative z-10">
            <span className="inline-block py-1 px-3 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-bold tracking-wide uppercase mb-6">
              Jadi Pemilik Kos
            </span>
            <h1 className="text-4xl font-serif font-bold leading-tight mb-6">
              Daftarkan bisnis kosmu dan jangkau lebih banyak calon penghuni.
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              Dengan menjadi pemilik kos di KosGue, kamu bisa:
            </p>
            <ul className="space-y-4 text-white/80 text-lg">
              {[
                "Kelola listing kos dengan mudah dan cepat.",
                "Terima booking langsung dari calon penghuni.",
                "Pantau statistik dan review dari penghuni.",
                "Akses fitur premium untuk promosi kosmu.",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
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
          <div className="relative z-10 text-sm text-white/60">
            © {new Date().getFullYear()} KosGue.
          </div>
        </div>

        <div className="overflow-y-auto bg-cream">
          <div className="min-h-full flex items-center justify-center p-8 md:p-16">
            <div className="max-w-md mx-auto w-full">
              <header className="mb-10">
                <h2 className="text-2xl font-serif font-bold tracking-tight text-gold block mb-2">
                  Daftar sebagai Pemilik Kos
                </h2>
                <p className="text-muted">
                  Lengkapi informasi bisnis kosmu untuk memulai.
                </p>
              </header>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-bold text-dark">
                    Nama Bisnis / Kos
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Contoh: Kos Melati"
                    required
                    className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-dark">
                    Alamat Bisnis
                  </label>
                  <textarea
                    name="businessAddress"
                    value={formData.businessAddress}
                    onChange={handleChange}
                    placeholder="Alamat lengkap kosmu"
                    required
                    rows="3"
                    className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-dark">
                    Nomor Telepon Bisnis
                  </label>
                  <input
                    type="tel"
                    name="businessPhone"
                    value={formData.businessPhone}
                    onChange={handleChange}
                    placeholder="08xxxxxxxxxx"
                    required
                    className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-dark">
                    Nomor KTP
                  </label>
                  <input
                    type="text"
                    name="ktpNumber"
                    value={formData.ktpNumber}
                    onChange={handleChange}
                    placeholder="16 digit nomor KTP"
                    required
                    className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                  />
                  <p className="text-xs text-muted">
                    Data KTP diperlukan untuk verifikasi identitas.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gold text-dark font-bold rounded-lg hover:bg-[#c5a575] transition-colors shadow-lg shadow-gold/20 mt-4"
                >
                  Daftar sebagai Pemilik Kos
                </button>
              </form>

              <p className="mt-8 text-xs text-center text-muted leading-relaxed">
                Dengan mendaftar, kamu menyetujui{" "}
                <Link to="/terms" className="underline hover:text-dark">
                  Syarat & Ketentuan
                </Link>{" "}
                serta{" "}
                <a href="#" className="underline hover:text-dark">
                  Kebijakan Privasi
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterOwner;

