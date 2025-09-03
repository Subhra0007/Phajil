//index.js
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import bcrypt from "bcryptjs";  
import userRoutes from "./routes/user.js";
import profileRoutes from "./routes/profile.js";
import contactRoutes from "./routes/contact.js";
import { database } from "./config/database.js";
import adminRoutes from "./routes/admin.js";
// import adminProductRoutes from "./routes/product.js";
// import adminOrderRoutes from "./routes/order.js";
// import adminBlogRoutes from "./routes/blog.js";
import adminDetailsRoutes from "./routes/adminDetails.js";
import { cloudinaryConnect } from "./config/cloudinary.js";
import addressRoutes from "./routes/address.js";
import publicRoutes from "./routes/public.js";
import User from "./models/User.js";
import Profile from "./models/Profile.js";

dotenv.config();

console.log("EMAIL_USER:", process.env.EMAIL_USER ? "Loaded ✅" : "Missing ❌");
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌");
console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL ? "Loaded ✅" : "Missing ❌");
console.log("ADMIN_PASSWORD:", process.env.ADMIN_PASSWORD ? "Loaded ✅" : "Missing ❌");

const app = express();
const PORT = process.env.PORT || 5000;

// ---------- Connect DB ----------
// ---------- Connect DB & Ensure Admin ----------
(async () => {
  await database.connect();

  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.log("⚠️ Admin credentials not set in .env");
      return;
    }

    let admin = await User.findOne({ email: adminEmail });

    if (!admin) {
      const hashed = await bcrypt.hash(adminPassword, 10);
      const profile = await Profile.create({});

      admin = await User.create({
        firstName: "Admin",
        lastName: "User",
        email: adminEmail,
        contactNumber: "0000000000",
        password: hashed,
        accountType: "admin",
        additionalDetails: profile._id,
      });

      console.log("✅ Admin user created");
    } else if (admin.accountType !== "admin") {
      admin.accountType = "admin";
      await admin.save();
      console.log("✅ Existing user promoted to admin");
    }
  } catch (err) {
    console.error("❌ Admin setup failed", err);
  }
})();
// ---------- Middleware ----------
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.CLIENT_URL, process.env.ADMIN_URL].filter(Boolean),
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// ---------- Cloudinary ----------
cloudinaryConnect();

// ---------- Routes ----------
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1", contactRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/admin", adminDetailsRoutes);
// app.use("/api/v1/admin", adminProductRoutes); // products
// app.use("/api/v1/admin", adminOrderRoutes);   // orders
// app.use("/api/v1/admin", adminBlogRoutes);    // blogs
// app.use("/api/v1/admin", adminUserRoutes);    // users
app.use("/api/v1/address", addressRoutes);
app.use("/api/v1/public", publicRoutes);

// ---------- Test Route ----------
app.get("/", (req, res) => {
  res.json({ 
    success: true, 
    message: "🚀 Server is running...",
    adminEmail: process.env.ADMIN_EMAIL ? "Configured" : "Not configured"
  });
});

// ---------- Admin Test Route ----------
app.get("/api/v1/admin/test", (req, res) => {
  res.json({
    adminEmail: process.env.ADMIN_EMAIL ? "Loaded ✅" : "Missing ❌",
    adminPassword: process.env.ADMIN_PASSWORD ? "Loaded ✅" : "Missing ❌"
  });
});

// ---------- Error Handling ----------
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({ error: err.message });
});

// ---------- Start Server ----------
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));