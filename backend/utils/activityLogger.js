const Activity = require("../models/Activity");

const logActivity = async ({ action, taskId, projectId, userId }) => {

  try {

    await Activity.create({
      action,
      taskId,
      projectId,
      userId
    });

  } catch (error) {
    console.error("Activity log error:", error.message);
  }

};

module.exports = logActivity;