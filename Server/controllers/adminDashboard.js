// controllers/adminDashboard.js
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments({ accountType: "user" });
    const totalRevenue = await Order.aggregate([
      { $match: { status: { $ne: "cancelled" } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const revenue = totalRevenue[0]?.total || 0;

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "firstName lastName")
      .select(" _id totalAmount status paymentStatus createdAt");

    const popularProducts = await Order.aggregate([
      { $unwind: "$items" },
      { $group: { _id: "$items.productId", totalSales: { $sum: "$items.quantity" }, revenue: { $sum: { $multiply: ["$items.quantity", "$items.price"] } } } },
      { $sort: { totalSales: -1 } },
      { $limit: 5 },
      { $lookup: { from: "products", localField: "_id", foreignField: "_id", as: "product" } },
      { $unwind: "$product" },
      { $project: { _id: 0, title: "$product.title", category: "$product.category", totalSales: 1, revenue: 1 } },
    ]);

    res.json({
      success: true,
      data: { totalProducts, totalOrders, totalUsers, revenue, recentOrders, popularProducts },
    });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};