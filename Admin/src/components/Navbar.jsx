// components/Navbar.jsx
import { FaBars, FaSignOutAlt } from "react-icons/fa";

export default function Navbar({ toggleSidebar, logout }) {
  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center">
        {/* <button
          onClick={toggleSidebar}
          className="mr-4 text-white hover:text-gray-300 focus:outline-none"
        >
          <FaBars size={24} />
        </button> */}
        <span className="text-xl font-bold">Admin Panel</span>
      </div>

      <div>
        <button
          onClick={logout}
          className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-200"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>
    </nav>
  );
}
