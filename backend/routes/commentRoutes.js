const express = require("express");
const { addComment, fetchTaskComments } = require("../controllers/commentController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addComment);
router.get("/:taskId", protect, fetchTaskComments);

module.exports = router;
