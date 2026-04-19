const mongoose = require("mongoose");

const userShema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "https://via.placeholder.com/150",
  },
});
module.exports = mongoose.model("User", userShema);
