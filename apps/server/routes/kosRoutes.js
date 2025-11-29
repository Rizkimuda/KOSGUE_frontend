const express = require("express");
const router = express.Router();
const kosController = require("../controllers/kosController");
const authenticateToken = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.get("/", kosController.getAllKos);
router.get("/:slug", kosController.getKosBySlug);
router.post(
  "/",
  authenticateToken,
  adminMiddleware,
  upload.single("image"),
  kosController.createKos
);
router.put(
  "/:slug",
  authenticateToken,
  adminMiddleware,
  upload.single("image"),
  kosController.updateKos
);
router.delete(
  "/:slug",
  authenticateToken,
  adminMiddleware,
  kosController.deleteKos
);

module.exports = router;
