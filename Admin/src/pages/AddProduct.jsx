// Admin/pages/AddProduct.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    originalPrice: "",
    discountedPercentage: "",
    category: "",
    badge: "",
    soldQuantity: "",
    isAvailable: true,
    offer: false,
  });

  const [variants, setVariants] = useState([]); // [{ color, images: File[], sizes: [{size, stock}], isDefault: boolean }]
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const sizesList = ["S", "M", "L", "XL", "XXL", "XXXL"];
  const colorsList = [
    "Black",
    "Bottle Green",
    "Navy Blue",
    "Red",
    "Yellow",
    "Grey",
    "Maroon",
    "Pink",
    "Lavender",
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/admin/categories");
      setCategories(res.data.data || []);
    } catch (err) {
      setError("Failed to load categories");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  // ---- Variants (dynamic color & sizes) ----
  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      { color: "", images: [], sizes: [{ size: "", stock: 0 }], isDefault: false },
    ]);
  };

  const removeVariant = (vIndex) => {
    setVariants((prev) => prev.filter((_, i) => i !== vIndex));
  };

  const handleVariantColor = (vIndex, color) => {
    setVariants((prev) => {
      const copy = [...prev];
      copy[vIndex].color = color;
      return copy;
    });
  };

  const handleVariantImages = (vIndex, e) => {
    const files = Array.from(e.target.files || []);
    setVariants((prev) => {
      const copy = [...prev];
      copy[vIndex].images = files;
      return copy;
    });
  };

  const addSizeRow = (vIndex) => {
    setVariants((prev) => {
      const copy = [...prev];
      copy[vIndex].sizes.push({ size: "", stock: 0 });
      return copy;
    });
  };

  const removeSizeRow = (vIndex, sIndex) => {
    setVariants((prev) => {
      const copy = [...prev];
      copy[vIndex].sizes = copy[vIndex].sizes.filter((_, i) => i !== sIndex);
      if (copy[vIndex].sizes.length === 0) {
        copy[vIndex].sizes.push({ size: "", stock: 0 });
      }
      return copy;
    });
  };

  const handleSizeChange = (vIndex, sIndex, field, value) => {
    setVariants((prev) => {
      const copy = [...prev];
      copy[vIndex].sizes[sIndex][field] =
        field === "stock" ? Number(value || 0) : value;
      return copy;
    });
  };

  const handleSetDefaultVariant = (index) => {
    const newVariants = variants.map((v, i) => ({
      ...v,
      isDefault: i === index, // Only one default variant
    }));
    setVariants(newVariants);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Basic validation for variants
      for (const v of variants) {
        if (!v.color.trim()) throw new Error("Please select/enter color for all variants.");
        if (!v.sizes.length) throw new Error("Each variant needs at least one size row.");
        for (const s of v.sizes) {
          if (!s.size) throw new Error("Please choose a size for all rows.");
          if (Number.isNaN(Number(s.stock))) throw new Error("Stock must be a number.");
        }
      }

      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v ?? ""));

      formData.append(
        "variants",
        JSON.stringify(
          variants.map((v) => ({
            color: v.color,
            sizes: v.sizes.map((s) => ({ size: s.size, stock: Number(s.stock || 0) })),
            isDefault: v.isDefault,
          }))
        )
      );

      variants.forEach((v, i) => {
        v.images.forEach((img) => formData.append(`variantImages${i}`, img));
      });

      await API.post("/admin/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/products");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to add product";
      setError(msg);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Information */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            rows="4"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
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
            className="w-full p-2 border rounded-md"
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
            className="w-full p-2 border rounded-md"
            min="0"
          />
        </div>

        {/* Category + Add Category Button */}
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <label className="block text-sm font-medium">Category</label>
            <select
              name="category"
              value={form.category || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={() => navigate("/add-category")}
            className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700"
          >
            + Add Category
          </button>
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
          <label className="block text-sm font-medium">Badge</label>
          <input
            name="badge"
            value={form.badge}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="isAvailable"
              checked={!!form.isAvailable}
              onChange={handleChange}
              className="mr-2"
            />
            Available
          </label>
        </div>

        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="offer"
              checked={!!form.offer}
              onChange={handleChange}
              className="mr-2"
            />
            On Offer
          </label>
        </div>

        {/* Variants */}
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium">Variants</label>
            <button
              type="button"
              onClick={addVariant}
              className="bg-gray-200 px-3 py-1 rounded-md"
            >
              + Add Variant (Color)
            </button>
          </div>

          {variants.map((v, vIndex) => (
            <div key={vIndex} className="border rounded-md p-3 mt-3">
              <div className="flex items-center gap-2">
                {/* Color */}
                <div className="flex-1">
                  <label className="block text-xs font-medium">Color</label>
                  <input
                    list={`color-list-${vIndex}`}
                    value={v.color}
                    onChange={(e) => handleVariantColor(vIndex, e.target.value)}
                    className="w-full p-2 border rounded-md"
                    placeholder="Type or pick a color"
                    required
                  />
                  <datalist id={`color-list-${vIndex}`}>
                    {colorsList.map((c) => (
                      <option value={c} key={c} />
                    ))}
                  </datalist>
                </div>

                {/* Images */}
                <div className="flex-1">
                  <label className="block text-xs font-medium">Images</label>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleVariantImages(vIndex, e)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeVariant(vIndex)}
                  className="text-red-600"
                >
                  Remove Variant
                </button>

                {/* Set Default Button */}
                <button
                  type="button"
                  onClick={() => handleSetDefaultVariant(vIndex)}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    v.isDefault ? "bg-green-500 text-white" : "bg-gray-200"
                  }`}
                >
                  {v.isDefault ? "Default" : "Set Default"}
                </button>
              </div>

              {/* Sizes */}
              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Sizes & Stock</span>
                  <button
                    type="button"
                    onClick={() => addSizeRow(vIndex)}
                    className="text-sm bg-gray-200 px-2 py-1 rounded-md"
                  >
                    + Add Size
                  </button>
                </div>

                {v.sizes.map((s, sIndex) => (
                  <div key={sIndex} className="flex gap-2 mt-2">
                    <select
                      value={s.size}
                      onChange={(e) =>
                        handleSizeChange(vIndex, sIndex, "size", e.target.value)
                      }
                      className="w-1/3 p-2 border rounded-md"
                      required
                    >
                      <option value="">Select size</option>
                      {sizesList.map((sz) => (
                        <option key={sz} value={sz}>
                          {sz}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={s.stock}
                      onChange={(e) =>
                        handleSizeChange(
                          vIndex,
                          sIndex,
                          "stock",
                          e.target.value
                        )
                      }
                      className="w-1/3 p-2 border rounded-md"
                      min="0"
                      required
                      placeholder="Stock"
                    />
                    <button
                      type="button"
                      onClick={() => removeSizeRow(vIndex, sIndex)}
                      className="text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Save Product
        </button>
      </form>
    </div>
  );
}