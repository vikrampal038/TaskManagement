const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const { createTaskSchema } = require("../validators/taskValidator");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  updateTaskStatus,
  getTasksByProject,
  getDashboardStats,
} = require("../controllers/taskController");

router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);
router.patch("/:id/status", protect, updateTaskStatus);
router.get("/project/:projectId", protect, getTasksByProject);
router.get("/stats/dashboard", protect, getDashboardStats);
router.post("/", protect, validate(createTaskSchema), createTask);

module.exports = router;
