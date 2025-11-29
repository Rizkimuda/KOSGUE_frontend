import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getKosList, deleteKos } from "../services/api";

function AdminDashboard() {
  const [kosList, setKosList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
    <div className="min-h-screen bg-gray-50 font-sans text-dark p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-dark">Dashboard Admin</h1>
          <div className="space-x-4">
            <Link
              to="/"
              className="px-4 py-2 bg-gray-200 text-dark rounded hover:bg-gray-300"
            >
              Ke Beranda
            </Link>
            <Link
              to="/admin/kos/new"
              className="px-4 py-2 bg-gold text-dark font-bold rounded hover:bg-[#c5a575]"
            >
              + Tambah Kos
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Kos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lokasi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Harga
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {kosList.map((kos) => (
                <tr key={kos.slug}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 shrink-0">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={kos.image}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {kos.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {kos.city}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {kos.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`/admin/kos/edit/${kos.slug}`}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(kos.slug)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
