const Notification = require("../models/Notification");
exports.notification = async (req, res) => {
  try {
    const notifications = await Notification.find({
      targetUserId: req.userId,
    })
      .populate("userId", "userName avatar")
      .populate("questionId", "title")
      .populate("answerId", "content")
      .sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
