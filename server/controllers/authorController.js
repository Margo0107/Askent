const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { userName, userEmail, userPassword } = req.body;
    const existingUser = await User.findOne({ userEmail });
    if (existingUser) {
      return res.status(400).json({ message: "user alredy exist" });
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10);
    const newUser = new User({
      userName,
      userEmail,
      userPassword: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(newUser);
    res.status(201).json({ message: "user saved!", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error saving user!" });
  }
};

exports.login = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    const user = await User.findOne({ userEmail });

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    const isMath = await bcrypt.compare(userPassword, user.userPassword);

    if (!isMath) {
      return res.status(400).json({ message: "Wrong password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

exports.getHome = async (req, res) => {
  const user = await User.findById(req.user.userId).select("-userPassword");
  res.json({ message: "welcome home", user });
};
