import { Link, useParams } from 'react-router-dom'
import kosList from '../data/kosList'

function Detail() {
  const { slug } = useParams()
  const kos = kosList.find((item) => item.slug === slug)

  if (!kos) {
    return (
      <div className="detail-page">
        <div className="detail-container">
          <p>Ups, kos yang kamu cari tidak ditemukan.</p>
          <Link to="/" className="btn primary">
            Kembali ke beranda
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="detail-page">
      <div className="detail-hero">
        <img src={kos.image} alt={kos.name} />
        <div className="detail-hero-text">
          <Link to="/" className="breadcrumb">
            ← Beranda
          </Link>
          <p className="subheading">Kos Eksklusif</p>
          <h1>{kos.name}</h1>
          <p className="location">{kos.city}</p>
          <div className="detail-stats">
            <div>
              <p className="stat-number">{kos.rating}</p>
              <span>{kos.reviews} review</span>
            </div>
            <div>
              <p className="stat-number">{kos.size}</p>
              <span>Luas kamar</span>
            </div>
            <div>
              <p className="stat-number">{kos.capacity}</p>
              <span>Kapasitas</span>
            </div>
          </div>
        </div>
      </div>

      <div className="detail-container">
        <div className="detail-content">
          <section>
            <h2>Ringkasan</h2>
            <p>{kos.summary}</p>
          </section>

          <section>
            <h2>Fasilitas Kamar</h2>
            <div className="detail-tags">
              {kos.facilities.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </section>

          <section>
            <h2>Layanan Tambahan</h2>
            <ul className="detail-list">
              {kos.services.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Galeri</h2>
            <div className="gallery-grid">
              {kos.gallery.map((url) => (
                <img key={url} src={url} alt={kos.name} />
              ))}
            </div>
          </section>
        </div>

        <aside className="detail-sidebar">
          <div className="booking-card">
            <p className="price-label">Mulai dari</p>
            <p className="price">{kos.price}</p>
            <p>Harga sudah termasuk listrik, air, dan layanan kebersihan.</p>
            <button className="btn primary full">Ajukan Booking</button>
            <div className="owner-card">
              <p className="owner-label">Pengelola</p>
              <h3>{kos.owner.name}</h3>
              <p>{kos.owner.phone}</p>
              <div className="contact-actions">
                <a href={`tel:${kos.owner.phone}`} className="btn ghost">
                  Telepon
                </a>
                <a href={kos.owner.whatsapp} className="btn primary" target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Detail

