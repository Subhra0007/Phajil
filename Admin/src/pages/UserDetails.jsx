//pages/UserDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await API.get(`/admin/users/${id}`);
      setUser(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load user");
    }
  };

  if (!user) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">User Details: {user.email}</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Contact:</strong> {user.contactNumber}</p>
        <p><strong>Gender:</strong> {user.additionalDetails?.gender || "Not specified"}</p>
        <p><strong>Date of Birth:</strong> {user.additionalDetails?.dateOfBirth ? new Date(user.additionalDetails.dateOfBirth).toLocaleDateString() : "Not specified"}</p>
        <p><strong>About:</strong> {user.additionalDetails?.about || "Not specified"}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Addresses</h2>
        {user.additionalDetails?.addresses?.length ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Label</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {user.additionalDetails.addresses.map((addr, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{addr.label}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{addr.street}, {addr.city}, {addr.state}, {addr.zipCode}, {addr.country}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{addr.isDefault ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No addresses available.</p>
        )}
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Orders</h2>
        {user.orders?.length ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {user.orders.map((o) => (
                <tr key={o._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{o._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">₹{o.totalAmount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{o.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No orders available.</p>
        )}
      </div>
    </div>
  );
}