//pages/EditBlog
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";

export default function EditBlog() {
  const { id } = useParams();
  const [form, setForm] = useState({ title: "", slug: "", content: "", published: false });
  const [cover, setCover] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const res = await API.get(`/admin/blogs/${id}`);
      const b = res.data.data;
      setForm({
        title: b.title,
        slug: b.slug,
        content: b.content,
        published: b.published,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load blog");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    if (cover) formData.append("cover", cover);
    try {
      await API.put(`/admin/blogs/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/blogs");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update blog");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Blog</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            rows="6"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            <input
              type="checkbox"
              name="published"
              checked={form.published}
              onChange={handleChange}
              className="mr-2"
            />
            Published
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium">Cover Image</label>
          <input
            type="file"
            onChange={(e) => setCover(e.target.files[0])}
            className="w-full p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}