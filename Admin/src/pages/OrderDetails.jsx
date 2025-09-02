//pages/OrderDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [form, setForm] = useState({
    status: "",
    paymentStatus: "",
    expectedDeliveryDate: "",
    trackingId: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await API.get(`/admin/orders/${id}`);
      const o = res.data.data;
      setOrder(o);
      setForm({
        status: o.status,
        paymentStatus: o.paymentStatus,
        expectedDeliveryDate: o.expectedDeliveryDate ? new Date(o.expectedDeliveryDate).toISOString().split("T")[0] : "",
        trackingId: o.trackingId || "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load order");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/admin/orders/${id}`, form);
      navigate("/orders");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update order");
    }
  };

  if (!order) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Order Details: {order._id}</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Information</h2>
        <p><strong>User:</strong> {order.user?.email || "N/A"} ({order.user?.firstName} {order.user?.lastName})</p>
        <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
        <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
        <p><strong>Delivery Address:</strong> {order.deliveryAddress?.street}, {order.deliveryAddress?.city}, {order.deliveryAddress?.state}, {order.deliveryAddress?.zipCode}, {order.deliveryAddress?.country}</p>
        <p><strong>Return Eligible:</strong> {order.returnEligible ? "Yes" : "No"} {order.returnExpiryDate ? `(Until ${new Date(order.returnExpiryDate).toLocaleDateString()})` : ""}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Items</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {order.items.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{item.productId?.title || "N/A"}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">₹{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Update Order</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
              <option value="returned">Returned</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Payment Status</label>
            <select
              name="paymentStatus"
              value={form.paymentStatus}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Expected Delivery Date</label>
            <input
              name="expectedDeliveryDate"
              type="date"
              value={form.expectedDeliveryDate}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Tracking ID</label>
            <input
              name="trackingId"
              value={form.trackingId}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Update Order
          </button>
        </form>
      </div>
    </div>
  );
}