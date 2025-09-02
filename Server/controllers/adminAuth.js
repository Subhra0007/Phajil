//controllers/adminAuth.js

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Admin credentials required",
      });
    }

    const token = jwt.sign(
      { email, accountType: "admin" }, // <-- role stored in token
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      success: true,
      token,
      user: { email, accountType: "admin" },
      message: "Admin login success",
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
