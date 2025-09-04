// Client/pages/BlogList.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../components/axios";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
     const res = await API.get("/public/blogs"); // ✅ Public API
      setBlogs(res.data.data);
    } catch (err) {
      setError("Failed to load blogs");
    }
  };

  const getPreview = (html) => {
    const plain = html.replace(/<[^>]+>/g, ""); // remove HTML tags
    return plain.split(" ").slice(0, 20).join(" ") + "...";
  };

  return (
    <section className="bg-yellow-400">
    <div className="p-6 max-w-6xl mx-auto py-25">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Blogs</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((b) => (
          <div
            key={b._id}
            className="bg-gray-100 shadow rounded-lg overflow-hidden flex flex-col"
          >
            {b.image && (
              <img
                src={b.image}
                alt={b.title}
                className="h-48 w-full object-cover"
              />
            )}
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-xl font-semibold mb-2">{b.title}</h2>
              <p className="text-gray-600 flex-grow">{getPreview(b.content)}</p>
              <button
                onClick={() => navigate(`/blog/${b._id}`)}
                className="mt-4 bg-red-500 text-black px-4 py-2 rounded-md self-start"
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </section>
  );
}
