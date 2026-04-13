const Answer = require("../models/Answer");
const Question = require("../models/Question");
const Notification = require("../models/Notification");

exports.createAnswer = async (req, res) => {
  try {
    const { content, parentAnswerId } = req.body;
    const questionId = req.params.id;

    const question = await Question.findById(questionId);

    const answer = await Answer.create({
      content,
      questionId,
      parentAnswerId: parentAnswerId || null,
      authorId: req.userId,
    });

    let targetUserId;

    if (parentAnswerId) {
      const parentAnswer = await Answer.findById(parentAnswerId);
      targetUserId = parentAnswer.authorId;
    } else {
      targetUserId = question.authorId;
    }
    if (targetUserId.toString() !== req.userId) {
      await Notification.create({
        type: "answer",
        userId: req.userId,
        targetUserId,
        questionId: question._id,
        answerId: answer._id,
        isRead: false,
      });
    }

    if (!parentAnswerId) {
      await Question.findByIdAndUpdate(questionId, {
        $inc: { answerCount: 1 },
      });
    }
    if (parentAnswerId) {
      await Answer.findByIdAndUpdate(parentAnswerId, {
        $inc: { replyCount: 1 },
      });
    }

    const populatedAnswer = await answer.populate(
      "authorId",
      "userName avatar",
    );

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
      .populate("authorId", "userName avatar")
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

    let existing;

    if (alredyLikes) {
      answer.likes.pull(userId);

      await Notification.findOneAndDelete({
        type: "like_answer",
        userId: req.userId,
        targetUserId: answer.authorId,
        answerId: answer._id,
      });
    } else {
      answer.likes.push(userId);

      if (answer.authorId.toString() !== userId) {
        existing = await Notification.findOne({
          type: "like_answer",
          userId: req.userId,
          answerId: answer._id,
          targetUserId: answer.authorId,
        });
      }
      if (!existing) {
        await Notification.create({
          type: "like_answer",
          userId: req.userId,
          targetUserId: answer.authorId,
          answerId: answer._id,
          questionId: answer.questionId,
          isRead: false,
        });
      }
    }
    await answer.save();

    const populateAnswer = await answer.populate("authorId", "userName avatar");

    res.json(populateAnswer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "like error" });
  }
};
