const authService = require("../services/authService");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await authService.register(username, email, password);
    res.status(201).json({
      message: "Registrasi berhasil. Silakan cek email untuk kode OTP.",
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const verify = async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ message: "Email and code are required" });
  }

  try {
    const result = await authService.verifyEmail(email, code);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const data = await authService.login(email, password);
    res.json({ message: "Login successful", ...data });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const upgradeToOwner = async (req, res) => {
  const { fullName, businessNumber, ktpNumber } = req.body;

  if (!fullName || !businessNumber || !ktpNumber) {
    return res
      .status(400)
      .json({ message: "Nama lengkap, nomor bisnis, dan nomor KTP wajib diisi" });
  }

  try {
    const userId = req.user.id;
    const updatedUser = await authService.upgradeToOwner(userId, {
      fullName,
      businessNumber,
      ktpNumber,
    });
    res.json({ message: "Berhasil menjadi Owner", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  verify,
  upgradeToOwner,
};
