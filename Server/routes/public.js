// routes/public.js
import express from "express";
import Blog from "../models/Blog.js";
import Product from "../models/Product.js";

const router = express.Router();

// ---------------------- Products ----------------------

// ✅ Get all products (optional ?category=)
router.get("/products", async (req, res) => {
  try {
    const { category } = req.query;

    const filter = { isAvailable: true };
    if (category) filter.category = { $regex: new RegExp(`^${category}$`, "i") };

    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ Get products by category (/products/category/:category)
router.get("/products/category/:category", async (req, res) => {
  try {
    const docs = await Product.find({
      category: { $regex: new RegExp(`^${req.params.category}$`, "i") }, // Case-insensitive regex
      isAvailable: true,
    }).sort({ createdAt: -1 });

    res.json({ success: true, data: docs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ Get single product by ID
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product || !product.isAvailable) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * ======================
 *   PUBLIC BLOG ROUTES
 * ======================
 */

// 👉 List published blogs
router.get("/blogs", async (req, res) => {
  try {
    const docs = await Blog.find({ published: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: docs });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

// 👉 Single blog by ID
router.get("/blogs/:id", async (req, res) => {
  try {
    const doc = await Blog.findOne({
      _id: req.params.id,
      published: true,
    });

    if (!doc) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.json({ success: true, data: doc });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

export default router;