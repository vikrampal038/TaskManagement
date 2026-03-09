const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true
    },

    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    targetType: {
      type: String,
      enum: ["USER", "PROJECT", "TASK"],
      required: true
    },

    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    description: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
