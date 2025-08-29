// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    contactNumber: { type: String, required: true, trim: true }, // ✅ direct in User
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },

    accountType: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },

    avatar: { type: String, default: "" },

    // reference to Profile (extra info)
    additionalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },

    token: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
