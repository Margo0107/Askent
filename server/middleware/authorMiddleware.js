const jwt = require("jsonwebtoken");

const authorMiddleWare = (req, res, next) => {
  const authorHeader = req.headers.authorization;
  if (!authorHeader) {
    return res.status(401).json({ message: "not token provided" });
  }
  const token = authorHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "token wxpired!" });
  }
};
module.exports = authorMiddleWare;
