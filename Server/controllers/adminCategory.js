// controllers/adminCategory.js
import Category from "../models/Category.js";
import Product from "../models/Product.js";

// Get all categories with total stock
export const getCategories = async (req, res) => {
  try {
    const docs = await Category.find().sort({ name: 1 });

    const data = await Promise.all(
      docs.map(async (cat) => {
        const totalStock = await Product.aggregate([
          { $match: { category: { $regex: new RegExp(`^${cat.name}$`, 'i') } } }, // Case-insensitive match
          { $unwind: "$variants" },
          { $unwind: "$variants.sizes" },
          {
            $group: {
              _id: null,
              total: { $sum: "$variants.sizes.stock" },
            },
          },
        ]).then(result => {
          console.log(`Aggregation for ${cat.name}:`, result); // Debug aggregation result
          return result;
        });

        return {
          ...cat.toObject(),
          totalStock: totalStock[0]?.total || 0,
        };
      })
    );

    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Get single category with stock
export const getCategory = async (req, res) => {
  try {
    const cat = await Category.findById(req.params.id);
    if (!cat) return res.status(404).json({ success: false, message: "Not found" });

    const totalStock = await Product.aggregate([
      { $match: { category: { $regex: new RegExp(`^${cat.name}$`, 'i') } } }, // Case-insensitive match
      { $unwind: "$variants" },
      { $unwind: "$variants.sizes" },
      {
        $group: {
          _id: null,
          total: { $sum: "$variants.sizes.stock" },
        },
      },
    ]).then(result => {
      console.log(`Aggregation for ${cat.name}:`, result); // Debug aggregation result
      return result;
    });

    const data = {
      ...cat.toObject(),
      totalStock: totalStock[0]?.total || 0,
    };

    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Create category (only name)
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, message: "Name is required" });
    const doc = new Category({ name });
    await doc.save();
    res.status(201).json({ success: true, data: doc });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

// Update category (only name)
export const updateCategory = async (req, res) => {
  try {
    const cat = await Category.findById(req.params.id);
    if (!cat) return res.status(404).json({ success: false, message: "Not found" });

    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, message: "Name is required" });
    cat.name = name;
    await cat.save();

    res.json({ success: true, data: cat });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    const doc = await Category.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};