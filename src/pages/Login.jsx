import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen grid md:grid-cols-2 font-sans text-dark">
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

      <div className="flex flex-col justify-center p-8 md:p-16 bg-cream">
        <div className="max-w-md mx-auto w-full">
          <header className="mb-10">
            <Link
              to="/"
              className="text-2xl font-serif font-bold tracking-tight text-gold block mb-2"
            >
              KosGue
            </Link>
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

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-dark">Email</label>
              <input
                type="email"
                placeholder="nama@email.com"
                required
                className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-dark">Kata sandi</label>
              <input
                type="password"
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
            <a href="#" className="underline hover:text-dark">
              Syarat & Ketentuan
            </a>{" "}
            serta{" "}
            <a href="#" className="underline hover:text-dark">
              Kebijakan Privasi
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
