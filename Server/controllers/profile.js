//controllers/profile.js
import fs from "fs";
import User from "../models/User.js";
import Profile from "../models/Profile.js";
import { v2 as cloudinary } from "cloudinary";

export const getUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password").populate("additionalDetails");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const payload = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      contactNumber: user.contactNumber,
      avatar: user.avatar || "",
      image: user.avatar || "",
      additionalDetails: user.additionalDetails || null,
    };

    return res.status(200).json({ success: true, user: payload });
  } catch (error) {
    console.error("Error in getUserDetails:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { additionalDetails } = req.body;

    const user = await User.findById(userId).populate("additionalDetails");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (!user.additionalDetails && additionalDetails) {
      const newProfile = await Profile.create(additionalDetails);
      user.additionalDetails = newProfile._id;
      await user.save();
    } else if (additionalDetails && user.additionalDetails) {
      await Profile.findByIdAndUpdate(user.additionalDetails, { $set: additionalDetails }, { new: true, runValidators: true });
    }

    const updatedUser = await User.findById(userId).select("-password").populate("additionalDetails");

    const payload = {
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      contactNumber: updatedUser.contactNumber,
      avatar: updatedUser.avatar || "",
      image: updatedUser.avatar || "",
      additionalDetails: updatedUser.additionalDetails,
    };

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: payload,
    });
  } catch (error) {
    console.error("Error in updateProfile:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (user.additionalDetails) {
      await Profile.findByIdAndDelete(user.additionalDetails).catch(() => {});
    }

    return res.status(200).json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error in deleteAccount:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateDisplayPicture = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.files || !req.files.displayPicture) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    const tempPath = req.files.displayPicture.tempFilePath;
    if (!tempPath) {
      return res.status(400).json({ success: false, message: "Invalid uploaded file" });
    }

    const result = await cloudinary.uploader.upload(tempPath, { folder: "profile_pics" });

    try {
      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
      }
    } catch (e) {
      console.warn("Failed to remove temp file", tempPath, e);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, { avatar: result.secure_url }, { new: true })
      .select("-password")
      .populate("additionalDetails");

    const payload = {
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      contactNumber: updatedUser.contactNumber,
      avatar: updatedUser.avatar || "",
      image: updatedUser.avatar || "",
      additionalDetails: updatedUser.additionalDetails,
    };

    return res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      user: payload,
    });
  } catch (error) {
    console.error("Error in updateDisplayPicture:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const removeDisplayPicture = async (req, res) => {
  try {
    const userId = req.user.id;

    const updatedUser = await User.findByIdAndUpdate(userId, { avatar: "" }, { new: true })
      .select("-password")
      .populate("additionalDetails");

    if (!updatedUser) return res.status(404).json({ success: false, message: "User not found" });

    const payload = {
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      contactNumber: updatedUser.contactNumber,
      avatar: updatedUser.avatar || "",
      image: updatedUser.avatar || "",
      additionalDetails: updatedUser.additionalDetails,
    };

    return res.status(200).json({
      success: true,
      message: "Profile picture removed successfully",
      user: payload,
    });
  } catch (error) {
    console.error("Error in removeDisplayPicture:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};