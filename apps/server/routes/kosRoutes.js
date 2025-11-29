const express = require("express");
const router = express.Router();
const kosController = require("../controllers/kosController");
const authenticateToken = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/", kosController.getAllKos);
router.get("/:slug", kosController.getKosBySlug);
router.post("/", authenticateToken, adminMiddleware, kosController.createKos);
router.put(
  "/:slug",
  authenticateToken,
  adminMiddleware,
  kosController.updateKos
);
router.delete(
  "/:slug",
  authenticateToken,
  adminMiddleware,
  kosController.deleteKos
);

module.exports = router;
