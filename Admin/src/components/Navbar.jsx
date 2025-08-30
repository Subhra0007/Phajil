import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-6">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/products">Products</Link>
      <Link to="/blogs">Blogs</Link>
      <button onClick={logout} className="ml-auto bg-red-600 px-3 py-1 rounded">
        Logout
      </button>
    </nav>
  );
}
