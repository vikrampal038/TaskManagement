const { createComment, getTaskComments } = require("../services/commentService");

const addComment = async (req, res) => {
  try {
    const { taskId, message } = req.body;

    const comment = await createComment({
      taskId,
      authorId: req.user.id,
      message,
    });

    res.json({
      success: true,
      data: comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const fetchTaskComments = async (req, res) => {
  try {
    const { taskId } = req.params;

    const comments = await getTaskComments(taskId);

    res.json({
      success: true,
      data: comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { addComment, fetchTaskComments };
