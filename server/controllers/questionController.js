const Question = require("../models/Question");

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

exports.getQuestion = async (req, res) => {
  try {
    const questions = await Question.find().sort({ createAt: -1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
