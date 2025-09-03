// Server/models/Product.js
import mongoose from "mongoose";

const sizeStockSchema = new mongoose.Schema(
  {
    size: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
  },
  { _id: false }
);

const variantSchema = new mongoose.Schema(
  {
    color: { type: String, required: true },
    images: { type: [String], required: true },
    sizes: [sizeStockSchema],
    isDefault: { type: Boolean, default: false }, // ✅ New
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    discountedPercentage: { type: Number },
    soldQuantity: { type: Number, default: 0 },
    category: { type: String, required: true },
    badge: { type: String },
    isAvailable: { type: Boolean, default: true },
    offer: { type: String },
    tags: [{ type: String }],
    images: { type: [String], required: true },
    variants: [variantSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
