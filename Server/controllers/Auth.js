//controllers/Auth.js
import bcrypt from "bcrypt";
import User from "../models/User.js";
import OTP from "../models/OTP.js";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import mailSender from "../utils/mailSender.js";
import Profile from "../models/Profile.js";
import dotenv from "dotenv";

dotenv.config();

//---------------------User----------------------------
// Improved email validation using a stricter regex
const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email);
};

export const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    console.log("Received signup data:", { firstName, lastName, email, password: "****", confirmPassword: "****", contactNumber, otp, accountType });

    if (!firstName || !lastName || !email || !password || !confirmPassword || !otp || !contactNumber) {
      return res.status(403).json({ success: false, message: "All fields are required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email address" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Password and Confirm Password do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists. Please sign in." });
    }

    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0) {
      return res.status(400).json({ success: false, message: "OTP not found or expired" });
    }
    const latestOTP = response[0];
    console.log("Latest OTP from DB:", latestOTP.otp, "Received OTP:", otp);
    if (latestOTP.otp !== otp) {
      return res.status(400).json({ success: false, message: "The OTP is not valid" });
    }
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    if (latestOTP.createdAt < tenMinutesAgo) {
      return res.status(400).json({ success: false, message: "OTP has expired" });
    }

    let profileDetails;
    try {
      profileDetails = await Profile.create({
        gender: null,
        dateOfBirth: null,
        about: null,
        addresses: [],
      });
      console.log("Profile created:", profileDetails._id);
    } catch (profileErr) {
      console.error("Profile creation error:", profileErr.message, profileErr.stack);
      return res.status(500).json({ success: false, message: "Failed to create profile" });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password, // Handled by schema pre-save hook
      accountType,
      additionalDetails: profileDetails._id,
      avatar: "",
    });
    console.log("User created:", user._id);

    return res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        contactNumber: user.contactNumber,
        accountType: user.accountType,
      },
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Signup error:", error.message, error.stack);
    return res.status(500).json({ success: false, message: "User cannot be registered. Please try again." });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0) {
      return res.status(400).json({ success: false, message: "OTP not found or expired" });
    }

    const latestOTP = response[0];
    if (latestOTP.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    if (latestOTP.createdAt < tenMinutesAgo) {
      return res.status(400).json({ success: false, message: "OTP has expired" });
    }

    return res.status(200).json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error.message, error.stack);
    return res.status(500).json({ success: false, message: "Error verifying OTP" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please Fill up All the Required Fields" });
    }

    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(401).json({ success: false, message: "User not registered" });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id, accountType: user.accountType },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      if (!token) {
        throw new Error("Failed to generate token");
      }

      // Avoid updating token in document (security risk)
      user.password = undefined;

      const options = { expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), httpOnly: true };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          contactNumber: user.contactNumber,
          accountType: user.accountType,
          additionalDetails: user.additionalDetails,
        },
        message: "User Login Success",
      });
    } else {
      return res.status(401).json({ success: false, message: "Password is incorrect" });
    }
  } catch (error) {
    console.error("Login error:", error.message, error.stack);
    return res.status(500).json({ success: false, message: "Login Failure Please Try Again" });
  }
};

export const sendotp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email address" });
    }

    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      return res.status(401).json({ success: false, message: "User is Already Registered" });
    }

    let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
    let result = await OTP.findOne({ otp });
    let attempts = 0;
    const maxAttempts = 5;
    while (result && attempts < maxAttempts) {
      otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
      result = await OTP.findOne({ otp });
      attempts++;
    }
    if (attempts >= maxAttempts) {
      return res.status(500).json({ success: false, message: "Unable to generate unique OTP" });
    }

    await OTP.create({ email, otp });
    console.log("OTP generated and saved:", otp);
    res.status(200).json({ success: true, message: "OTP Sent Successfully", otp });
  } catch (error) {
    console.error("Send OTP error:", error.message, error.stack);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id);
    if (!userDetails) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const { oldPassword, newPassword } = req.body;

    const isPasswordMatch = await bcrypt.compare(oldPassword, userDetails.password);
    if (!isPasswordMatch) return res.status(401).json({ success: false, message: "The password is incorrect" });

    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(req.user.id, { password: encryptedPassword }, { new: true });

    return res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Change password error:", error.message, error.stack);
    return res.status(500).json({ success: false, message: "Error occurred while updating password", error: error.message });
  }
};


