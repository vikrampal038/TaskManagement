const Activity = require("../models/Activity");

const createActivity = async ({
  action,
  performedBy,
  targetType,
  targetId,
  description
}) => {
  return await Activity.create({
    action,
    performedBy,
    targetType,
    targetId,
    description,
  });
};

module.exports = { createActivity };
