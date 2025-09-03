// Admin/pages/Products.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/admin/products");
      setProducts(res.data.data || []);
    } catch (err) {
      setError("Failed to load products");
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await API.delete(`/admin/products/${id}`);
        fetchProducts();
      } catch (err) {
        setError("Failed to delete");
      }
    }
  };

  // Flatten color/size/stock rows for a product
  const rowsFor = (prod) => {
    const out = [];
    (prod.variants || []).forEach((v) => {
      (v.sizes || []).forEach((s) => {
        out.push({
          combo: `${v.color || "-"}, ${s.size || "-"}`,
          stock: Number(s.stock || 0),
        });
      });
    });
    return out;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <button
          onClick={() => navigate("/add-product")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Add Product
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Color & Size — Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((prod) => (
              <tr key={prod._id}>
                <td className="px-6 py-4 whitespace-nowrap">{prod.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{prod.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">₹{prod.price}</td>
                <td className="px-6 py-4">
                  <table className="text-sm border">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-2 py-1 border">Color, Size</th>
                        <th className="px-2 py-1 border">Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rowsFor(prod).map((row, idx) => (
                        <tr key={idx}>
                          <td className="px-2 py-1 border">{row.combo}</td>
                          <td className="px-2 py-1 border">{row.stock}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => navigate(`/edit-product/${prod._id}`)}
                    className="text-blue-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(prod._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
