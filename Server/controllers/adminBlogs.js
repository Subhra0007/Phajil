// controllers/adminBlogs.js
import Blog from "../models/Blog.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";

export const createBlog = async (req, res) => {
  try {
    const { title, slug, content, published } = req.body;
    if (!title || !slug || !content) {
      return res.status(400).json({ success: false, message: "title, slug, content are required" });
    }
    let coverImage = undefined;
    if (req.files?.cover) {
      const up = await uploadImageToCloudinary(req.files.cover, "phajil/blogs");
      coverImage = { url: up.secure_url, public_id: up.public_id };
    }
    const doc = await Blog.create({
      title,
      slug: slug.toLowerCase(),
      content,
      published: !!published,
      coverImage,
      author: req.user.id
    });
    res.status(201).json({ success: true, data: doc });
  } catch (e) {
    if (e.code === 11000) return res.status(400).json({ success: false, message: "Slug already exists" });
    res.status(500).json({ success: false, message: e.message });
  }
};

export const listBlogs = async (req, res) => {
  try {
    const { q } = req.query;
    const filter = q ? { title: { $regex: q, $options: "i" } } : {};
    const docs = await Blog.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: docs });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const getBlog = async (req, res) => {
  try {
    const doc = await Blog.findById(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: doc });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { title, slug, content, published } = req.body;
    const update = {};
    if (title != null) update.title = title;
    if (slug != null) update.slug = slug.toLowerCase();
    if (content != null) update.content = content;
    if (published != null) update.published = !!published;
    if (req.files?.cover) {
      const up = await uploadImageToCloudinary(req.files.cover, "phajil/blogs");
      update.coverImage = { url: up.secure_url, public_id: up.public_id };
    }
    const doc = await Blog.findByIdAndUpdate(req.params.id, { $set: update }, { new: true });
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: doc });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const doc = await Blog.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};
