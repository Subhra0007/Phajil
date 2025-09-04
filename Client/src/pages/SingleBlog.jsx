// Client/pages/SingleBlog.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../components/axios";

export default function SingleBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const res = await API.get(`/public/blogs/${id}`);  // ✅ Public API
      setBlog(res.data.data);
    } catch (err) {
      setError("Blog not found");
    }
  };

  if (error) return <p className="text-red-500 text-center p-6">{error}</p>;
  if (!blog) return <p className="text-center p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto py-30">
      <h1 className="text-3xl font-bold mb-4 text-center">{blog.title}</h1>
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full max-h-[400px] object-cover rounded-lg mb-6"
        />
      )}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
}
