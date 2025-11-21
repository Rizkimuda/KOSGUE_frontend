import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className="auth-page">
      <div className="auth-hero">
        <span className="subheading">Komunitas KosGue</span>
        <h1>
          Masuk dan lanjutkan pencarian kos impianmu dengan kurasi rekomendasi personal dari kami.
        </h1>
        <p>
          Simpan favorit, pantau status booking, dan dapatkan akses ke promo penghuni baru. Semua
          bisa kamu lakukan di satu tempat.
        </p>
      </div>
      <div className="auth-card">
        <header className="auth-header">
          <Link to="/" className="logo dark">
            KosGue
          </Link>
          <p>
            Belum punya akun? <Link to="/register">Daftar sekarang</Link>
          </p>
        </header>
        <form className="auth-form">
          <label>
            Email
            <input type="email" placeholder="nama@email.com" required />
          </label>
          <label>
            Kata sandi
            <input type="password" placeholder="••••••••" required />
          </label>
          <div className="auth-actions">
            <label className="remember">
              <input type="checkbox" /> Ingat saya
            </label>
            <button type="button" className="link">
              Lupa password?
            </button>
          </div>
          <button type="submit" className="btn primary full">
            Masuk
          </button>
        </form>
        <p className="auth-footer">
          Dengan masuk, kamu menyetujui <a href="#">Syarat & Ketentuan</a> serta{' '}
          <a href="#">Kebijakan Privasi</a>.
        </p>
      </div>
    </div>
  )
}

export default Login

