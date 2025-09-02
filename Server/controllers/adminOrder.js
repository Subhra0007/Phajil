//controllers/adminOrder.js
import Order from "../models/Order.js";

// ✅ Get all orders
export const getOrders = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const docs = await Order.find(filter)
      .sort({ createdAt: -1 })
      .populate("user", "firstName lastName email contactNumber")
      .populate("items.productId", "title price");
    res.json({ success: true, data: docs });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// ✅ Get single order
export const getOrder = async (req, res) => {
  try {
    const doc = await Order.findById(req.params.id)
      .populate("user", "firstName lastName email contactNumber")
      .populate("items.productId", "title price");
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: doc });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// ✅ Update order
export const updateOrder = async (req, res) => {
  try {
    const doc = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: doc });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

// ✅ Delete order
export const deleteOrder = async (req, res) => {
  try {
    const doc = await Order.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};
