// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  images: { type: Array, required: true },
  price: { type: Number, required: true }, // Current price after discount
  originalPrice: { type: Number }, // Original price for sale items
  discountedPercentage: { type: Number, required: true, default: 10 },
  stock: { type: Number, required: true, default: 0 },
  soldQuantity: { type: Number, default: 0 },
  category: { type: String, required: true },
  badge: { type: Boolean },
  isAvailable: { type: Boolean, default: true  },
  offer: { type: Boolean }, // To indicate if it's on sale
  description: { type: String, required: true },
  tags: { type: Array },
  title: { type: String, required: true },
  sizes: { type: [String] }, // Array of sizes (e.g., S, M, L)
  colors: { type: [String] }, // Array of colors (e.g., Black, Red)
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", productSchema);