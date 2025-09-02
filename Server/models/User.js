// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const cartItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    contactNumber: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Please provide a valid 10-digit phone number"],
    },
    password: { type: String, required: true, minlength: 8 },
    accountType: { type: String, enum: ["user", "admin"], default: "user" },
    avatar: { type: String, default: "" },
    token: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    userCart: { type: [cartItemSchema], default: [] },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    additionalDetails: { type: mongoose.Schema.Types.ObjectId, ref: "Profile", required: true },
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.index({ token: 1 });

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;