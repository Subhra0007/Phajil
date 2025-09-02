// routes/products.js
import express from "express";
import { auth } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/adminProduct.js";

const router = express.Router();

// Products
router.get("/products", auth, isAdmin, getProducts);
router.get("/products/:id", auth, isAdmin, getProduct);
router.post("/products", auth, isAdmin, createProduct);
router.put("/products/:id", auth, isAdmin, updateProduct);
router.delete("/products/:id", auth, isAdmin, deleteProduct);

// Error Handler
router.use((err, req, res, next) => {
  console.error("Route error:", err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

export default router;