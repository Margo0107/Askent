const Question = require("../models/Question");
const Notification = require("../models/Notification");
//creating posts
exports.createQuestion = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("USER ID:", req.userId);

    const { title, content } = req.body;
    const question = await Question.create({
      title,
      content,
      authorId: req.userId,
    });

    console.log("BODY:", req.body);
    console.log("USER ID:", req.userId);

    res.status(200).json(question);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating question" });
  }
};
//getting all posts
exports.getQuestion = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("authorId", "userName avatar")
      .sort({ createAt: -1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
//liked question
exports.likeQuestion = async (req, res) => {
  try {
    const questions = await Question.findById(req.params.id);
    if (!questions) {
      return res.status(404).json({ message: "Question not found" });
    }
    if (!questions.likes) {
      questions.likes = [];
    }
    const userId = req.userId;

    const alredyLiked = questions.likes.some((id) => id.toString() === userId);

    if (alredyLiked) {
      questions.likes.pull(userId);

      await Notification.findOneAndDelete({
        userId: req.userId,
        targetUserId: questions.authorId,
        questionId: questions._id,
        type: "like",
      });
    } else {
      questions.likes.push(userId);
    }

    const existing = await Notification.findOne({
      userId: req.userId,
      questionId: questions._id,
      type: "like",
    });

    if (!alredyLiked && questions.authorId.toString() !== userId && !existing) {
      console.log("create notification");
      await Notification.create({
        type: "like",
        userId: req.userId,
        targetUserId: questions.authorId,
        questionId: questions._id,
        isRead: false,
      });
    }

    await questions.save();

    const updated = await Question.findById(questions._id).populate(
      "authorId",
      "userName avatar",
    );
    res.json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "like error" });
  }
};
//answer question
exports.answerQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate(
      "authorId",
      "userName avatar",
    );
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
exports.searchQuestion = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query || typeof query !== "string") {
      return res.json([]);
    }
    const question = await Question.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ],
    }).limit(10);

    res.json(question);
  } catch (error) {
    console.log("search error:", error);
    res.status(500).json({ message: "search error" });
  }
};
