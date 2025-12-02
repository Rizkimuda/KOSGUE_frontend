const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateToken = require("../middleware/authMiddleware");

router.post("/register", authController.register);
router.post("/verify", authController.verify);
router.post("/login", authController.login);
router.post(
  "/upgrade-to-owner",
  authenticateToken,
  authController.upgradeToOwner
);

module.exports = router;
