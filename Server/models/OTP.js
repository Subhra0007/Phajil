//models/OTP.js
import mongoose from "mongoose";
import mailSender from "../utils/mailSender.js";
import emailTemplate from "../mail/templates/emailVerificationTemplate.js";

const OTPSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 60 * 5 }, // 5 min TTL
});

// Function to send verification email
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email from Phajil",
      emailTemplate(otp)
    );
    console.log("Email sent successfully: ", mailResponse.response);
  } catch (error) {
    console.error("Error occurred while sending email: ", error);
    throw error;
  }
}

// Pre-save middleware
OTPSchema.pre("save", async function (next) {
  console.log("New OTP document saved to the database");
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

const OTP = mongoose.models.OTP || mongoose.model("OTP", OTPSchema);
export default OTP;