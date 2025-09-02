//pages/Details/EditProfile.jsx
import React, { useEffect, useState } from "react";
import API from "../../components/axios";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function EditProfile() {
  const navigate = useNavigate();
  const [namePreview, setNamePreview] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [avatar, setAvatar] = useState("");

  const load = async () => {
    try {
      const res = await API.get("/profile/getUserDetails");
      const u = res?.data?.user;
      if (!u) throw new Error("No user");

      setNamePreview(`${u.firstName || ""} ${u.lastName || ""}`.trim());
      setEmail(u.email || "");
      setPhone(u.contactNumber || "");
      setAvatar(u.avatar || "");
      const ad = u.additionalDetails || {};
      const dob = ad.dateOfBirth ? String(ad.dateOfBirth).slice(0, 10) : "";
      setDateOfBirth(dob);
      setGender(ad.gender || "");
      setAbout(ad.about || "");
    } catch (e) {
      console.error("Failed to load profile", e);
      alert("Failed to load profile");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    try {
      await API.put("/profile/updateProfile", {
        additionalDetails: {
          dateOfBirth: dateOfBirth || null,
          gender: gender || "",
          about: about || "",
        },
      });
      alert("Profile updated successfully");
      navigate("/dashboard/profile");
    } catch (e) {
      console.error("Update failed", e);
      alert("Update failed");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = new FormData();
    data.append("displayPicture", file);

    try {
      const res = await API.put("/profile/updateDisplayPicture", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const img = res?.data?.user?.avatar || "";
      setAvatar(img);
      localStorage.setItem("userImage", img);
      window.dispatchEvent(new Event("authChange"));
    } catch (err) {
      console.error("Image upload failed", err);
      alert("Image upload failed");
    }
  };

  const handleRemoveImage = async () => {
    try {
      const res = await API.put("/profile/removeDisplayPicture");
      const img = res?.data?.user?.avatar || "";
      setAvatar(img);
      localStorage.removeItem("userImage");
      window.dispatchEvent(new Event("authChange"));
      alert("Profile picture removed");
    } catch (err) {
      console.error("Image remove failed", err);
      alert("Image remove failed");
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) return;
    try {
      await API.delete("/profile/deleteProfile");
      localStorage.clear();
      window.dispatchEvent(new Event("authChange"));
      window.location.href = "/signup";
    } catch (e) {
      console.error("Delete failed", e);
      alert("Failed to delete account");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-[#1e293b] p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

        {/* Profile Picture Section */}
        <div className="mb-6">
          <div className="flex items-center gap-6">
            {avatar ? (
              <img
                src={avatar}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-600"
              />
            ) : (
              <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold border-2 border-gray-600">
                {namePreview?.[0]?.toUpperCase() || "U"}
              </div>
            )}
            <div>
              <p className="mb-3 font-semibold">Change Profile Picture</p>
              <div className="flex gap-3">
                <label className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg cursor-pointer">
                  Change
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                <button
                  onClick={handleRemoveImage}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="space-y-6">
          {/* Readonly signup fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              value={namePreview}
              readOnly
              className="px-4 py-3 rounded-lg bg-gray-700 cursor-not-allowed text-gray-300"
            />
            <input
              type="email"
              value={email}
              readOnly
              className="px-4 py-3 rounded-lg bg-gray-700 cursor-not-allowed text-gray-300"
            />
            <input
              type="tel"
              value={phone}
              readOnly
              className="px-4 py-3 rounded-lg bg-gray-700 cursor-not-allowed text-gray-300"
            />
            <input
              type="password"
              value="********"
              readOnly
              className="px-4 py-3 rounded-lg bg-gray-700 cursor-not-allowed text-gray-300"
            />
          </div>

          {/* Editable additionalDetails */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="px-4 py-3 rounded-lg bg-[#0f172a] border border-gray-600 focus:ring-2 focus:ring-yellow-400"
            />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="px-4 py-3 rounded-lg bg-[#0f172a] border border-gray-600 focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <input
              type="text"
              placeholder="Enter Bio Details"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="px-4 py-3 rounded-lg bg-[#0f172a] border border-gray-600 focus:ring-2 focus:ring-yellow-400 md:col-span-2"
            />
          </div>

          {/* Delete Account */}
          <div className="bg-red-900/80 border border-red-600 p-5 rounded-lg flex gap-3 items-start">
            <RiDeleteBin6Line className="text-red-400 text-2xl mt-1" />
            <div>
              <h3 className="text-lg font-bold mb-2">Delete Account</h3>
              <p className="text-sm mb-2">
                This account contains Paid Courses. Deleting your account will remove all the content
                associated with it.
              </p>
              <button
                type="button"
                onClick={handleDeleteAccount}
                className="text-red-400 underline hover:text-red-500 cursor-pointer"
              >
                I want to delete my account.
              </button>
            </div>
          </div>

          {/* Save / Cancel / Edit Addresses */}
          <div className="flex justify-between items-center gap-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/address")}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg"
            >
              Edit Addresses
            </button>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard/profile")}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={save}
                className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}