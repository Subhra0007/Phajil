//controllers/adminBlog.js
import Blog from "../models/Blog.js";

// ✅ Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const { q } = req.query;
    const filter = q ? { title: { $regex: q, $options: "i" } } : {};
    const docs = await Blog.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: docs });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// ✅ Get single blog
export const getBlog = async (req, res) => {
  try {
    const doc = await Blog.findById(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: doc });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// ✅ Create blog
export const createBlog = async (req, res) => {
  try {
    const doc = new Blog(req.body);
    await doc.save();
    res.status(201).json({ success: true, data: doc });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

// ✅ Update blog
export const updateBlog = async (req, res) => {
  try {
    const doc = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: doc });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

// ✅ Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const doc = await Blog.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};
