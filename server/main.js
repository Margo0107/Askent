const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;
const app = express();

app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(MONGOURL);
    console.log("mongoDB conected!");

    app.listen(PORT, () => {
      console.log("server on starded on 5000");
    });
    
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
app.get("/", (req, res) => {
  res.send("server work ");
});

connectDB();
