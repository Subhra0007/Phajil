import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    API.get("/admin/blogs").then((res) => setBlogs(res.data.data));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Blogs</h2>
          <Link to="/add-blog" className="bg-green-600 text-white px-3 py-1 rounded">
            + Add Blog
          </Link>
        </div>
        <ul className="mt-4 space-y-2">
          {blogs.map((b) => (
            <li key={b._id} className="border p-2 rounded">
              <h3 className="font-semibold">{b.title}</h3>
              <p className="text-sm text-gray-600">{b.slug}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
