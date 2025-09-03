// components/OrderSection.js
import React, { useEffect, useState } from "react";
import API from "../api/axios";

export default function OrderSection() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/admin/orders");
      setOrders(res.data.data);
    } catch (err) {
      setError("Failed to load orders");
    }
  };

  const handleStatusChange = async (orderId, newStatus, newNotes) => {
    try {
      const updatedOrder = { status: newStatus, deliveryStatusNotes: newNotes };
      await API.put(`/admin/orders/${orderId}`, updatedOrder);
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus, deliveryStatusNotes: newNotes } : order
        )
      );
    } catch (err) {
      setError("Failed to update order status or notes");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Order Management</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delivery Notes</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="px-6 py-4 whitespace-nowrap">{order._id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.user.firstName} {order.user.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">${order.totalAmount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value, order.deliveryStatusNotes)}
                    className="p-2 border rounded-md"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="returned">Returned</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <textarea
                    value={order.deliveryStatusNotes}
                    onChange={(e) => handleStatusChange(order._id, order.status, e.target.value)}
                    className="w-full p-2 border rounded-md"
                    rows="2"
                    placeholder="Add delivery notes..."
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => {/* Navigate to order details */}}
                    className="text-blue-600 mr-2"
                  >
                    View Details
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