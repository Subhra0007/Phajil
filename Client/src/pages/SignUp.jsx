//pages/SignUp.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../components/axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
    accountType: "user",
    otp: "",
  });
  const [error, setError] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "password" || name === "confirmPassword") {
      const hasLowerCase = /[a-z]/.test(value);
      const hasUpperCase = /[A-Z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const isLongEnough = value.length >= 8;
      setIsPasswordValid(hasLowerCase && hasUpperCase && hasNumber && hasSpecial && isLongEnough);
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      if (!formData.email) {
        setError("Please enter your email to send OTP.");
        return;
      }
      await API.post("/auth/sendotp", { email: formData.email });
      alert("OTP sent to your email!");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP.");
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      if (!formData.otp) {
        setError("Please enter OTP.");
        return;
      }
      const res = await API.post("/auth/verifyotp", {
        email: formData.email,
        otp: formData.otp,
      });
      if (res.data.success) {
        alert("OTP Verified Successfully!");
        setOtpVerified(true);
        setError("");
      } else {
        setError("Invalid OTP, please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const res = await API.post("/auth/signup", formData);
      if (res.data.success) {
        alert("User registered successfully!");
        navigate("/login");
      } else {
        setError(res.data.message || "Signup failed.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-100">
      <div className="bg-white relative rounded-2xl shadow-lg w-full max-w-md border-t-4 border-yellow-400 p-8 mt-30 m-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <div className="flex gap-2">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="button"
              onClick={handleSendOTP}
              className="bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-4 rounded-lg font-semibold shadow-md cursor-pointer"
            >
              Send OTP
            </button>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="button"
              onClick={handleVerifyOTP}
              className="bg-green-400 hover:bg-green-500 text-black py-3 px-4 rounded-lg font-semibold shadow-md cursor-pointer"
            >
              Verify OTP
            </button>
          </div>

          {/* {!otpVerified && (
            <p className="text-sm text-gray-600">
              Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character, and be at least 8 characters long.
            </p>
          )} */}
          {otpVerified && (
            <>
             <p className="text-sm text-gray-600">
              Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character, and be at least 8 characters long.
            </p>
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
              <label className="relative block">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <span
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-[14px] z-10 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible fontSize={22} fill="#555" />
                  ) : (
                    <AiOutlineEye fontSize={22} fill="#555" />
                  )}
                </span>
              </label>
              {formData.password && !isPasswordValid && (
                <p className="text-red-500 text-sm">Password does not meet the requirements.</p>
              )}
            </>
          )}

          <button
            type="submit"
            disabled={!otpVerified || !isPasswordValid || formData.password !== formData.confirmPassword}
            className="w-full bg-yellow-400 hover:bg-yellow-500 transition text-black py-3 rounded-lg font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-red-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}