import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="min-h-screen grid md:grid-cols-2 font-sans text-dark">
      <div className="hidden md:flex flex-col justify-between bg-dark p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
        <div className="relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-bold tracking-wide uppercase mb-6">
            Selangkah lagi
          </span>
          <h1 className="text-4xl font-serif font-bold leading-tight mb-6">
            Buat akun KosGue dan nikmati pengalaman mencari kos yang intuitif,
            transparan, dan terkurasi.
          </h1>
          <ul className="space-y-4 text-white/80 text-lg">
            {[
              "Simulasi biaya dan reminder pembayaran otomatis.",
              "Kontak langsung pemilik kos & dukungan konsultan.",
              "Reward poin setiap kali memperpanjang sewa.",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-gold flex-shrink-0"
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
              Sudah punya akun?{" "}
              <Link to="/login" className="text-gold font-bold hover:underline">
                Masuk
              </Link>
            </p>
          </header>

          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-dark">
                Nama lengkap
              </label>
              <input
                type="text"
                placeholder="Nama kamu"
                required
                className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
              />
            </div>
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
              <label className="text-sm font-bold text-dark">
                Nomor WhatsApp
              </label>
              <input
                type="tel"
                placeholder="08xxxxxxxxxx"
                required
                className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-dark">Kata sandi</label>
              <input
                type="password"
                placeholder="Minimal 8 karakter"
                required
                className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-dark">
                Konfirmasi kata sandi
              </label>
              <input
                type="password"
                placeholder="Ulangi kata sandi"
                required
                className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gold text-dark font-bold rounded-lg hover:bg-[#c5a575] transition-colors shadow-lg shadow-gold/20 mt-4"
            >
              Daftar
            </button>
          </form>

          <p className="mt-8 text-xs text-center text-muted leading-relaxed">
            Dengan daftar, kamu menyetujui{" "}
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

export default Register;
