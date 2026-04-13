const mongoose = require("mongoose");

const NotificationShema = new mongoose.Schema({
  type: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  targetUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  answerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answer",
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Notification", NotificationShema);
