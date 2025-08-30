// controllers/adminProducts.js
import Product from "../models/Product.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";

// Create product
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, sizes, stock } = req.body;
    if (!title || price == null) {
      return res.status(400).json({ success: false, message: "Title and price are required" });
    }
    const sizeArr = typeof sizes === "string" ? sizes.split(",").map(s=>s.trim()).filter(Boolean) : (sizes || []);
    const images = [];
    if (req.files && req.files.images) {
      const arr = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
      for (const file of arr) {
        const up = await uploadImageToCloudinary(file, "phajil/products");
        images.push({ url: up.secure_url, public_id: up.public_id });
      }
    }
    const doc = await Product.create({
      title,
      description,
      price: Number(price),
      category,
      sizes: sizeArr,
      stock: Number(stock || 0),
      images,
      createdBy: req.user.id
    });
    res.status(201).json({ success: true, data: doc });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// List products
export const listProducts = async (req, res) => {
  try {
    const { q } = req.query;
    const filter = q ? { title: { $regex: q, $options: "i" } } : {};
    const docs = await Product.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: docs });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Get one
export const getProduct = async (req, res) => {
  try {
    const doc = await Product.findById(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: doc });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { title, description, price, category, sizes, stock, isActive } = req.body;

    const setObj = {};
    if (title != null) setObj.title = title;
    if (description != null) setObj.description = description;
    if (price != null) setObj.price = Number(price);
    if (category != null) setObj.category = category;
    if (sizes != null) setObj.sizes = typeof sizes === "string" ? sizes.split(",").map(s=>s.trim()).filter(Boolean) : sizes;
    if (stock != null) setObj.stock = Number(stock);
    if (isActive != null) setObj.isActive = !!isActive;

    const updateDoc = {};
    if (Object.keys(setObj).length) updateDoc.$set = setObj;

    // handle new images to push
    if (req.files && req.files.images) {
      const arr = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
      const uploaded = [];
      for (const file of arr) {
        const up = await uploadImageToCloudinary(file, "phajil/products");
        uploaded.push({ url: up.secure_url, public_id: up.public_id });
      }
      updateDoc.$push = { images: { $each: uploaded } };
    }

    const doc = await Product.findByIdAndUpdate(req.params.id, updateDoc, { new: true });
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: doc });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const doc = await Product.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Update stock only
export const updateStock = async (req, res) => {
  try {
    const { stock } = req.body;
    const doc = await Product.findByIdAndUpdate(req.params.id, { $set: { stock: Number(stock) } }, { new: true });
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: doc });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};
