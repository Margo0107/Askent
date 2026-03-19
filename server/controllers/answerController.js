const { Query } = require("mongoose");
const Answer = require("../models/Answer");
const Question = require("../models/Question");

exports.createAnswer = async (req, res) => {
  try {
    const { content, parentAnswerId } = req.body;
    const questionId = req.params.id;

    const answer = await Answer.create({
      content,
      questionId,
      parentAnswerId: parentAnswerId || null,
      authorId: req.userId,
    });

    await Question.findByIdAndUpdate(questionId, {
      $inc: { answerCount: 1 },
    });

    const populatedAnswer = await answer.populate("authorId", "userName");

    res.json(populatedAnswer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error creating answer" });
  }
};

exports.getAnswers = async (req, res) => {
  try {
    const questionId = req.params.id;
    const answers = await Answer.find({ questionId })
      .populate("authorId", "userName")
      .sort({ createdAt: -1 });
    res.json(answers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

exports.likeAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) {
      return res.status(404).json({ message: "answer not found" });
    }
    const userId = req.userId;

    const alredyLikes = answer.likes.some((id) => id.toString() === userId);

    if (alredyLikes) {
      answer.likes.pull(userId);
    } else {
      answer.likes.push(userId);
    }
    await answer.save();

    const populateAnswer = await answer.populate("authorId", "userName");

    res.json(populateAnswer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "like error" });
  }
};
