const express = require("express");
const connectDB = require("./config/db");
const authorRoutes = require("./routes/authorRoutes");
const questionRoutes = require("./routes/questionRoutes");
const answerRoutes = require("./routes/answerRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/author", authorRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/question", questionRoutes);
app.use("/api/answer", answerRoutes);
app.use("/api/notifications", notificationRoutes);

app.listen(PORT, () => {
  console.log("server on starded on 5000");
});
