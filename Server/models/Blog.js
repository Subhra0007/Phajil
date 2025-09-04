// models/Blog.js
import mongoose from "mongoose";
import slugify from "slugify";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String },
    content: { type: String, required: true },
    published: { type: Boolean, default: false },
    slug: { type: String, unique: true },  // 👈 add slug
  },
  { timestamps: true }
);

// Auto-generate slug before save
blogSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
