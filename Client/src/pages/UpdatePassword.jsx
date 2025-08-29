import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { Link, useParams, useNavigate } from "react-router-dom";
import API from "../components/axios";

export default function UpdatePassword() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await API.post(`/auth/reset-password`, {
        password,
        confirmPassword,
        token,
      });

      if (res.data.success) {
        setSuccess(res.data.message || "Password reset successful");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(res.data.message || "Failed to reset password");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 ">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="bg-white relative rounded-2xl shadow-lg w-full max-w-md border-t-4 border-yellow-400 p-8 mt-30 mb-10">
          <h1 className="text-2xl font-bold text-center mb-4">
            Choose New Password
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Almost done. Enter your new password and you’re all set.
          </p>

          {error && <p className="text-red-400 mb-2 text-sm">{error}</p>}
          {success && <p className="text-yellow-500 mb-2 text-sm">{success}</p>}

          <form onSubmit={handleOnSubmit} className="space-y-4">
            {/* Password Input */}
            <label className="relative block">
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter New Password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 pr-10"
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

            {/* Confirm Password Input */}
            <label className="relative block">
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm New Password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 pr-10"
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

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 transition text-black py-3 rounded-lg font-semibold shadow-md mt-4"
            >
              Reset Password
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center">
            <Link to="/login" className="text-red-400 hover:underline flex items-center gap-2">
              <BiArrowBack /> Back To Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
