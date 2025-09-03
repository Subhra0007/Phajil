// Server/controllers/adminProduct.js
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

// Create Product
export const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      originalPrice,
      discountedPercentage,
      category,
      badge,
      isAvailable,
      offer,
      soldQuantity,
    } = req.body;

    let variantsData = JSON.parse(req.body.variants || "[]");
    let variants = [];

    for (let i = 0; i < variantsData.length; i++) {
      const filesField = req.files?.[`variantImages${i}`];
      const files = filesField
        ? Array.isArray(filesField)
          ? filesField
          : [filesField]
        : [];

      const uploadedImages = [];
      for (const file of files) {
        if (file?.tempFilePath) {
          const uploaded = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "products",
          });
          uploadedImages.push(uploaded.secure_url);
        }
      }

      variants.push({
        color: variantsData[i].color,
        images: uploadedImages,
        sizes: (variantsData[i].sizes || []).map((s) => ({
          size: s.size,
          stock: Number(s.stock || 0),
        })),
        isDefault: !!variantsData[i].isDefault,
      });
    }

    // ensure only one default
    if (!variants.some((v) => v.isDefault) && variants.length > 0) {
      variants[0].isDefault = true;
    } else {
      let foundDefault = false;
      variants = variants.map((v) => {
        if (v.isDefault && !foundDefault) {
          foundDefault = true;
          return { ...v, isDefault: true };
        }
        return { ...v, isDefault: false };
      });
    }

    const productData = {
      title,
      description,
      price: Number(price),
      originalPrice: originalPrice !== undefined ? Number(originalPrice) : undefined,
      discountedPercentage:
        discountedPercentage !== undefined ? Number(discountedPercentage) : undefined,
      category: (category || "").toLowerCase(),
      badge,
      soldQuantity: soldQuantity !== undefined ? Number(soldQuantity) : 0,
      isAvailable: String(isAvailable) === "true" || isAvailable === true,
      offer: String(offer) === "true" || offer === true,
      variants,
    };

    const doc = new Product(productData);
    await doc.save();

    res.status(201).json({ success: true, data: doc });
  } catch (e) {
    console.error("Error in createProduct:", e);
    res.status(400).json({ success: false, message: e.message });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    const {
      title,
      description,
      price,
      originalPrice,
      discountedPercentage,
      category,
      badge,
      isAvailable,
      offer,
      soldQuantity,
    } = req.body;

    let variantsData = JSON.parse(req.body.variants || "[]");
    let variants = [];

    for (let i = 0; i < variantsData.length; i++) {
      const filesField = req.files?.[`variantImages${i}`];
      const files = filesField
        ? Array.isArray(filesField)
          ? filesField
          : [filesField]
        : [];

      let uploadedImages = Array.isArray(variantsData[i].existingImages)
        ? [...variantsData[i].existingImages]
        : [];

      for (const file of files) {
        if (file?.tempFilePath) {
          const uploaded = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "products",
          });
          uploadedImages.push(uploaded.secure_url);
        }
      }

      variants.push({
        color: variantsData[i].color,
        images: uploadedImages,
        sizes: (variantsData[i].sizes || []).map((s) => ({
          size: s.size,
          stock: Number(s.stock || 0),
        })),
        isDefault: !!variantsData[i].isDefault,
      });
    }

    // ensure only one default
    if (!variants.some((v) => v.isDefault) && variants.length > 0) {
      variants[0].isDefault = true;
    } else {
      let foundDefault = false;
      variants = variants.map((v) => {
        if (v.isDefault && !foundDefault) {
          foundDefault = true;
          return { ...v, isDefault: true };
        }
        return { ...v, isDefault: false };
      });
    }

    product.title = title ?? product.title;
    product.description = description ?? product.description;
    product.price = price !== undefined ? Number(price) : product.price;
    product.originalPrice =
      originalPrice !== undefined ? Number(originalPrice) : product.originalPrice;
    product.discountedPercentage =
      discountedPercentage !== undefined
        ? Number(discountedPercentage)
        : product.discountedPercentage;
    product.category = category ? category.toLowerCase() : product.category;
    product.badge = badge ?? product.badge;
    product.soldQuantity =
      soldQuantity !== undefined ? Number(soldQuantity) : product.soldQuantity;
    product.isAvailable =
      isAvailable !== undefined
        ? String(isAvailable) === "true" || isAvailable === true
        : product.isAvailable;
    product.offer =
      offer !== undefined
        ? String(offer) === "true" || offer === true
        : product.offer;

    product.variants = variants;

    await product.save();
    res.json({ success: true, data: product });
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
};
