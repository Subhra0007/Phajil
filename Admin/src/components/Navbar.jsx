//src/components/Navbar.js
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex flex-wrap gap-4 items-center">
      <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
      <Link to="/products" className="hover:text-gray-300">Products</Link>
      <Link to="/blogs" className="hover:text-gray-300">Blogs</Link>
      <Link to="/orders" className="hover:text-gray-300">Orders</Link>
      <Link to="/users" className="hover:text-gray-300">Users</Link>
      <button onClick={logout} className="ml-auto bg-red-600 px-4 py-2 rounded hover:bg-red-700">
        Logout
      </button>
    </nav>
  );
}