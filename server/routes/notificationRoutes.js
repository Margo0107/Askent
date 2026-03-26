const express = require("express");
const router = express.Router();
const authorMiddleWare = require("../middleware/authorMiddleware");

const {
  notification,
  NotificationCount,
} = require("../controllers/notificationController");

router.get("/", authorMiddleWare, notification);
router.get("/count", authorMiddleWare, NotificationCount);

module.exports = router;
