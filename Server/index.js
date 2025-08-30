import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import userRoutes from "./routes/user.js";
import profileRoutes from "./routes/profile.js";
import contactRoutes from "./routes/contact.js";
import { database } from "./config/database.js";
import adminRoutes from "./routes/admin.js";
import { cloudinaryConnect } from "./config/cloudinary.js";
import addressRoutes from "./routes/address.js";

dotenv.config();

console.log("EMAIL_USER:", process.env.EMAIL_USER ? "Loaded ✅" : "Missing ❌");
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
database.connect();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.CLIENT_URL, process.env.ADMIN_URL],
    credentials: true,
  })
);
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

// Cloudinary
cloudinaryConnect();

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1", contactRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/address", addressRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({ success: true, message: "Server is running..." });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));