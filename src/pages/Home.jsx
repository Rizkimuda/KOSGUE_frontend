import { Link } from 'react-router-dom'
import kosList from '../data/kosList'

const facilities = [
  { title: 'Kamar Luas', description: 'Tempat tidur queen, lemari besar, dan meja kerja nyaman.' },
  { title: 'Area Komunal', description: 'Ruang santai dengan pantry modern dan kursi empuk.' },
  { title: 'Keamanan 24 Jam', description: 'Akses kartu, CCTV, serta petugas siap sedia.' },
]

const testimonials = [
  {
    name: 'Rafi Hidayat',
    role: 'Product Designer',
    message:
      'KosGue membantu saya menemukan kos dekat kantor dalam waktu singkat. Proses bookingnya simpel dan fasilitasnya sesuai foto.',
  },
  {
    name: 'Anisa Putri',
    role: 'Mahasiswi',
    message:
      'Desain kamarnya cantik banget, cocok buat produktif dan istirahat. Admin kos sangat responsif.',
  },
  {
    name: 'Rio Pratama',
    role: 'Software Engineer',
    message:
      'Aplikasi ini bikin hunting kos jadi seru. Saya bisa lihat review, fasilitas, sampai simulasi biaya sekaligus.',
  },
]

function Home() {
  return (
    <div className="page">
      <header className="hero">
        <nav className="nav">
          <div className="logo">KosGue</div>
          <div className="nav-links">
            <a href="#tentang">Tentang</a>
            <a href="#featured">Kos Pilihan</a>
            <a href="#fasilitas">Fasilitas</a>
            <a href="#testimoni">Testimoni</a>
          </div>
          <div className="nav-cta">
            <Link to="/login" className="btn ghost">
              Masuk
            </Link>
            <Link to="/register" className="btn primary">
              Daftar
            </Link>
          </div>
        </nav>

        <div className="hero-content">
          <div>
            <span className="subheading">#SeriusNyariKos</span>
            <h1>
              Temukan ruang tinggal terbaik dengan standar hotel,
              <span> kosnya KosGue.</span>
            </h1>
            <p>
              Dari kamar eksklusif hingga kos harian yang hangat, semua kurasi kami hadir dengan
              fasilitas moderen, interior estetis, dan kehangatan seperti rumah sendiri.
            </p>

            <div className="search-card">
              <div>
                <label>Kota</label>
                <input type="text" placeholder="Masukkan kota atau area" />
              </div>
              <div>
                <label>Tanggal masuk</label>
                <input type="date" />
              </div>
              <div>
                <label>Anggaran</label>
                <select>
                  <option>&lt; Rp1.500.000</option>
                  <option>Rp1.500.000 - Rp2.000.000</option>
                  <option>&gt; Rp2.000.000</option>
                </select>
              </div>
              <button className="btn primary">Cari Kos</button>
            </div>

            <div className="hero-stats">
              <div>
                <p className="stat-number">230+</p>
                <p>Kos terverifikasi</p>
              </div>
              <div>
                <p className="stat-number">4.9/5</p>
                <p>Rating penghuni</p>
              </div>
              <div>
                <p className="stat-number">15+</p>
                <p>Kota populer</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section id="tentang" className="about">
          <div className="about-image" />
          <div className="about-content">
            <p className="subheading">Tentang KosGue</p>
            <h2>Kurasi kos dengan rasa premium untuk gaya hidup modern.</h2>
            <p>
              Tim kami mengunjungi langsung setiap kos untuk memastikan kenyamanan, keamanan, serta
              estetika interior yang membuatmu betah. Pilih tipe kamar, cek fasilitas, dan pesan
              langsung dari satu aplikasi.
            </p>
            <ul>
              <li>Interior hangat bernuansa earth tone.</li>
              <li>Wi-Fi kencang, area komunal, dan layanan cleaning.</li>
              <li>CS personal yang siap membantu 24/7.</li>
            </ul>
          </div>
        </section>

        <section id="featured" className="featured">
          <div className="section-header">
            <div>
              <p className="subheading">Kos Pilihan</p>
              <h2>Referensi hunian favorit minggu ini.</h2>
            </div>
            <button className="btn ghost">Lihat semua</button>
          </div>
          <div className="card-grid">
            {kosList.map((item) => (
              <article key={item.name} className="kos-card">
                <img src={item.image} alt={item.name} />
                <div className="card-body">
                  <p className="kos-location">{item.city}</p>
                  <h3>{item.name}</h3>
                  <p className="kos-price">{item.price}</p>
                  <Link to={`/kos/${item.slug}`} className="btn primary">
                    Detail Kos
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="fasilitas" className="facilities">
          <p className="subheading">Fasilitas Andalan</p>
          <h2>Kami pastikan setiap kos lengkap dan siap huni.</h2>
          <div className="facility-grid">
            {facilities.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="testimoni" className="testimonials">
          <div className="section-header">
            <div>
              <p className="subheading">Cerita Penghuni</p>
              <h2>Testimoni hangat dari komunitas KosGue.</h2>
            </div>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article key={item.name}>
                <p>“{item.message}”</p>
                <h3>{item.name}</h3>
                <span>{item.role}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="cta">
          <div>
            <p className="subheading">Siap pindah?</p>
            <h2>Tinggal pilih kos, kami bantu urus sisanya.</h2>
            <p>
              Hubungi konsultan KosGue dan dapatkan rekomendasi personal sesuai gaya hidup, budget,
              dan lokasi impianmu.
            </p>
          </div>
          <div className="cta-actions">
            <button className="btn primary">Hubungi Konsultan</button>
            <button className="btn ghost">Eksplor semua kos</button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} KosGue. Semua hak dilindungi.</p>
        <div>
          <a href="#">Kebijakan Privasi</a>
          <span>•</span>
          <a href="#">Pusat Bantuan</a>
        </div>
      </footer>
    </div>
  )
}

export default Home

