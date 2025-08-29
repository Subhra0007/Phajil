//src/pages/ContactUs.jsx
import { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import API from "../components/axios"; // axios instance

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus("Sending...");

  try {
    const res = await API.post("/contact", {
      name: formData.name,
      email: formData.email,
      // ❌ OLD: message: `${formData.subject}\n\n${formData.message}`,
      // ✅ NEW: Send subject and message separately as the server expects
      subject: formData.subject,
      message: formData.message,
    });

    setStatus(res.data.message || "Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  } catch (err) {
    setStatus(
      err.response?.data?.message || "Failed to send message. Try again."
    );
  }
};

  return (
    <section className="py-16 mt-22 bg-gray-100">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6">
        {/* Left Form Section */}
        <div className="bg-gray-100 p-6 rounded-2xl shadow-2xl border-b-neutral-300 border-y-4 border-yellow-400">
          <h2 className="text-3xl font-bold mb-4">Leave a Message</h2>
          <p className="text-gray-800 mb-8">
            If you have any questions, please feel free to get in touch with us.
            We will reply as soon as possible. Thank you!
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name *"
                required
                className="w-full p-3 rounded-lg bg-white/60 border border-white/80 focus:outline-none focus:border-yellow-400"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email *"
                required
                className="w-full p-3 rounded-lg bg-white/60 border border-white/80 focus:outline-none focus:border-yellow-400"
              />
            </div>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full p-3 rounded-lg bg-white/60 border border-white/80 focus:outline-none focus:border-yellow-400"
            />
            <textarea
              rows="6"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              className="w-full p-3 rounded-lg bg-white/60 border border-white/80 focus:outline-none focus:border-yellow-400"
            ></textarea>
            <button
              type="submit"
              className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-500 transition"
            >
              Send
            </button>
          </form>
          {status && (
            <p className="mt-4 text-sm text-gray-700 font-medium">{status}</p>
          )}
        </div>

        {/* Right Info Section */}
        <div className="bg-gray-100 p-6 rounded-2xl shadow-2xl border-b-neutral-300 border-y-4 border-yellow-400">
          <h2 className="text-2xl font-bold mb-6">Our Store</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-yellow-400 text-xl mt-1" />
              <p>Haringhata, Nadia, West Bengal, 741257</p>
            </div>
            <div className="flex items-start gap-3">
              <FaEnvelope className="text-yellow-400 text-xl mt-1" />
              <p>
                Please email us:{" "}
                <a
                  href="mailto:support@phajil.com"
                  className="text-red-500 hover:underline"
                >
                  support@phajil.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
