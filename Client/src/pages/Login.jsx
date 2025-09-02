//pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../components/axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "password") {
      const hasLowerCase = /[a-z]/.test(value);
      const hasUpperCase = /[A-Z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const isLongEnough = value.length >= 8;
      setIsPasswordValid(hasLowerCase && hasUpperCase && hasNumber && hasSpecial && isLongEnough);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      window.dispatchEvent(new Event("authChange"));
      navigate("/dashboard/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 mt-20">
      <div className="bg-white relative rounded-2xl shadow-lg w-full max-w-md border-t-4 border-yellow-400 p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <p className="text-sm text-gray-600 mb-4">
          Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character, and be at least 8 characters long.
        </p>
        {formData.password && !isPasswordValid && (
          <p className="text-red-500 text-sm mb-3">Password does not meet the requirements.</p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <label className="relative block">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[14px] z-10 cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={22} fill="#555" />
              ) : (
                <AiOutlineEye fontSize={22} fill="#555" />
              )}
            </span>
          </label>

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-red-400 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={!isPasswordValid}
            className="w-full bg-yellow-400 hover:bg-yellow-500 transition text-black py-3 rounded-lg font-semibold shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-red-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}