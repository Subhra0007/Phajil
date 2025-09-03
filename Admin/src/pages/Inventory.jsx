// pages/Inventory.jsx
import React, { useEffect, useState } from "react";
import API from "../api/axios";

export default function Inventory() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    outOfStock: 0,
    lowStock: 0,
    inStock: 0,
    outOfStockList: [],
    lowStockList: [],
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/admin/inventory");
      setStats(res.data.data);
    } catch (err) {
      setError("Failed to load inventory");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Inventory Management</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-2xl">{stats.totalProducts}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Out of Stock</h2>
          <p className="text-2xl">{stats.outOfStock}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Low Stock</h2>
          <p className="text-2xl">{stats.lowStock}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">In Stock</h2>
          <p className="text-2xl">{stats.inStock}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Low Stock Alerts</h2>
          <ul>
            {stats.lowStockList.map((item) => (
              <li key={item._id} className="flex justify-between">
                <span>{item.title}</span>
                <span>{item.stock} units left</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Out of Stock</h2>
          <ul>
            {stats.outOfStockList.map((item) => (
              <li key={item._id}>{item.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}