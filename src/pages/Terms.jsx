import { Link } from "react-router-dom";

function Terms() {
  return (
    <div className="min-h-screen bg-cream font-sans text-dark">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-md border-b border-white/10">
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

      <div className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12">
            <Link
              to="/"
              className="inline-flex items-center text-muted hover:text-dark mb-6 transition-colors font-medium"
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
              Kembali ke beranda
            </Link>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-4">
              Syarat & Ketentuan
            </h1>
            <p className="text-muted text-lg">
              Terakhir diperbarui: {new Date().toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-2xl font-serif font-bold text-dark mb-4">
                1. Penerimaan Syarat
              </h2>
              <p className="text-muted leading-relaxed">
                Dengan mengakses dan menggunakan platform KosGue, Anda menyetujui
                untuk terikat oleh syarat dan ketentuan ini. Jika Anda tidak setuju
                dengan bagian mana pun dari syarat ini, Anda tidak boleh menggunakan
                layanan kami.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-dark mb-4">
                2. Penggunaan Platform
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                Platform KosGue menyediakan layanan pencarian dan informasi mengenai
                kos. Pengguna diharapkan untuk:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted ml-4">
                <li>Menggunakan platform dengan itikad baik</li>
                <li>
                  Memberikan informasi yang akurat dan terkini saat membuat akun
                </li>
                <li>
                  Tidak menggunakan platform untuk tujuan ilegal atau melanggar hukum
                </li>
                <li>
                  Tidak mengganggu atau merusak sistem, server, atau jaringan yang
                  terhubung dengan platform
                </li>
                <li>
                  Tidak melakukan scraping, crawling, atau pengambilan data secara
                  otomatis tanpa izin
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-dark mb-4">
                3. Akun Pengguna
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                Untuk menggunakan fitur tertentu, Anda perlu membuat akun. Anda
                bertanggung jawab untuk:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted ml-4">
                <li>Menjaga kerahasiaan informasi akun Anda</li>
                <li>
                  Segera memberitahu kami jika terjadi penggunaan tidak sah pada akun
                  Anda
                </li>
                <li>
                  Memastikan semua informasi yang diberikan akurat dan terkini
                </li>
                <li>
                  Bertanggung jawab atas semua aktivitas yang terjadi di bawah akun
                  Anda
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-dark mb-4">
                4. Pencarian dan Booking Kos
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                KosGue bertindak sebagai platform perantara antara pencari kos dan
                pemilik kos. Kami tidak bertanggung jawab atas:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted ml-4">
                <li>
                  Kualitas, kondisi, atau akurasi informasi kos yang ditampilkan
                </li>
                <li>
                  Transaksi antara pengguna dan pemilik kos (termasuk pembayaran,
                  sewa, dan perjanjian)
                </li>
                <li>
                  Sengketa yang timbul antara pengguna dan pemilik kos
                </li>
                <li>
                  Perubahan harga, ketersediaan, atau kondisi kos tanpa pemberitahuan
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-dark mb-4">
                5. Pembayaran dan Biaya
              </h2>
              <p className="text-muted leading-relaxed">
                KosGue dapat mengenakan biaya layanan untuk transaksi tertentu.
                Semua biaya akan dijelaskan secara jelas sebelum Anda melakukan
                pembayaran. Pembayaran yang telah dilakukan tidak dapat dikembalikan
                kecuali dalam kondisi tertentu yang diatur dalam kebijakan refund
                kami.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-dark mb-4">
                6. Konten dan Hak Kekayaan Intelektual
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                Semua konten di platform KosGue, termasuk namun tidak terbatas pada
                teks, gambar, logo, dan desain, dilindungi oleh hak cipta dan hak
                kekayaan intelektual lainnya. Anda tidak diperbolehkan untuk:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted ml-4">
                <li>Menyalin, memodifikasi, atau mendistribusikan konten tanpa izin</li>
                <li>Menggunakan konten untuk tujuan komersial tanpa persetujuan</li>
                <li>Menghapus atau mengubah pemberitahuan hak cipta</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-dark mb-4">
                7. Privasi dan Data Pribadi
              </h2>
              <p className="text-muted leading-relaxed">
                Penggunaan data pribadi Anda diatur oleh Kebijakan Privasi kami.
                Dengan menggunakan platform, Anda menyetujui pengumpulan, penggunaan,
                dan pengungkapan informasi sesuai dengan kebijakan tersebut.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-dark mb-4">
                8. Pembatasan Tanggung Jawab
              </h2>
              <p className="text-muted leading-relaxed">
                KosGue menyediakan platform "sebagaimana adanya" tanpa jaminan
                apapun. Kami tidak bertanggung jawab atas kerugian langsung, tidak
                langsung, insidental, atau konsekuensial yang timbul dari penggunaan
                atau ketidakmampuan menggunakan platform kami.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-dark mb-4">
                9. Perubahan Syarat
              </h2>
              <p className="text-muted leading-relaxed">
                Kami berhak mengubah syarat dan ketentuan ini kapan saja. Perubahan
                akan diberitahukan melalui platform atau email. Penggunaan berkelanjutan
                setelah perubahan berarti Anda menerima syarat yang baru.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-dark mb-4">
                10. Hukum yang Berlaku
              </h2>
              <p className="text-muted leading-relaxed">
                Syarat dan ketentuan ini diatur oleh hukum Republik Indonesia. Setiap
                sengketa akan diselesaikan melalui pengadilan yang berwenang di
                Indonesia.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-dark mb-4">
                11. Kontak
              </h2>
              <p className="text-muted leading-relaxed">
                Jika Anda memiliki pertanyaan mengenai syarat dan ketentuan ini,
                silakan hubungi kami melalui:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted ml-4 mt-4">
                <li>Email: support@kosgue.com</li>
                <li>WhatsApp: +62 812-3456-7890</li>
                <li>Alamat: Jl. Contoh No. 123, Medan, Sumatera Utara</li>
              </ul>
            </section>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/login"
              className="px-8 py-3 bg-gold text-dark font-bold rounded-full hover:bg-[#c5a575] transition-colors shadow-lg shadow-gold/20"
            >
              Kembali ke Login
            </Link>
            <Link
              to="/register"
              className="px-8 py-3 bg-transparent text-dark font-bold rounded-full hover:bg-white/50 transition-colors border-2 border-dark"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terms;

