import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register, verifyEmail } from "../services/api";
import { showSuccess, showError } from "../utils/sweetAlert";

function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState("register"); // register | otp
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Password tidak sama");
      setLoading(false);
      return;
    }

    try {
      await register(formData.username, formData.email, formData.password);
      setStep("otp");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await verifyEmail(formData.email, otp);
      await showSuccess(
        "Verifikasi Berhasil",
        "Akun Anda telah aktif. Silakan login."
      );
      navigate("/login");
    } catch (err) {
      setError(err.message);
      showError("Verifikasi Gagal", err.message);
    } finally {
      setLoading(false);
    }
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

      <div className="flex-1 grid md:grid-cols-2 min-h-0">
        <div className="hidden md:flex flex-col justify-between bg-dark p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
          <div className="relative z-10">
            <span className="inline-block py-1 px-3 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-bold tracking-wide uppercase mb-6">
              Selangkah lagi
            </span>
            <h1 className="text-4xl font-serif font-bold leading-tight mb-6">
              Satu akun untuk akses ribuan pilihan kos tanpa perantara.
            </h1>
            <ul className="space-y-4 text-white/80 text-lg">
              {[
                "Foto asli, harga jelas tanpa biaya tersembunyi, dan lokasi akurat.",
                "Tanya jawab dan atur janji temu langsung dengan pemilik kos via WhatsApp.",
                "Buat daftar kos favoritmu dan bandingkan fasilitasnya dengan mudah.",
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

        <div className="overflow-y-auto bg-cream p-8 md:p-16">
          <div className="max-w-md mx-auto w-full">
            <header className="mb-10">
              <h2 className="text-2xl font-serif font-bold tracking-tight text-gold block mb-2">
                {step === "register" ? "Buat Akun Baru" : "Verifikasi Email"}
              </h2>
              <p className="text-muted">
                {step === "register" ? (
                  <>
                    Sudah punya akun?{" "}
                    <Link
                      to="/login"
                      className="text-gold font-bold hover:underline"
                    >
                      Masuk di Sini
                    </Link>
                  </>
                ) : (
                  `Masukkan kode OTP yang telah dikirim ke ${formData.email}`
                )}
              </p>
            </header>

            {step === "register" ? (
              <form className="space-y-4" onSubmit={handleSubmit}>
                {error && (
                  <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-dark">
                    Nama lengkap
                  </label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Nama kamu"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-dark">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="nama@email.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-dark">
                    Kata sandi
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Minimal 8 karakter"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-dark">
                    Konfirmasi kata sandi
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Ulangi kata sandi"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gold text-dark font-bold rounded-lg hover:bg-[#c5a575] transition-colors shadow-lg shadow-gold/20 mt-4 disabled:opacity-50"
                >
                  {loading ? "Memproses..." : "Daftar"}
                </button>
              </form>
            ) : (
              <form className="space-y-4" onSubmit={handleVerify}>
                {error && (
                  <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-dark">
                    Kode OTP
                  </label>
                  <input
                    type="text"
                    name="otp"
                    placeholder="Masukkan 6 digit kode"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all text-center tracking-widest text-xl"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gold text-dark font-bold rounded-lg hover:bg-[#c5a575] transition-colors shadow-lg shadow-gold/20 mt-4 disabled:opacity-50"
                >
                  {loading ? "Memverifikasi..." : "Verifikasi Email"}
                </button>
                <button
                  type="button"
                  onClick={() => setStep("register")}
                  className="w-full py-2 text-sm text-muted hover:text-dark transition-colors"
                >
                  Kembali ke Pendaftaran
                </button>
              </form>
            )}

            <p className="mt-8 text-xs text-center text-muted leading-relaxed">
              Dengan daftar, kamu menyetujui{" "}
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
  );
}

export default Register;
