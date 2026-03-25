const express = require("express");
const router = express.Router();
const authorMiddleWare = require("../middleware/authorMiddleware");

const { notification } = require("../controllers/notificationController");

router.get("/", authorMiddleWare, notification);

module.exports = router;
