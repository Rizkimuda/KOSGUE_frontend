import { Link } from 'react-router-dom'

function Register() {
  return (
    <div className="auth-page">
      <div className="auth-hero alt">
        <span className="subheading">Selangkah lagi</span>
        <h1>
          Buat akun KosGue dan nikmati pengalaman mencari kos yang intuitif, transparan, dan
          terkurasi.
        </h1>
        <ul>
          <li>Simulasi biaya dan reminder pembayaran otomatis.</li>
          <li>Kontak langsung pemilik kos & dukungan konsultan.</li>
          <li>Reward poin setiap kali memperpanjang sewa.</li>
        </ul>
      </div>
      <div className="auth-card">
        <header className="auth-header">
          <Link to="/" className="logo dark">
            KosGue
          </Link>
          <p>
            Sudah punya akun? <Link to="/login">Masuk</Link>
          </p>
        </header>
        <form className="auth-form">
          <label>
            Nama lengkap
            <input type="text" placeholder="Nama kamu" required />
          </label>
          <label>
            Email
            <input type="email" placeholder="nama@email.com" required />
          </label>
          <label>
            Nomor WhatsApp
            <input type="tel" placeholder="08xxxxxxxxxx" required />
          </label>
          <label>
            Kata sandi
            <input type="password" placeholder="Minimal 8 karakter" required />
          </label>
          <label>
            Konfirmasi kata sandi
            <input type="password" placeholder="Ulangi kata sandi" required />
          </label>
          <button type="submit" className="btn primary full">
            Daftar
          </button>
        </form>
        <p className="auth-footer">
          Dengan daftar, kamu menyetujui <a href="#">Syarat & Ketentuan</a> serta{' '}
          <a href="#">Kebijakan Privasi</a>.
        </p>
      </div>
    </div>
  )
}

export default Register

