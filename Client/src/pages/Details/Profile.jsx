// Profile component (fixed address display)
import React, { useEffect, useState } from "react";
import API from "../../components/axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchUserData = () => {
    API.get("/profile/getUserDetails")
      .then((res) => {
        if (res.data?.user) {
          setUser(res.data.user);
          if (res.data.user.firstName) {
            localStorage.setItem("firstName", res.data.user.firstName);
            window.dispatchEvent(new Event("authChange"));
          }
        } else {
          setError("No user data received.");
        }
      })
      .catch((err) => {
        console.error("Profile fetch error:", err.response?.status, err.response?.data);
        if (err.response?.status === 401) {
          setError("Session expired. Please log in again.");
          localStorage.clear();
          window.dispatchEvent(new Event("authChange"));
          navigate("/login");
        } else {
          setError("Failed to load profile. Please try again.");
        }
      });
  };

  useEffect(() => {
    fetchUserData();
  }, [navigate]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
        <p>{error}</p>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-400"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-300">
        <div className="animate-pulse space-y-4 w-80">
          <div className="h-6 bg-gray-700 rounded"></div>
          <div className="h-6 bg-gray-700 rounded"></div>
          <div className="h-6 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  // Find default address or first one
  const defaultAddress = user?.additionalDetails?.addresses?.find(addr => addr.isDefault) ||
                         user?.additionalDetails?.addresses?.[0];
  const addressString = defaultAddress 
    ? `${defaultAddress.street}, ${defaultAddress.city}, ${defaultAddress.state}, ${defaultAddress.zipCode}, ${defaultAddress.country}`
    : "N/A";

  return (
    <div className="flex flex-col min-h-screen bg-[#0d1117] text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">My Profile</h2>
      </div>

      {/* Profile Info Card */}
      <div className="bg-[#161b22] p-6 rounded-lg shadow-lg flex items-center justify-between mb-6">
        <div className="flex items-center">
          <img
            src={
              user?.image ||
              `https://placehold.co/80x80/2f81f7/ffffff?text=${user?.firstName?.[0] || "U"}`
            }
            alt="User Avatar"
            className="w-20 h-20 rounded-full mr-4 object-cover border-1 border-gray-800 "
          />
          <div>
            <h3 className="text-xl font-bold">
              {user?.displayName || `${user?.firstName || "N/A"} ${user?.lastName || ""}`}
            </h3>
            <p className="text-gray-400">{user?.email || "No email"}</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/dashboard/edit-profile")}
          className="bg-yellow-500 text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-400 transition-colors"
        >
          Edit
        </button>
      </div>

      {/* Personal Details */}
      <div className="bg-[#161b22] p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Personal Details</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          <div>
            <p className="text-sm font-semibold text-gray-400">Display Name</p>
            <p className="mt-1">{user?.displayName || `${user?.firstName || "N/A"} ${user?.lastName || ""}`}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-400">Email</p>
            <p className="mt-1">{user?.email || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-400">Phone Number</p>
            <p className="mt-1">{user?.contactNumber || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-400">Date of Birth</p>
            <p className="mt-1">
              {user?.additionalDetails?.dateOfBirth
                ? user.additionalDetails.dateOfBirth.split("T")[0]
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-400">Gender</p>
            <p className="mt-1">{user?.additionalDetails?.gender || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-400">About</p>
            <p className="mt-1">{user?.additionalDetails?.about || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-400">Address</p>
            <p className="mt-1">{addressString}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;