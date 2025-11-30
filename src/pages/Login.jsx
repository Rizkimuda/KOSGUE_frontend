import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import UserMenu from "../components/UserMenu";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    const result = login(formData.email, formData.password);
    
    if (result.success) {
      const redirect = searchParams.get("redirect");
      navigate(redirect || "/");
    } else {
      setError(result.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
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
            {isAuthenticated ? (
              <UserMenu />
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

      <div className="flex-1 grid md:grid-cols-2 min-h-0">
        <div className="hidden md:flex flex-col justify-between bg-dark p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
          <div className="relative z-10">
            <span className="inline-block py-1 px-3 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-bold tracking-wide uppercase mb-6">
              Komunitas KosGue
            </span>
            <h1 className="text-4xl font-serif font-bold leading-tight mb-6">
              Masuk dan lanjutkan pencarian kos impianmu dengan kurasi rekomendasi
              personal dari kami.
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Simpan favorit, pantau status booking, dan dapatkan akses ke promo
              penghuni baru. Semua bisa kamu lakukan di satu tempat.
            </p>
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
                  Selamat Datang
                </h2>
                <p className="text-muted">
                  Belum punya akun?{" "}
                  <Link
                    to="/register"
                    className="text-gold font-bold hover:underline"
                  >
                    Daftar sekarang
                  </Link>
                </p>
              </header>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-dark">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nama@email.com"
                    required
                    className={`w-full p-3 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all ${
                      error ? "border-red-300" : "border-gray-200"
                    }`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-dark">
                    Kata sandi
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-muted cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded text-gold focus:ring-gold"
                    />
                    Ingat saya
                  </label>
                  <button
                    type="button"
                    className="text-sm font-bold text-gold hover:underline"
                  >
                    Lupa password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gold text-dark font-bold rounded-lg hover:bg-[#c5a575] transition-colors shadow-lg shadow-gold/20"
                >
                  Masuk
                </button>
              </form>

              <p className="mt-8 text-xs text-center text-muted leading-relaxed">
                Dengan masuk, kamu menyetujui{" "}
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

export default Login;
