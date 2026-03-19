const express = require("express");
const router = express.Router();
const User = require("../models/User");

const authorMiddleWare = require("../middleware/authorMiddleware");

const { register, login, getHome } = require("../controllers/authorController");

router.post("/register", register);
router.post("/login", login);

router.get("/me", authorMiddleWare, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("userName userEmail");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

router.get("/home", authorMiddleWare, getHome);

module.exports = router;
