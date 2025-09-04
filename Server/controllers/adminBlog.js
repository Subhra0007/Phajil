// controllers/adminBlog.js
import Blog from "../models/Blog.js";
import cloudinary from "cloudinary";

// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const docs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, data: docs });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Get single blog
export const getBlog = async (req, res) => {
  try {
    const doc = await Blog.findById(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: doc });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Create blog
export const createBlog = async (req, res) => {
  try {
    let image = "";
    if (req.files && req.files.image) {
      const uploaded = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
        folder: "blogs",
      });
      image = uploaded.secure_url;
    }
    const doc = new Blog({
      title: req.body.title,
      image,
      content: req.body.content,
      published: Boolean(req.body.published),
    });
    await doc.save();
    res.status(201).json({ success: true, data: doc });
  } catch (e) {
    console.error("ERROR creating blog:", e.message); // 👈 log error
    res.status(400).json({ success: false, message: e.message });
  }
};


// Update blog
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Not found" });
    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    blog.published = req.body.published !== undefined ? req.body.published === "true" : blog.published;
    if (req.files && req.files.image) {
      const uploaded = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
        folder: "blogs",
      });
      blog.image = uploaded.secure_url;
    }
    await blog.save();
    res.json({ success: true, data: blog });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const doc = await Blog.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};