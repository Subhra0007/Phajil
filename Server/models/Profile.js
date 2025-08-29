// models/Profile.js
import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  gender: { type: String },
  dateOfBirth: { type: Date },
  address: { type: String },
  about: { type: String },
});

const Profile =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema);

export default Profile;
