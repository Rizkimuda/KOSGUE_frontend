import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { formatPrice } from "../utils/formatPrice";

function BookingConfirmation() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { getBookings, user, isAuthenticated } = useAuth();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate("/login?redirect=/booking/" + bookingId + "/confirmation");
      return;
    }

    const bookings = getBookings();
    const foundBooking = bookings.find((b) => b.id === bookingId);

    if (!foundBooking) {
      navigate("/");
      return;
    }

    // Verify that this booking belongs to the current user
    if (foundBooking.userId !== user.email) {
      navigate("/");
      return;
    }

    setBooking(foundBooking);
  }, [bookingId, getBookings, user, isAuthenticated, navigate]);

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <p className="text-xl text-muted">Memuat...</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-cream font-sans text-dark pb-24">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <svg
              className="w-12 h-12 text-green-600"
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
          </div>
          <h1 className="text-4xl font-serif font-bold text-dark mb-2">
            Booking Berhasil Diterima!
          </h1>
          <p className="text-lg text-muted">
            Terima kasih telah menggunakan KosGue untuk mencari kos impian Anda.
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-black/5 border border-gray-100 overflow-hidden mb-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-gold to-[#c5a575] p-6 text-dark">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider mb-1">
                  Nomor Booking
                </p>
                <p className="text-2xl font-serif font-bold">#{booking.id.slice(-8).toUpperCase()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold uppercase tracking-wider mb-1">
                  Status
                </p>
                <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold">
                  {booking.status === "pending" ? "Menunggu Konfirmasi" : "Terkonfirmasi"}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-serif font-bold text-dark mb-4">
                  Informasi Kos
                </h3>
                <div className="mb-4">
                  <img
                    src={booking.kosImage}
                    alt={booking.kosName}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                </div>
                <h4 className="font-bold text-dark text-lg mb-2">{booking.kosName}</h4>
                <p className="text-sm text-muted flex items-center mb-4">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  {booking.kosCity}
                </p>
                <Link
                  to={`/kos/${booking.kosSlug}`}
                  className="text-sm text-gold font-bold hover:underline"
                >
                  Lihat detail kos →
                </Link>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-serif font-bold text-dark mb-4">
                  Detail Booking
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-muted">Check-in</span>
                    <span className="font-bold text-dark">{formatDate(booking.checkInDate)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-muted">Check-out</span>
                    <span className="font-bold text-dark">{formatDate(booking.checkOutDate)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-muted">Durasi</span>
                    <span className="font-bold text-dark">
                      {booking.duration} {booking.duration === 1 ? "bulan" : "bulan"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-muted">Nama Tamu</span>
                    <span className="font-bold text-dark">{booking.guestName}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-muted">No. Telepon</span>
                    <span className="font-bold text-dark">{booking.guestPhone}</span>
                  </div>
                  <div className="pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-dark">Total Pembayaran</span>
                      <span className="text-2xl font-serif font-bold text-gold">
                        Rp{booking.totalPrice.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {booking.notes && (
                <div>
                  <h4 className="text-sm font-bold text-muted uppercase tracking-wider mb-2">
                    Catatan
                  </h4>
                  <p className="text-muted text-sm bg-cream p-3 rounded-lg">
                    {booking.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Owner Contact Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-black/5 border border-gray-100 p-6 mb-6">
          <h3 className="text-lg font-serif font-bold text-dark mb-4">
            Kontak Pemilik Kos
          </h3>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center text-xl font-bold text-gold border border-gold/20">
              {booking.ownerName.charAt(0)}
            </div>
            <div>
              <h4 className="font-bold text-dark">{booking.ownerName}</h4>
              <p className="text-sm text-muted">{booking.ownerPhone}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`tel:${booking.ownerPhone}`}
              className="flex items-center justify-center py-2.5 border border-gray-200 rounded-lg text-sm font-bold text-muted hover:bg-gray-50 transition-colors"
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                ></path>
              </svg>
              Telepon
            </a>
            <a
              href={booking.ownerWhatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center py-2.5 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-gold/10 border border-gold/20 rounded-2xl p-6 mb-6">
          <h4 className="font-bold text-dark mb-2">Langkah Selanjutnya</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li className="flex items-start">
              <span className="text-gold mr-2">•</span>
              <span>Pemilik kos akan menghubungi Anda untuk konfirmasi booking.</span>
            </li>
            <li className="flex items-start">
              <span className="text-gold mr-2">•</span>
              <span>Anda dapat menghubungi pemilik kos melalui kontak yang tersedia.</span>
            </li>
            <li className="flex items-start">
              <span className="text-gold mr-2">•</span>
              <span>Detail pembayaran akan disampaikan langsung oleh pemilik kos.</span>
            </li>
            <li className="flex items-start">
              <span className="text-gold mr-2">•</span>
              <span>Anda dapat melihat status booking di halaman "Booking Saya".</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/my-bookings"
            className="flex-1 py-4 bg-gold text-dark font-bold rounded-xl hover:bg-[#c5a575] transition-colors shadow-lg shadow-gold/20 text-center"
          >
            Lihat Booking Saya
          </Link>
          <Link
            to="/"
            className="flex-1 py-4 border-2 border-gray-200 text-dark font-bold rounded-xl hover:bg-gray-50 transition-colors text-center"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmation;

