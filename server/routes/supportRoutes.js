const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const authorMiddleware = require("../middleware/authorMiddleware");

router.post("/support", authorMiddleware, async (req, res) => {
  try {
    const { message, userEmail: bodyEmail } = req.body;
    const email = req.user?.userEmail || bodyEmail || "user not provider";

    if (!message) {
      return res.status(400).json({ message: "message required" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "megi.busenka@gmail.com",
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Support" <megi.busenka@gmail.com>`,
      to: "megi.busenka@gmail.com",
      subject: "Support message",
      replyTo: email,
      text: `email: ${email || "email not found"} 
       Message:
        ${message}`,
    });

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error sending email" });
  }
});
module.exports = router;
