const express = require("express");
const router = express.Router();

const {
  createQuestion,
  getQuestion,
  likeQuestion,
  answerQuestion,
} = require("../controllers/questionController");
const authorMiddleWare = require("../middleware/authorMiddleware");

router.post("/create", authorMiddleWare, createQuestion);
router.post("/:id/like", authorMiddleWare, likeQuestion);
router.get("/", getQuestion);
router.get("/:id", answerQuestion);

module.exports = router;
