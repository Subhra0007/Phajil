//models/Profile.js
import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    label: { type: String, required: true,enum: ["Home", "Work","home","work"], },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
  },
  { _id: true }
);

const profileSchema = new mongoose.Schema({
  gender: { type: String },
  dateOfBirth: { type: Date },
  about: { type: String },
  addresses: [addressSchema],
});

const Profile = mongoose.models.Profile || mongoose.model("Profile", profileSchema);
export default Profile;