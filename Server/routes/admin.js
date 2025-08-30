// routes/admin.js
import express from "express";
import { auth } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { createProduct, listProducts, getProduct, updateProduct, deleteProduct, updateStock } from "../controllers/adminProducts.js";
import { createBlog, listBlogs, getBlog, updateBlog, deleteBlog } from "../controllers/adminBlogs.js";

const router = express.Router();

// ✅ Product endpoints
router.post("/products", auth, isAdmin, createProduct);
router.get("/products", auth, isAdmin, listProducts);
router.get("/products/:id", auth, isAdmin, getProduct);
router.put("/products/:id", auth, isAdmin, updateProduct);
router.delete("/products/:id", auth, isAdmin, deleteProduct);
router.patch("/products/:id/stock", auth, isAdmin, updateStock);

// ✅ Blog endpoints
router.post("/blogs", auth, isAdmin, createBlog);
router.get("/blogs", auth, isAdmin, listBlogs);
router.get("/blogs/:id", auth, isAdmin, getBlog);
router.put("/blogs/:id", auth, isAdmin, updateBlog);
router.delete("/blogs/:id", auth, isAdmin, deleteBlog);

// ✅ Bootstrap Admin Setup
router.post("/bootstrap/promote", async (req, res) => {
  try {
    const token = req.headers["x-setup-token"];
    if (!token || token !== process.env.ADMIN_SETUP_TOKEN) {
      return res.status(401).json({ success: false, message: "Invalid setup token" });
    }
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "email is required" });
    const mod = (await import("../models/User.js")).default;
    const updated = await mod.findOneAndUpdate({ email }, { accountType: "Admin" }, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, data: { email: updated.email, accountType: updated.accountType } });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

export default router;
