// routes/profile.js
import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  getUserDetails,
  updateProfile,
  deleteAccount,
  updateDisplayPicture,
  removeDisplayPicture,
} from "../controllers/profile.js";

const router = express.Router();

// GET profile
router.get("/getUserDetails", auth, getUserDetails);

// Update additionalDetails (dob/gender/about/address)
router.put("/updateProfile", auth, updateProfile);

// Delete account
router.delete("/deleteProfile", auth, deleteAccount);

// Update display picture (express-fileupload -> controller uses req.files.displayPicture.tempFilePath)
router.put("/updateDisplayPicture", auth, updateDisplayPicture);

// Remove display picture (sets avatar = "")
router.put("/removeDisplayPicture", auth, removeDisplayPicture);

export default router;
