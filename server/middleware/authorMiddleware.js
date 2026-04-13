const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authorMiddleWare = async (req, res, next) => {
  const authorHeader = req.headers.authorization;
  if (!authorHeader) {
    return res.status(401).json({ message: "not token provided" });
  }
  const token = authorHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    console.log("DECODED:", decoded);
    console.log("USER:", user);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    req.userId = decoded.userId;
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "token wxpired!" });
  }
};
module.exports = authorMiddleWare;
