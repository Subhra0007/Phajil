// Client/pages/SingleProduct.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../components/axios";
import CategoryProducts from "../components/CategoryProducts";

export default function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/public/products/${id}`);
      const prod = res.data.data;
      setProduct(prod);
      setSelectedColor(prod.variants?.[0]?.color || "");
    } catch (err) {
      setError("Product not found");
    }
  };

  if (error) return <p className="text-red-500 text-center p-6">{error}</p>;
  if (!product) return <p className="text-center p-6">Loading...</p>;

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setSelectedSize(""); // reset size when color changes
  };

  const selectedVariant = product.variants.find((v) => v.color === selectedColor);

  return (
    <div className="max-w-6xl mx-auto p-6 py-25">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-gray-600 hover:text-gray-800"
      >
        ← Back
      </button>

      {/* Top Section: Image + Details */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* LEFT: Images */}
        <div className="w-full md:w-1/2">
          <img
            src={selectedVariant?.images?.[0] || product.images?.[0]}
            alt={product.title}
            className="w-full max-h-[500px] object-contain rounded-lg border mb-4"
          />
          {/* Thumbnail images */}
          <div className="flex gap-2">
            {(selectedVariant?.images || product.images || []).map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                className="w-20 h-20 object-cover border rounded cursor-pointer hover:border-red-500"
                onClick={() => {
                  const newVariant = { ...selectedVariant, images: [img, ...selectedVariant.images.filter(im => im !== img)] };
                  setProduct({
                    ...product,
                    variants: product.variants.map(v =>
                      v.color === selectedVariant.color ? newVariant : v
                    ),
                  });
                }}
              />
            ))}
          </div>
          {/* If video exists */}
          {product.videoUrl && (
            <video
              controls
              className="w-full mt-4 rounded-lg shadow"
              src={product.videoUrl}
            />
          )}
        </div>

        {/* RIGHT: Details */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
          <p className="text-gray-600 mb-3">
            ₹{product.price}{" "}
            {product.originalPrice && (
              <span className="line-through text-gray-400 ml-2">
                ₹{product.originalPrice}
              </span>
            )}{" "}
            {product.discountedPercentage && (
              <span className="text-green-500 ml-2">
                {product.discountedPercentage}% OFF
              </span>
            )}
          </p>

          {/* Colors */}
          <div className="mt-4">
            <h4 className="font-semibold">Available Colors:</h4>
            <div className="flex gap-2 mt-2">
              {product.variants.map((v) => (
                <button
                  key={v.color}
                  onClick={() => handleColorChange(v.color)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === v.color ? "border-red-500" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: v.color }}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mt-4">
            <h4 className="font-semibold">Available Sizes:</h4>
            <div className="flex gap-2 mt-2">
              {selectedVariant?.sizes
                .filter((s) => s.stock > 0)
                .map((s) => (
                  <button
                    key={s.size}
                    onClick={() => setSelectedSize(s.size)}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize === s.size
                        ? "bg-red-600 text-white border-red-600"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {s.size}
                  </button>
                ))}
            </div>
          </div>

          {/* Add to Basket */}
          <button
            disabled={!selectedSize}
            onClick={() => alert(`Added ${selectedSize} of ${product.title}`)}
            className="mt-6 w-full bg-red-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-red-700 disabled:bg-gray-300"
          >
            {selectedSize ? "Add to Basket" : "Select Size"}
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="mt-12 border-t pt-6">
        <h2 className="text-xl font-bold mb-4">Product Description</h2>
        <p className="text-gray-700">{product.description}</p>
      </div>

      {/* Reviews */}
      <div className="mt-12 border-t pt-6">
        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
        <p className="text-gray-600 italic">No reviews yet.</p>
      </div>

      {/* Related Products */}
      <div className="mt-12 border-t pt-6">
        <h2 className="text-xl font-bold mb-4">You May Also Like</h2>
        {/* ✅ Reuse CategoryProducts for same category */}
        <CategoryProducts category={product.category} />
      </div>
    </div>
  );
}
