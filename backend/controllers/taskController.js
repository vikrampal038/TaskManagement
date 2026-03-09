const Task = require("../models/Task");
const logActivity = require("../utils/activityLogger");

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      userId: req.user.id,
    });

    await logActivity({
      action: `Task "${task.title}" created`,
      taskId: task._id,
      projectId: task.projectId,
      userId: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { status, priority, search, page = 1, limit = 10 } = req.query;
    const pageNum = Math.max(Number(page) || 1, 1);
    const limitNum = Math.max(Number(limit) || 10, 1);

    const query = { userId: req.user.id };

    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const tasks = await Task.find(query)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    const total = await Task.countDocuments(query);

    res.json({
      total,
      page: pageNum,
      tasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true },
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { status },
      { new: true },
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.find({
      projectId: req.params.projectId,
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments({ userId: req.user.id });

    const todo = await Task.countDocuments({
      userId: req.user.id,
      status: "todo",
    });

    const inProgress = await Task.countDocuments({
      userId: req.user.id,
      status: "in-progress",
    });

    const done = await Task.countDocuments({
      userId: req.user.id,
      status: "done",
    });

    res.json({
      totalTasks,
      todo,
      inProgress,
      done,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
