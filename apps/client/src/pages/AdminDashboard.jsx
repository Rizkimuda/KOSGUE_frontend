import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getKosList, deleteKos } from "../services/api";

function AdminDashboard() {
  const [kosList, setKosList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getKosList();
      setKosList(data);
    } catch (error) {
      console.error("Error fetching kos list:", error);
    }
  };

  const handleDelete = async (slug) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus kos ini?")) {
      try {
        await deleteKos(slug);
        fetchData();
      } catch (error) {
        alert("Gagal menghapus kos");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] font-sans text-[#1a1a1a]">
      {/* Navbar Admin */}
      <nav className="bg-[#1a1a1a] border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-2xl font-serif font-bold tracking-tight text-[#d4af37]"
            >
              KosGue
            </Link>
            <span className="text-white/50 text-sm font-medium border-l border-white/20 pl-8">
              Admin Dashboard
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-sm font-medium text-white/80 hover:text-[#d4af37] transition-colors"
            >
              Lihat Website
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/");
              }}
              className="px-4 py-2 text-sm font-bold text-[#1a1a1a] bg-[#d4af37] rounded-full hover:bg-[#b5952f] transition-colors"
            >
              Keluar
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-serif font-bold text-[#1a1a1a] mb-2">
              Kelola Hunian
            </h1>
            <p className="text-[#666]">
              Atur daftar kos, harga, dan ketersediaan kamar.
            </p>
          </div>
          <Link
            to="/admin/kos/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg
              className="w-5 h-5 text-[#d4af37]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Tambah Kos Baru
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-black/5 overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-8 py-5 text-left text-xs font-bold text-[#1a1a1a]/60 uppercase tracking-wider">
                    Properti
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-[#1a1a1a]/60 uppercase tracking-wider">
                    Lokasi
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-[#1a1a1a]/60 uppercase tracking-wider">
                    Harga / Bulan
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-[#1a1a1a]/60 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-8 py-5 text-right text-xs font-bold text-[#1a1a1a]/60 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {kosList.map((kos) => (
                  <tr
                    key={kos.slug}
                    className="hover:bg-[#fdfbf7]/50 transition-colors group"
                  >
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg shadow-sm border border-gray-100">
                          <img
                            className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            src={kos.image}
                            alt=""
                          />
                        </div>
                        <div className="ml-6">
                          <div className="text-base font-bold text-[#1a1a1a] font-serif">
                            {kos.name}
                          </div>
                          <div className="text-xs text-[#d4af37] font-medium mt-1">
                            {kos.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {kos.city}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-[#1a1a1a]">
                      {kos.price}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Aktif
                      </span>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          to={`/admin/kos/edit/${kos.slug}`}
                          className="text-[#1a1a1a]/60 hover:text-[#d4af37] transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(kos.slug)}
                          className="text-[#1a1a1a]/60 hover:text-red-600 transition-colors"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {kosList.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#fdfbf7] mb-4">
                <svg
                  className="w-8 h-8 text-[#d4af37]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#1a1a1a]">
                Belum ada data kos
              </h3>
              <p className="text-gray-500 mt-1">
                Mulai dengan menambahkan properti baru.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
