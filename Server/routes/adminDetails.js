//routes/adminDetails.js
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
import {
  getCategories,
  getCategory,   // ✅ Added
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/adminCategory.js";
import { getInventoryStats } from "../controllers/adminInventory.js";
import {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/adminBlog.js";
import { getDashboardStats } from "../controllers/adminDashboard.js";
import { getOrders, getOrder, updateOrder, deleteOrder } from "../controllers/adminOrder.js";
import { getUsers, getUser, updateUser, deleteUser } from "../controllers/adminUser.js";

const router = express.Router();

// Dashboard
router.get("/dashboard", auth, isAdmin, getDashboardStats);

// Products
router.get("/products", auth, isAdmin, getProducts);
router.get("/products/:id", auth, isAdmin, getProduct);
router.post("/products", auth, isAdmin, createProduct);
router.put("/products/:id", auth, isAdmin, updateProduct);
router.delete("/products/:id", auth, isAdmin, deleteProduct);

// Categories
router.get("/categories", auth, isAdmin, getCategories);
router.get("/categories/:id", auth, isAdmin, getCategory); // ✅ Added
router.post("/categories", auth, isAdmin, createCategory);
router.put("/categories/:id", auth, isAdmin, updateCategory);
router.delete("/categories/:id", auth, isAdmin, deleteCategory);

// Inventory
router.get("/inventory", auth, isAdmin, getInventoryStats);

// Blogs
router.get("/blogs", auth, isAdmin, getBlogs);
router.get("/blogs/:id", auth, isAdmin, getBlog);
router.post("/blogs", auth, isAdmin, createBlog);
router.put("/blogs/:id", auth, isAdmin, updateBlog);
router.delete("/blogs/:id", auth, isAdmin, deleteBlog);

// Orders
router.get("/orders", auth, isAdmin, getOrders);
router.get("/orders/:id", auth, isAdmin, getOrder);
router.put("/orders/:id", auth, isAdmin, updateOrder);
router.delete("/orders/:id", auth, isAdmin, deleteOrder);

// Users
router.get("/users", auth, isAdmin, getUsers);
router.get("/users/:id", auth, isAdmin, getUser);
router.put("/users/:id", auth, isAdmin, updateUser);
router.delete("/users/:id", auth, isAdmin, deleteUser);

// Error Handler
router.use((err, req, res, next) => {
  console.error("Route error:", err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

export default router;
