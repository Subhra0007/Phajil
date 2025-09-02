// src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0, blogs: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [products, orders, users, blogs] = await Promise.all([
          API.get("/admin/products"),
          API.get("/admin/orders"),
          API.get("/admin/users"),
          API.get("/admin/blogs"),
        ]);

        setStats({
          products: products.data.data.length,
          orders: orders.data.data.length,
          users: users.data.data.length,
          blogs: blogs.data.data.length,
        });
      } catch (err) {
        setError("Failed to load dashboard stats");
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Products</h2>
          <p className="text-2xl">{stats.products}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Orders</h2>
          <p className="text-2xl">{stats.orders}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Users</h2>
          <p className="text-2xl">{stats.users}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Blogs</h2>
          <p className="text-2xl">{stats.blogs}</p>
        </div>
      </div>
    </div>
  );
}
