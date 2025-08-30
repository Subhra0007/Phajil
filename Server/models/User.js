// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: true },
  password: { type: String, required: true },
  accountType: { type: String, enum: ["user", "admin"], default: "user" },
  avatar: { type: String, default: "" },
 
   token: { type: String, default: null },
  resetPasswordExpires: { type: Date, default: null },

  userCart: { type: Object, default: {} },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "order" }],
  additionalDetails: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
},
  { timestamps: true }

);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
