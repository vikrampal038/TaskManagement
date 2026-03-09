const Activity = require("../models/Activity");

const getRecentActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ performedBy: req.user.id })
      .populate("performedBy", "name email role")
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      data: activities
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getRecentActivities };
