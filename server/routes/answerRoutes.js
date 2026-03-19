const express = require("express");
const router = express.Router();

const authorMiddleWare = require("../middleware/authorMiddleware");
const {
  createAnswer,
  getAnswers,
  likeAnswer,
} = require("../controllers/answerController");

router.post("/:id", authorMiddleWare, createAnswer);
router.get("/:id", getAnswers);
router.post("/:id/like", authorMiddleWare, likeAnswer);

module.exports = router;
