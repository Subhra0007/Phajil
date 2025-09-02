// routes/order.js

import express from "express";
import { auth } from "../middlewares/auth.js";      // ✅ auth middleware
import { isAdmin } from "../middlewares/isAdmin.js"; // ✅ admin check

// Orders
import {
  getOrders,
  getOrder,
  updateOrder,
} from "../controllers/adminOrder.js";

const router = express.Router();

// Orders
router.get("/orders", auth, isAdmin, getOrders);
router.get("/orders/:id", auth, isAdmin, getOrder);
router.put("/orders/:id", auth, isAdmin, updateOrder);

// ========================== Error Handler ========================== //
router.use((err, req, res, next) => {
  console.error("Route error:", err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

export default router;