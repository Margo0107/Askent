const mongoose = require("mongoose");
require("dotenv").config();
const MONGOURL = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGOURL);
    console.log("mongoDB conected!");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
