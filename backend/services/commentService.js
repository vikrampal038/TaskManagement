const Comment = require("../models/Comment");

const createComment = async ({ taskId, authorId, message }) => {
  return await Comment.create({
    task: taskId,
    author: authorId,
    message,
  });
};

const getTaskComments = async (taskId) => {
  return await Comment.find({ task: taskId })
    .populate("author", "name email role")
    .sort({ createdAt: 1 });
};

module.exports = { createComment, getTaskComments };
