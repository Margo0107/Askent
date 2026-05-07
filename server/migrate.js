// Скрипт для миграции существующих данных
const mongoose = require("mongoose");
const User = require("./models/User");
const Question = require("./models/Question");
const Answer = require("./models/Answer");
require("dotenv").config();

const migrateData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    // Обновляем все вопросы
    const questions = await Question.find().populate("authorId");
    for (const question of questions) {
      if (question.authorId) {
        question.authorName = question.authorId.userName;
        question.authorAvatar = question.authorId.avatar || "https://via.placeholder.com/150";
        await question.save();
      }
    }

    // Обновляем все ответы
    const answers = await Answer.find().populate("authorId");
    for (const answer of answers) {
      if (answer.authorId) {
        answer.authorName = answer.authorId.userName;
        answer.authorAvatar = answer.authorId.avatar || "https://via.placeholder.com/150";
        await answer.save();
      }
    }

    console.log("Миграция завершена");
    process.exit(0);
  } catch (error) {
    console.error("Ошибка миграции:", error);
    process.exit(1);
  }
};

migrateData();