//sre/pages/Dashboard.jsx
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName"); // ✅ clear stored firstname
    window.dispatchEvent(new Event("authChange")); // ✅ notify Navbar
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-[#0d1117] text-white mt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-[#161b22] p-4 space-y-6">
        <h2 className="text-xl font-bold">User Dashboard</h2>
        <nav className="space-y-2">
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${
                isActive ? "bg-yellow-500 text-black" : "hover:bg-yellow-500"
              }`
            }
          >
            My Profile
          </NavLink>

          <NavLink
            to="orders"
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${
                isActive ? "bg-yellow-500 text-black" : "hover:bg-yellow-500"
              }`
            }
          >
            Order Summary
          </NavLink>

          <NavLink
            to="wishlist"
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${
                isActive ? "bg-yellow-500 text-black" : "hover:bg-yellow-500"
              }`
            }
          >
            Wishlist
          </NavLink>

          <NavLink
            to="cart"
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${
                isActive ? "bg-yellow-500 text-black" : "hover:bg-yellow-500"
              }`
            }
          >
            Cart
          </NavLink>

          <NavLink
            to="track"
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${
                isActive ? "bg-yellow-500 text-black" : "hover:bg-yellow-500"
              }`
            }
          >
            Track Order
          </NavLink>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded hover:bg-red-500"
          >
            Log Out
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
