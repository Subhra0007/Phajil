//pages/ForgotPassword.jsx
import { useState } from "react";
import API from "../components/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/reset-password-token", { email });
      setMessage(res.data.message);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error sending reset link");
      setMessage("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-100">
      <div className="bg-white relative rounded-2xl shadow-lg w-full max-w-md border-t-4 border-yellow-400 p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>

        {message && <p className="text-yellow-500 text-sm mb-2">{message}</p>}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 transition text-black py-3 rounded-lg font-semibold shadow-md"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}