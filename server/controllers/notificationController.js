const Notification = require("../models/Notification");
const Answer = require("../models/Answer");
const Question = require("../models/Question");
exports.notification = async (req, res) => {
  try {
    const notifications = await Notification.find({
      targetUserId: req.userId,
    })
      .populate("userId", "userName avatar")
      .populate("targetUserId", "userName avatar")
      .populate("answerId", "content likes replyCount")
      .populate("questionId", "title")
      .sort({ createdAt: -1 });

    await Notification.updateMany(
      { targetUserId: req.userId },
      { isRead: true },
    );
    console.log("NOTIFICATIONS FROM DB:", notifications);
    res.json(notifications);
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ message: "server error" });
  }
};
exports.NotificationCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      targetUserId: req.userId,
      isRead: false,
    });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
