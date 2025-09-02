// config/database.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const database = {
  connect: async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("✅ DB Connected Successfully");
    } catch (error) {
      console.error("❌ DB Connection Failed:", error);
      process.exit(1);
    }
  },
};
