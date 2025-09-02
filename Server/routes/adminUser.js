// routes/adminUser.js
import express from "express";
import { auth } from "../middlewares/auth.js";      // ✅ auth middleware
import { isAdmin } from "../middlewares/isAdmin.js"; // ✅ admin check

// Users
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/adminUser.js";

// Auth / Promote
// ⚠ Make sure the file is named **auth.js** (lowercase) OR update below if it’s Auth.js


const router = express.Router();

// ========================== Routes ========================== //

// Secure bootstrap admin promotion
// router.post("/bootstrap/promote", auth, isAdmin, promoteToAdmin);

// Users
router.get("/users", auth, isAdmin, getUsers);
router.get("/users/:id", auth, isAdmin, getUser);
router.put("/users/:id", auth, isAdmin, updateUser);
router.delete("/users/:id", auth, isAdmin, deleteUser);

// ========================== Error Handler ========================== //
router.use((err, req, res, next) => {
  console.error("Route error:", err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

export default router;
