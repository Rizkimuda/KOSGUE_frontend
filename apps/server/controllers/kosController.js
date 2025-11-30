const kosService = require("../services/kosService");

const getAllKos = async (req, res) => {
  try {
    const kosList = await kosService.getAllKos();
    res.json(kosList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getKosBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const kos = await kosService.getKosBySlug(slug);
    if (!kos) {
      return res.status(404).json({ message: "Kos not found" });
    }
    res.json(kos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const kosService = require("../services/kosService");
const supabase = require("../config/supabase");

const uploadToSupabase = async (file) => {
  const timestamp = Date.now();
  const fileName = `${timestamp}-${file.originalname.replace(/\s/g, "_")}`;

  const { data, error } = await supabase.storage
    .from("kos-images") // Pastikan nama bucket sesuai
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
    });

  if (error) throw error;

  const { data: publicUrlData } = supabase.storage
    .from("kos-images")
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
};

const createKos = async (req, res) => {
  try {
    let imageUrl = req.body.image;

    if (req.file) {
      imageUrl = await uploadToSupabase(req.file);
    }

    const kosData = {
      ...req.body,
      image: imageUrl,
    };
    const newKos = await kosService.createKos(kosData);
    res.status(201).json(newKos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateKos = async (req, res) => {
  const { slug } = req.params;
  try {
    let imageUrl = req.body.image;

    if (req.file) {
      imageUrl = await uploadToSupabase(req.file);
    }

    const kosData = {
      ...req.body,
      image: imageUrl,
    };
    const updatedKos = await kosService.updateKos(slug, kosData);
    if (!updatedKos) {
      return res.status(404).json({ message: "Kos not found" });
    }
    res.json(updatedKos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteKos = async (req, res) => {
  const { slug } = req.params;
  try {
    const deletedKos = await kosService.deleteKos(slug);
    if (!deletedKos) {
      return res.status(404).json({ message: "Kos not found" });
    }
    res.json({ message: "Kos deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllKos,
  getKosBySlug,
  createKos,
  updateKos,
  deleteKos,
};
