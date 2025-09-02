// controllers/address.js 
import User from "../models/User.js";
import Profile from "../models/Profile.js";
import mongoose from "mongoose";

async function unsetOldDefault(profileId) {
  await Profile.updateOne(
    { _id: profileId, "addresses.isDefault": true },
    { $set: { "addresses.$.isDefault": false } }
  ).catch((err) => console.error("Error unsetting old default:", err));
}

export const addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("additionalDetails");
    if (!user || !user.additionalDetails) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }
    const profileId = user.additionalDetails._id;
    const newAddress = req.body;

    // Validate required fields
    const requiredFields = ["label", "street", "city", "state", "zipCode", "country"];
    for (const field of requiredFields) {
      if (!newAddress[field]) {
        return res.status(400).json({ success: false, message: `Missing required field: ${field}` });
      }
    }

    if (newAddress.isDefault) {
      await unsetOldDefault(profileId);
    }

    const updated = await Profile.findByIdAndUpdate(
      profileId,
      { $push: { addresses: newAddress } },
      { new: true, runValidators: true }
    );

    return res.status(201).json({ success: true, addresses: updated.addresses });
  } catch (err) {
    console.error("Error adding address:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const { addressId, updatedData } = req.body;
    console.log("Updating address with addressId:", addressId); // Debug log
    console.log("Updated data:", updatedData); // Debug log
    if (!addressId) {
      return res.status(400).json({ success: false, message: "addressId is required" });
    }

    const user = await User.findById(req.user.id).populate("additionalDetails");
    if (!user || !user.additionalDetails) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }
    const profileId = user.additionalDetails._id;

    if (updatedData?.isDefault) {
      await unsetOldDefault(profileId);
    }

    // Build partial update object
    const setObj = {};
    for (const [key, value] of Object.entries(updatedData)) {
      setObj[`addresses.$.${key}`] = value;
    }

    const updated = await Profile.findOneAndUpdate(
      { _id: profileId, "addresses._id": new mongoose.Types.ObjectId(addressId) },
      { $set: setObj },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    return res.status(200).json({ success: true, addresses: updated.addresses });
  } catch (err) {
    console.error("Error updating address:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.body;
    if (!addressId) {
      return res.status(400).json({ success: false, message: "addressId is required" });
    }

    const user = await User.findById(req.user.id).populate("additionalDetails");
    if (!user || !user.additionalDetails) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }
    const profileId = user.additionalDetails._id;

    const updated = await Profile.findByIdAndUpdate(
      profileId,
      { $pull: { addresses: { _id: new mongoose.Types.ObjectId(addressId) } } },
      { new: true }
    );

    return res.status(200).json({ success: true, addresses: updated.addresses });
  } catch (err) {
    console.error("Error deleting address:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("additionalDetails");
    if (!user || !user.additionalDetails) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    const profile = await Profile.findById(user.additionalDetails._id).select("addresses");
    return res.status(200).json({ success: true, addresses: profile.addresses || [] });
  } catch (err) {
    console.error("Error fetching addresses:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};