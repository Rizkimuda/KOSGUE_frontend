import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { formatPrice } from "../utils/formatPrice";

function MyBookings() {
  const { isAuthenticated, user, getUserBookings } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all"); // all, pending, confirmed, cancelled

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login?redirect=/my-bookings");
      return;
    }

    loadBookings();
  }, [isAuthenticated, navigate]);

  const loadBookings = () => {
    const userBookings = getUserBookings();
    // Sort by creation date, newest first
    const sortedBookings = userBookings.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setBookings(sortedBookings);
  };

  const filteredBookings =
    filter === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === filter);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        label: "Menunggu Konfirmasi",
        className: "bg-yellow-100 text-yellow-800",
      },
      confirmed: {
        label: "Terkonfirmasi",
        className: "bg-green-100 text-green-800",
      },
      cancelled: {
        label: "Dibatalkan",
        className: "bg-red-100 text-red-800",
      },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span
        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${config.className}`}
      >
        {config.label}
      </span>
    );
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-cream font-sans text-dark pb-24">
      {/* Header */}
      <div className="bg-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-serif font-bold mb-2">Booking Saya</h1>
          <p className="text-white/80">Kelola dan lihat status booking kos Anda</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { value: "all", label: "Semua" },
              { value: "pending", label: "Menunggu" },
              { value: "confirmed", label: "Terkonfirmasi" },
              { value: "cancelled", label: "Dibatalkan" },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
                  filter === tab.value
                    ? "bg-gold text-dark"
                    : "bg-gray-100 text-muted hover:bg-gray-200"
                }`}
              >
                {tab.label}
                {tab.value !== "all" && (
                  <span className="ml-2">
                    ({bookings.filter((b) => b.status === tab.value).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <svg
              className="w-16 h-16 text-gray-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            <h3 className="text-xl font-serif font-bold text-dark mb-2">
              Belum Ada Booking
            </h3>
            <p className="text-muted mb-6">
              {filter === "all"
                ? "Anda belum memiliki booking. Mulai jelajahi kos pilihan Anda!"
                : `Tidak ada booking dengan status "${filter}"`}
            </p>
            {filter === "all" && (
              <Link
                to="/"
                className="inline-block px-6 py-3 bg-gold text-dark font-bold rounded-xl hover:bg-[#c5a575] transition-colors shadow-lg shadow-gold/20"
              >
                Jelajahi Kos
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6 md:p-8">
                  <div className="grid md:grid-cols-4 gap-6">
                    {/* Image */}
                    <div className="md:col-span-1">
                      <img
                        src={booking.kosImage}
                        alt={booking.kosName}
                        className="w-full h-48 md:h-full object-cover rounded-xl"
                      />
                    </div>

                    {/* Details */}
                    <div className="md:col-span-3">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-serif font-bold text-dark mb-2">
                            {booking.kosName}
                          </h3>
                          <p className="text-sm text-muted flex items-center mb-3">
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
                          <p className="text-xs text-muted mb-4">
                            Booking ID: #{booking.id.slice(-8).toUpperCase()}
                          </p>
                        </div>
                        <div className="md:text-right">
                          {getStatusBadge(booking.status)}
                        </div>
                      </div>

                      {/* Booking Info Grid */}
                      <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        <div>
                          <p className="text-xs text-muted uppercase tracking-wider mb-1">
                            Check-in
                          </p>
                          <p className="font-bold text-dark">
                            {formatDate(booking.checkInDate)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted uppercase tracking-wider mb-1">
                            Check-out
                          </p>
                          <p className="font-bold text-dark">
                            {formatDate(booking.checkOutDate)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted uppercase tracking-wider mb-1">
                            Durasi
                          </p>
                          <p className="font-bold text-dark">
                            {booking.duration} {booking.duration === 1 ? "bulan" : "bulan"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted uppercase tracking-wider mb-1">
                            Total Pembayaran
                          </p>
                          <p className="font-bold text-gold text-lg">
                            Rp{booking.totalPrice.toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>

                      {/* Owner Contact */}
                      <div className="border-t border-gray-100 pt-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center text-lg font-bold text-gold border border-gold/20">
                              {booking.ownerName.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-dark text-sm">{booking.ownerName}</p>
                              <p className="text-xs text-muted">{booking.ownerPhone}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <a
                              href={`tel:${booking.ownerPhone}`}
                              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-muted hover:bg-gray-50 transition-colors"
                            >
                              Telepon
                            </a>
                            <a
                              href={booking.ownerWhatsapp}
                              target="_blank"
                              rel="noreferrer"
                              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20"
                            >
                              WhatsApp
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-4 flex gap-3">
                        <Link
                          to={`/booking/${booking.id}/confirmation`}
                          className="text-sm text-gold font-bold hover:underline"
                        >
                          Lihat Detail →
                        </Link>
                        <Link
                          to={`/kos/${booking.kosSlug}`}
                          className="text-sm text-muted font-bold hover:underline"
                        >
                          Lihat Kos →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;

