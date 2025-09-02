import Product from "../models/Product.js";
import cloudinary from "cloudinary";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const { q } = req.query;
    const filter = q ? { title: { $regex: q, $options: "i" } } : {};
    const docs = await Product.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: docs });
  } catch (e) {
    console.error("Error in getProducts:", e);
    res.status(500).json({ success: false, message: e.message });
  }
};

// Get single product
export const getProduct = async (req, res) => {
  try {
    const doc = await Product.findById(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: doc });
  } catch (e) {
    console.error("Error in getProduct:", e);
    res.status(500).json({ success: false, message: e.message });
  }
};

// ----------------- Create Product -----------------
export const createProduct = async (req, res) => {
  try {
    let images = [];

    // Handle images upload
    if (req.files && req.files.images) {
      const files = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];

      for (let file of files) {
        const uploaded = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "products",
        });
        images.push(uploaded.secure_url);
      }
    }

    const productData = {
      ...req.body,
      category: req.body.category.toLowerCase(), // Standardize to lowercase
      sizes: req.body.sizes ? req.body.sizes.split(",") : [],
      colors: req.body.colors ? req.body.colors.split(",") : [],
      images,
    };

    const doc = new Product(productData);
    await doc.save();

    res.status(201).json({ success: true, data: doc });
  } catch (e) {
    console.error("Error in createProduct:", e);
    res.status(400).json({ success: false, message: e.message });
  }
};

// ----------------- Update Product -----------------
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    let images = product.images;

    // If new images uploaded
    if (req.files && req.files.images) {
      const files = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];

      for (let file of files) {
        const uploaded = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "products",
        });
        images.push(uploaded.secure_url);
      }
    }

    product.title = req.body.title || product.title;
    product.description = req.body.description || product.description;
    product.originalPrice = req.body.originalPrice || product.originalPrice;
    product.discountedPercentage = req.body.discountedPercentage || product.discountedPercentage;
    product.category = req.body.category ? req.body.category.toLowerCase() : product.category; // Standardize to lowercase
    product.stock = req.body.stock || product.stock;
    product.soldQuantity = req.body.soldQuantity || product.soldQuantity;
    product.sizes = req.body.sizes ? req.body.sizes.split(",") : product.sizes;
    product.colors = req.body.colors ? req.body.colors.split(",") : product.colors;
    product.images = images;
    product.isAvailable = req.body.isAvailable !== undefined ? req.body.isAvailable : product.isAvailable;

    await product.save();

    res.status(200).json({ success: true, data: product });
  } catch (e) {
    console.error("Error in updateProduct:", e);
    res.status(400).json({ success: false, message: e.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const doc = await Product.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true });
  } catch (e) {
    console.error("Error in deleteProduct:", e);
    res.status(500).json({ success: false, message: e.message });
  }
}