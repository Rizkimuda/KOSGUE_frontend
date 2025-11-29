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

const createKos = async (req, res) => {
  try {
    const kosData = {
      ...req.body,
      image: req.file
        ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
        : req.body.image,
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
    const kosData = {
      ...req.body,
      image: req.file
        ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
        : req.body.image,
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
