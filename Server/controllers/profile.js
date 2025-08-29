// controllers/profile.js
import fs from "fs";
import User from "../models/User.js";
import Profile from "../models/Profile.js";
import { v2 as cloudinary } from "cloudinary";

/**
 * NOTE:
 * This controller assumes express-fileupload is used with:
 *   app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }))
 * so uploaded files are available at req.files.displayPicture.tempFilePath
 */

// =========================
// GET USER DETAILS
// =========================
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

// =========================
// UPDATE PROFILE (only additionalDetails)
// =========================
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { additionalDetails } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // If user doesn't yet have a Profile document, create one
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

// =========================
// DELETE ACCOUNT
// =========================
export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // optionally delete Profile doc if present
    if (user.additionalDetails) {
      await Profile.findByIdAndDelete(user.additionalDetails).catch(() => {});
    }

    return res.status(200).json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error in deleteAccount:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// =========================
// UPDATE DISPLAY PICTURE (upload to Cloudinary)
// =========================
export const updateDisplayPicture = async (req, res) => {
  try {
    const userId = req.user.id;

    // Ensure file uploaded via express-fileupload (useTempFiles:true)
    if (!req.files || !req.files.displayPicture) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    const tempPath = req.files.displayPicture.tempFilePath;
    if (!tempPath) {
      return res.status(400).json({ success: false, message: "Invalid uploaded file" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(tempPath, { folder: "profile_pics" });

    // Clean up temp file
    try {
      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
      }
    } catch (e) {
      console.warn("Failed to remove temp file", tempPath, e);
    }

    // Save secure URL to user.avatar
    const updatedUser = await User.findByIdAndUpdate(userId, { avatar: result.secure_url }, { new: true }).select("-password");

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

// =========================
// REMOVE DISPLAY PICTURE (clear avatar field)
// =========================
export const removeDisplayPicture = async (req, res) => {
  try {
    const userId = req.user.id;

    const updatedUser = await User.findByIdAndUpdate(userId, { avatar: "" }, { new: true }).select("-password");

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
