//config/cloudinary.js
import { v2 as cloudinary } from "cloudinary";

export const cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
    console.log("Cloudinary configured ✅");
  } catch (error) {
    console.error("Cloudinary config error:", error);
  }
};

export default cloudinary;
