import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createKos, getKosBySlug, updateKos } from "../services/api";

function KosForm() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isEdit = !!slug;

  const [formData, setFormData] = useState({
    slug: "",
    name: "",
    city: "",
    price: "",
    image: "",
    summary: "",
    size: "",
    capacity: "",
    facilities: "",
    services: "",
    owner_name: "",
    owner_phone: "",
    owner_whatsapp: "",
  });

  useEffect(() => {
    if (isEdit) {
      fetchData();
    }
  }, [slug]);

  const fetchData = async () => {
    try {
      const data = await getKosBySlug(slug);
      setFormData({
        ...data,
        facilities: data.facilities?.join(", ") || "",
        services: data.services?.join(", ") || "",
        owner_name: data.owner?.name || "",
        owner_phone: data.owner?.phone || "",
        owner_whatsapp: data.owner?.whatsapp || "",
      });
    } catch (error) {
      console.error("Error fetching kos:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      facilities: formData.facilities.split(",").map((item) => item.trim()),
      services: formData.services.split(",").map((item) => item.trim()),
      owner: {
        name: formData.owner_name,
        phone: formData.owner_phone,
        whatsapp: formData.owner_whatsapp,
      },
    };

    try {
      if (isEdit) {
        await updateKos(slug, payload);
      } else {
        await createKos(payload);
      }
      navigate("/admin");
    } catch (error) {
      alert("Gagal menyimpan data: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-6">
          {isEdit ? "Edit Kos" : "Tambah Kos Baru"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slug (URL Unik)
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                disabled={isEdit}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Kos
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kota / Lokasi
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Harga
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL Gambar Utama
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi Singkat
            </label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border rounded"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ukuran Kamar
              </label>
              <input
                type="text"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kapasitas
              </label>
              <input
                type="text"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fasilitas (pisahkan dengan koma)
            </label>
            <input
              type="text"
              name="facilities"
              value={formData.facilities}
              onChange={handleChange}
              placeholder="AC, Wi-Fi, Kamar Mandi Dalam"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Layanan (pisahkan dengan koma)
            </label>
            <input
              type="text"
              name="services"
              value={formData.services}
              onChange={handleChange}
              placeholder="Laundry, Cleaning Service"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Info Pemilik</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Pemilik
                </label>
                <input
                  type="text"
                  name="owner_name"
                  value={formData.owner_name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  No. HP
                </label>
                <input
                  type="text"
                  name="owner_phone"
                  value={formData.owner_phone}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Link WhatsApp
                </label>
                <input
                  type="text"
                  name="owner_whatsapp"
                  value={formData.owner_whatsapp}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gold text-dark font-bold rounded hover:bg-[#c5a575]"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default KosForm;
