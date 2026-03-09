const express = require("express");
const { uploadAttachment, getTaskAttachments } = require("../controllers/attachmentController");
const protect = require("../middleware/authMiddleware");
const { upload } = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post(
  "/upload",
  protect,
  upload.single("file"),
  uploadAttachment
);

router.get(
  "/:taskId",
  protect,
  getTaskAttachments
);

module.exports = router;
