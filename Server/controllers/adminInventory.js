// controllers/adminInventory.js
import Product from "../models/Product.js";

export const getInventoryStats = async (req, res) => {
  try {
    const products = await Product.find();
    const totalProducts = products.length;
    let outOfStock = 0;
    let lowStock = 0; // < 10
    let inStock = 0;
    products.forEach((p) => {
      const stock = p.stock;
      if (stock === 0) outOfStock++;
      else if (stock < 10) lowStock++;
      else inStock++;
    });
    const outOfStockList = products
      .filter((p) => p.stock === 0)
      .map((p) => ({ _id: p._id, title: p.title }));
    const lowStockList = products
      .filter((p) => p.stock > 0 && p.stock < 4)
      .map((p) => ({ _id: p._id, title: p.title, stock: p.stock }));
    res.json({
      success: true,
      data: { totalProducts, outOfStock, lowStock, inStock, outOfStockList, lowStockList },
    });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};