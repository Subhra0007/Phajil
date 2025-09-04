// pages/AddBlog.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function AddBlog() {
  const [form, setForm] = useState({ title: "", content: "", published: false, image: null });
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleContentChange = (value) => {
    setForm({ ...form, content: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("published", form.published);
    if (image) formData.append("image", image);

    try {
      await API.post("/admin/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/blogs");
    } catch (err) {
      setError("Failed to add blog");
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold", "italic", "underline", "blockquote",
    "list", "indent",  
    "align",          
    "link", "image",
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add Blog</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input name="title" value={form.title} onChange={handleChange} className="w-full p-2 border rounded-md" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Image</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} className="w-full p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Content</label>
          <ReactQuill
            value={form.content}
            onChange={handleContentChange}
            modules={modules}
            formats={formats}
            className="w-full border rounded-md"
          />
        </div>
        <div>
          <label className="inline-flex items-center">
            <input type="checkbox" name="published" checked={form.published} onChange={handleChange} className="mr-2" />
            Published
          </label>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Save Blog
        </button>
      </form>
    </div>
  );
}