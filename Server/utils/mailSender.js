//utils/mailSender.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // your Gmail address
        pass: process.env.EMAIL_PASS, // your 16-char App Password
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER, // sender (your app's email)
      to: email,                    // ✅ send directly to the user's email
      subject: title,
      html: body,
    });

    console.log("✅ Email sent: ", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Error in mailSender: ", error);
    throw error;
  }
};

export default mailSender;
