// routes/blog.js

import express from "express";
import { auth } from "../middlewares/auth.js";      // ✅ auth middleware
import { isAdmin } from "../middlewares/isAdmin.js"; // ✅ admin check

// Blogs
import {
  getBlogs,   // ✅ renamed to match routes
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/adminBlog.js";


const router = express.Router();

// Blogs
router.get("/blogs", auth, isAdmin, getBlogs);
router.get("/blogs/:id", auth, isAdmin, getBlog);
router.post("/blogs", auth, isAdmin, createBlog);
router.put("/blogs/:id", auth, isAdmin, updateBlog);
router.delete("/blogs/:id", auth, isAdmin, deleteBlog);

// ========================== Error Handler ========================== //
router.use((err, req, res, next) => {
  console.error("Route error:", err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

export default router;