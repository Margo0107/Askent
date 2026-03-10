const express = require("express");
const router = express.Router();

const {
  createQuestion,
  getQuestion,
} = require("../controllers/questionController");
const authorMiddleWare = require("../middleware/authorMiddleware");

router.post("/create", authorMiddleWare, createQuestion);
router.get("/", getQuestion);

module.exports = router;
