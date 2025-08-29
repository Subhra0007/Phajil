//src/components/axios.jsx
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1", // ✅ backend prefix
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach token dynamically (always fresh)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
