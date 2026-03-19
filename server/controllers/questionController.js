const Question = require("../models/Question");
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
    const questions = await Question.find().sort({ createAt: -1 });
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
    } else {
      questions.likes.push(userId);
    }
    await questions.save();
    res.json(questions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "like error" });
  }
};
//answer question
exports.answerQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
