//routes/user.js
import express from "express";
import { login, signup, sendotp, verifyOTP, changePassword } from "../controllers/Auth.js";
import { resetPasswordToken, resetPassword } from "../controllers/resetPassword.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login);

// Route for user signup
router.post("/signup", signup);

// Route for sending OTP to the user's email
router.post("/sendotp", sendotp);
router.post("/verifyotp", verifyOTP);
// Route for Changing the password
router.post("/changepassword", auth, changePassword);

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken);

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword);

// Export router (ESM default export)
export default router;
