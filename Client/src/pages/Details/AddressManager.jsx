//pages/Drails/AddressManager.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../components/axios";

export default function AddressManager() {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    label: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  const [editingAddress, setEditingAddress] = useState(null);
  const navigate = useNavigate();

  // Fetch addresses
  const fetchAddresses = async () => {
    try {
      const res = await API.get("/address/all");
      setAddresses(res.data.addresses || []);
    } catch (err) {
      console.error("Fetch addresses error:", err);
      alert("Failed to fetch addresses");
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Add address
  const handleAdd = () => {
    if (!newAddress.label || !newAddress.street || !newAddress.city || !newAddress.state || !newAddress.zipCode || !newAddress.country) {
      alert("All address fields are required");
      return;
    }
    API.post("/address/add", newAddress)
      .then(() => {
        fetchAddresses();
        setNewAddress({ label: "", street: "", city: "", state: "", zipCode: "", country: "" });
      })
      .catch((err) => {
        console.error("Add error:", err);
        alert("Failed to add address");
      });
  };

  // Update address
  const handleUpdate = (id) => {
    if (!editingAddress.label || !editingAddress.street || !editingAddress.city || !editingAddress.state || !editingAddress.zipCode || !editingAddress.country) {
      alert("All address fields are required");
      return;
    }
    const updatedData = {
      label: editingAddress.label,
      street: editingAddress.street,
      city: editingAddress.city,
      state: editingAddress.state,
      zipCode: editingAddress.zipCode,
      country: editingAddress.country,
      isDefault: editingAddress.isDefault || false,
    };
    API.put("/address/update", { addressId: id, updatedData })
      .then(() => {
        fetchAddresses();
        setEditingAddress(null);
      })
      .catch((err) => {
        console.error("Update error:", err);
        alert("Failed to update address");
      });
  };

  // Delete address
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    API.delete("/address/delete", { data: { addressId: id } })
      .then(() => fetchAddresses())
      .catch((err) => {
        console.error("Delete error:", err);
        alert("Failed to delete address");
      });
  };

  // Set default address
  const handleSetDefault = (id) => {
    console.log("Setting default address with id:", id); // Debug log
    API.put("/address/update", { addressId: id, updatedData: { isDefault: true } })
      .then(() => fetchAddresses())
      .catch((err) => {
        console.error("Set default error:", err); // Debug log
        alert("Failed to set default address");
      });
  };

  // Start editing an address
  const startEditing = (addr) => {
    setEditingAddress({ addressId: addr._id, ...addr });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingAddress(null);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-[#1e293b] p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Manage Addresses</h2>

        {/* Address List */}
        {addresses.length === 0 ? (
          <p>No addresses found.</p>
        ) : (
          addresses.map((addr) => (
            <div
              key={addr._id}
              className={`p-4 mb-4 rounded-lg border ${
                addr.isDefault ? "border-green-500 bg-green-900/20" : "border-gray-600"
              }`}
            >
              {editingAddress && editingAddress.addressId === addr._id ? (
                <div className="space-y-4">
                  <input
                    placeholder="Label (e.g., Home, Work)"
                    value={editingAddress.label}
                    onChange={(e) =>
                      setEditingAddress({ ...editingAddress, label: e.target.value })
                    }
                    className="px-4 py-3 rounded-lg bg-[#0f172a] border border-gray-600 w-full"
                  />
                  <input
                    placeholder="Street"
                    value={editingAddress.street}
                    onChange={(e) =>
                      setEditingAddress({ ...editingAddress, street: e.target.value })
                    }
                    className="px-4 py-3 rounded-lg bg-[#0f172a] border border-gray-600 w-full"
                  />
                  <input
                    placeholder="City"
                    value={editingAddress.city}
                    onChange={(e) =>
                      setEditingAddress({ ...editingAddress, city: e.target.value })
                    }
                    className="px-4 py-3 rounded-lg bg-[#0f172a] border border-gray-600 w-full"
                  />
                  <input
                    placeholder="State"
                    value={editingAddress.state}
                    onChange={(e) =>
                      setEditingAddress({ ...editingAddress, state: e.target.value })
                    }
                    className="px-4 py-3 rounded-lg bg-[#0f172a] border border-gray-600 w-full"
                  />
                  <input
                    placeholder="Zip Code"
                    value={editingAddress.zipCode}
                    onChange={(e) =>
                      setEditingAddress({ ...editingAddress, zipCode: e.target.value })
                    }
                    className="px-4 py-3 rounded-lg bg-[#0f172a] border border-gray-600 w-full"
                  />
                  <input
                    placeholder="Country"
                    value={editingAddress.country}
                    onChange={(e) =>
                      setEditingAddress({ ...editingAddress, country: e.target.value })
                    }
                    className="px-4 py-3 rounded-lg bg-[#0f172a] border border-gray-600 w-full"
                  />
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleUpdate(addr._id)}
                      className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">
                      {addr.label} {addr.isDefault && <span className="text-green-400">(Default)</span>}
                    </p>
                    <p>
                      {addr.street}, {addr.city}, {addr.state}, {addr.zipCode}, {addr.country}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditing(addr)}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleSetDefault(addr._id)}
                      disabled={addr.isDefault}
                      className={`px-4 py-2 rounded-lg ${
                        addr.isDefault
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {addr.isDefault ? "Default" : "Set Default"}
                    </button>
                    <button
                      onClick={() => handleDelete(addr._id)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}

        {/* Add Address Form */}
        <h3 className="text-lg font-bold mt-6 mb-2">Add New Address</h3>
        <div className="space-y-4">
          <input
            placeholder="Label (e.g., Home, Work)"
            value={newAddress.label}
            onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
            className="px-4 py-3 rounded-lg bg-[#0f172a] border border-gray-600 w-full"
          />
          <input
            placeholder="Street"
            value={newAddress.street}
            onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
            className="px-4 py-3 rounded-lg bg-[#0f172a] border border-gray-600 w-full"
          />
          <input
            placeholder="City"
            value={newAddress.city}
            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
            className="px-4 py-3 rounded-lg bg-[#0f172a] border border-gray-600 w-full"
          />
          <input
            placeholder="State"
            value={newAddress.state}
            onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
            className="px-4 py-3 rounded-lg bg-[#0f172a] border border-gray-600 w-full"
          />
          <input
            placeholder="Zip Code"
            value={newAddress.zipCode}
            onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
            className="px-4 py-3 rounded-lg bg-[#0f172a] border border-gray-600 w-full"
          />
          <input
            placeholder="Country"
            value={newAddress.country}
            onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
            className="px-4 py-3 rounded-lg bg-[#0f172a] border border-gray-600 w-full"
          />
          <button
            onClick={handleAdd}
            className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500"
          >
            Add Address
          </button>
        </div>

        {/* Back to Profile */}
        <div className="mt-6">
          <button
            onClick={() => navigate("/dashboard/profile")}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg"
          >
            Back to Profile
          </button>
        </div>
      </div>
    </div>
  );
}