//pages/EditProduct.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";

export default function EditProduct() {
  const { id } = useParams();
  const [form, setForm] = useState({
    type: "",
    images: "",
    price: "",
    originalPrice: "",
    discountedPercentage: "",
    stock: "",
    soldQuantity: "",
    category: "",
    badge: false,
    isAvailable: true,
    offer: false,
    description: "",
    tags: "",
    title: "",
    sizes: [],
    colors: [],
  });
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/admin/products/${id}`);
      const p = res.data.data;
      setForm({
        type: p.type || "",
        images: p.images.join(",") || "",
        price: p.price || "",
        originalPrice: p.originalPrice || "",
        discountedPercentage: p.discountedPercentage || "",
        stock: p.stock || "",
        soldQuantity: p.soldQuantity || "",
        category: p.category || "",
        badge: p.badge || false,
        isAvailable: p.isAvailable || true,
        offer: p.offer || false,
        description: p.description || "",
        tags: p.tags ? p.tags.join(",") : "",
        title: p.title || "",
        sizes: p.sizes || [],
        colors: p.colors || [],
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load product");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && (name === "sizes" || name === "colors")) {
      const newValue = checked ? [...form[name], value] : form[name].filter(item => item !== value);
      setForm({ ...form, [name]: newValue });
    } else {
      setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, Array.isArray(form[key]) ? form[key].join(",") : form[key]));
    images.forEach((img) => formData.append("images", img));
    try {
      await API.put(`/admin/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/products");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update product");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
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
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            rows="4"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Price (Current)</label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Original Price</label>
          <input
            name="originalPrice"
            type="number"
            value={form.originalPrice}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Discounted Percentage</label>
          <input
            name="discountedPercentage"
            type="number"
            value={form.discountedPercentage}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          >
            <option value="">Select Category</option>
            <option value="Unisex">Unisex</option>
            <option value="Feluda">Feluda</option>
            <option value="Nostalgic Kolkata">Nostalgic Kolkata</option>
            <option value="Women">Women</option>
            <option value="New Arrival">New Arrival</option>
            <option value="Trending">Trending</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Sizes</label>
          {["S", "M", "L", "XL", "XXL", "XXXL"].map(size => (
            <label key={size} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                name="sizes"
                value={size}
                checked={form.sizes.includes(size)}
                onChange={handleChange}
                className="mr-2"
              />
              {size}
            </label>
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium">Colors</label>
          {["Black", "Bottle Green", "Navy Blue", "Red", "Yellow", "Grey", "Maroon", "Pink", "Lavender"].map(color => (
            <label key={color} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                name="colors"
                value={color}
                checked={form.colors.includes(color)}
                onChange={handleChange}
                className="mr-2"
              />
              {color}
            </label>
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium">Stock</label>
          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Sold Quantity</label>
          <input
            name="soldQuantity"
            type="number"
            value={form.soldQuantity}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            <input
              type="checkbox"
              name="badge"
              checked={form.badge}
              onChange={handleChange}
              className="mr-2"
            />
            Badge
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium">
            <input
              type="checkbox"
              name="isAvailable"
              checked={form.isAvailable}
              onChange={handleChange}
              className="mr-2"
            />
            Available
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium">
            <input
              type="checkbox"
              name="offer"
              checked={form.offer}
              onChange={handleChange}
              className="mr-2"
            />
            On Sale
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium">Tags (comma-separated)</label>
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="e.g., tag1,tag2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Add New Images</label>
          <input
            type="file"
            multiple
            onChange={(e) => setImages([...e.target.files])}
            className="w-full p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}