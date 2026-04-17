const User = require("../models/User");
const cloudinary = require("../config/cloudinary");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

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
      expiresIn: "5d",
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
      expiresIn: "5d",
    });
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        userName: user.userName,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

exports.uploadAvatar = async (req, res) => {
  try {
    const userId = req.userId;

    if (!req.file) {
      return res.status(400).json({ message: "no file uploaded" });
    }
    const user = await User.findById(userId);

    if (user.avatar && user.avatar.includes("res.cloudinary.com")) {
      const publicId = user.avatar.split("/").slice(-2).join("/").split(".")[0];
      await cloudinary.uploader.destroy(`avatars/${publicId}`);
    }
    user.avatar = req.file.path;
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

exports.getHome = async (req, res) => {
  const user = await User.findById(req.userId).select("-userPassword");
  res.json({ message: "welcome home", user });
};
