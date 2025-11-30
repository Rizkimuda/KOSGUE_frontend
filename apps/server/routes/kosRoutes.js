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
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "gallery", maxCount: 5 },
  ]),
  kosController.createKos
);
router.put(
  "/:slug",
  authenticateToken,
  adminMiddleware,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "gallery", maxCount: 5 },
  ]),
  kosController.updateKos
);
router.delete(
  "/:slug",
  authenticateToken,
  adminMiddleware,
  kosController.deleteKos
);

router.post("/:slug/reviews", authenticateToken, kosController.addReview);

module.exports = router;
