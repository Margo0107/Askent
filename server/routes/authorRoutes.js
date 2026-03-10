const express = require("express");
const router = express.Router();

const authorMiddleWare = require("../middleware/authorMiddleware");

const { register, login, getHome } = require("../controllers/authorController");


router.post("/register", register);
router.post("/login", login);
router.get("/home", authorMiddleWare, getHome);

module.exports = router;
