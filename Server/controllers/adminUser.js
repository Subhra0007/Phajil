//controllers/adminUser.js
import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -token"); // Exclude sensitive fields
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Get users error:", error.message, error.stack);
    return res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password -token").populate("additionalDetails");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Get user error:", error.message, error.stack);
    return res.status(500).json({ success: false, message: "Failed to fetch user" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, contactNumber, accountType } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, contactNumber, accountType },
      { new: true, runValidators: true }
    ).select("-password -token").populate("additionalDetails");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Update user error:", error.message, error.stack);
    return res.status(500).json({ success: false, message: "Failed to update user" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    return res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error.message, error.stack);
    return res.status(500).json({ success: false, message: "Failed to delete user" });
  }
};