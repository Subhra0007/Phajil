//routes/user.js
import express from "express";
import { login, signup, sendotp, verifyOTP, changePassword } from "../controllers/Auth.js";
import { resetPasswordToken, resetPassword } from "../controllers/resetPassword.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/sendotp", sendotp);
router.post("/verifyotp", verifyOTP);
router.post("/changepassword", auth, changePassword);
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

export default router;