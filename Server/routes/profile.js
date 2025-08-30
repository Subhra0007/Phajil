//routes/profile.js
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

router.get("/getUserDetails", auth, getUserDetails);
router.put("/updateProfile", auth, updateProfile);
router.delete("/deleteProfile", auth, deleteAccount);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.put("/removeDisplayPicture", auth, removeDisplayPicture);

export default router;