// components/Dashboard.js
import React, { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    revenue: 0,
    recentOrders: [],
    popularProducts: [],
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/admin/dashboard");
      setStats(res.data.data);
    } catch (err) {
      setError("Failed to load dashboard");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500">Total Products</p>
          <h2 className="text-3xl font-bold">{stats.totalProducts}</h2>
         
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500">Total Orders</p>
          <h2 className="text-3xl font-bold">{stats.totalOrders}</h2>
        
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500">Total Users</p>
          <h2 className="text-3xl font-bold">{stats.totalUsers}</h2>
         
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500">Total Revenue</p>
          <h2 className="text-3xl font-bold">₹{stats.revenue.toFixed(2)}</h2>
         
        </div>
      </div>

      {/* Orders & Popular Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recent Orders</h2>
            <button className="text-blue-600 text-sm hover:underline">View All</button>
          </div>
          <ul className="divide-y">
            {stats.recentOrders.map((order) => (
              <li key={order._id} className="flex justify-between py-3">
                <div>
                  <p className="font-semibold">Order #{order._id}</p>
                  <p className="text-sm text-gray-500">{order.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">${order.totalAmount}</p>
                  <p className="text-xs text-gray-500">{order.status}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular Products */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Popular Products</h2>
            <button className="text-blue-600 text-sm hover:underline">View All</button>
          </div>
          <ul className="divide-y">
            {stats.popularProducts.map((p, index) => (
              <li key={index} className="flex justify-between py-3">
                <div>
                  <p className="font-semibold">{index + 1}. {p.title}</p>
                  <p className="text-sm text-gray-500">{p.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${p.price}</p>
                  <p className="text-xs text-gray-500">Stock: {p.stock}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
