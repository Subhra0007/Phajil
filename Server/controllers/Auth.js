// controllers/Auth.js
import bcrypt from "bcrypt";
import User from "../models/User.js";
import OTP from "../models/OTP.js";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import mailSender from "../utils/mailSender.js";
import Profile from "../models/Profile.js";
import dotenv from "dotenv";

dotenv.config();

// ===============================
// Signup Controller
// ===============================
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

    if (!firstName || !lastName || !email || !password || !confirmPassword || !otp || !contactNumber) {
      return res.status(403).send({ success: false, message: "All Fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Password and Confirm Password do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: "User already exists. Please sign in." });

    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(400).json({ success: false, message: "The OTP is not valid" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Profile now holds only extra details (no contactNumber)
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      address: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber, // ✅ stored in User
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      avatar: "",
    });

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
    console.error(error);
    return res.status(500).json({ success: false, message: "User cannot be registered. Please try again." });
  }
};

// ===============================
// Verify OTP Controller
// ===============================
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    // Get latest OTP for this email
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

    if (response.length === 0) {
      return res.status(400).json({ success: false, message: "OTP not found or expired" });
    }

    if (response[0].otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    return res.status(200).json({ success: true, message: "OTP verified successfully" });

  } catch (error) {
    console.error("Error verifying OTP", error);
    return res.status(500).json({ success: false, message: "Error verifying OTP" });
  }
};

// ===============================
// Login Controller
// ===============================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: "Please Fill up All the Required Fields" });

    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) return res.status(401).json({ success: false, message: "User is not Registered. Please SignUp." });

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id, accountType: user.accountType },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      user.token = token;
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
    console.error(error);
    return res.status(500).json({ success: false, message: "Login Failure Please Try Again" });
  }
};

// ===============================
// Send OTP Controller
// ===============================
export const sendotp = async (req, res) => {
  try {
    const { email } = req.body;
    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) return res.status(401).json({ success: false, message: "User is Already Registered" });

    let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
    let result = await OTP.findOne({ otp });
    while (result) {
      otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
      result = await OTP.findOne({ otp });
    }

    await OTP.create({ email, otp });

    res.status(200).json({ success: true, message: "OTP Sent Successfully", otp });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// ===============================
// Change Password Controller
// ===============================
export const changePassword = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id);
    const { oldPassword, newPassword } = req.body;

    const isPasswordMatch = await bcrypt.compare(oldPassword, userDetails.password);
    if (!isPasswordMatch) return res.status(401).json({ success: false, message: "The password is incorrect" });

    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(req.user.id, { password: encryptedPassword }, { new: true });

    return res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error occurred while updating password", error: error.message });
  }
};
