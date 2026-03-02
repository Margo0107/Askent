const express = require("express");
const connectDB = require("./config/db");
const authorRoutes = require("./routes/authorRoutes");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/author", authorRoutes);

app.listen(PORT, () => {
  console.log("server on starded on 5000");
});
