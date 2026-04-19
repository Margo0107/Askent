const express = require("express");
const router = express.Router();
const User = require("../models/User");
const multer = require("multer");

const authorMiddleWare = require("../middleware/authorMiddleware");

const {
  register,
  login,
  getHome,
  uploadAvatar,
} = require("../controllers/authorController");

router.post("/register", register);
router.post("/login", login);

router.get("/me", authorMiddleWare, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select(
      "userName userEmail avatar",
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

router.get("/home", authorMiddleWare, getHome);

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/upload-avatar",
  authorMiddleWare,
  upload.single("avatar"),
  uploadAvatar,
);

module.exports = router;
