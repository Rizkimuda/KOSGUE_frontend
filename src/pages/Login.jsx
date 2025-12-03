import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/api";
import { showError } from "../utils/sweetAlert";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
      showError("Login Gagal", err.message);
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
              Komunitas KosGue
            </span>
            <h1 className="text-4xl font-serif font-bold leading-tight mb-6">
              Lanjutkan pencarian kos impianmu, semudah belanja online.
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Simpan kos favorit, chat langsung dengan pemilik, dan atur jadwal
              survei lokasi. Semua riwayat pencarianmu tersimpan aman di sini.
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
                  <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-dark">Email</label>
                  <input
                    type="email"
                    placeholder="nama@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-dark">
                    Kata sandi
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
