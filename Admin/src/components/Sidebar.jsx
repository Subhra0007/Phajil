// components/Sidebar.jsx
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";

export default function Sidebar({ sidebarOpen, toggleSidebar }) {
  return (
    <aside
      className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform overflow-y-auto ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0 transition duration-200 ease-in-out z-20`}
    >
      <h2 className="text-2xl font-bold text-center mb-6">Menu</h2>
      <nav className="space-y-2">
        <Link
          to="/dashboard"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          onClick={toggleSidebar}
        >
          Dashboard
        </Link>

        {/* Products */}
        <details className="group">
          <summary className="flex justify-between items-center py-2.5 px-4 rounded cursor-pointer hover:bg-gray-700">
            <span>Products</span>
            <span className="group-open:rotate-180 transition-transform"><FaAngleDown/></span>
          </summary>
          <div className="ml-4 space-y-1">
            <Link
              to="/add-product"
              className="block py-2 px-3 rounded hover:bg-gray-700"
              onClick={toggleSidebar}
            >
            <div className="flex flex-row gap-2">
                  <IoAdd className="size-6"/> Add Product
            </div>
            </Link>
            <Link
              to="/products"
              className="block py-2 px-3 rounded hover:bg-gray-700"
              onClick={toggleSidebar}
            >
                  <div className="flex flex-row gap-2">
                         <LuClipboardList className="size-6"/>Product List
                  </div>
            </Link>
          </div>
        </details>

        {/* Categories */}
        <details className="group">
          <summary className="flex justify-between items-center py-2.5 px-4 rounded cursor-pointer hover:bg-gray-700">
            <span>Categories</span>
            <span className="group-open:rotate-180 transition-transform"><FaAngleDown/></span>
          </summary>
          <div className="ml-4 space-y-1">
            <Link
              to="/add-category"
              className="block py-2 px-3 rounded hover:bg-gray-700"
              onClick={toggleSidebar}
            >
                  <div className="flex flex-row gap-2">
                        <IoAdd className="size-6"/>  Add Category
                  </div>
            </Link>
            <Link
              to="/categories"
              className="block py-2 px-3 rounded hover:bg-gray-700"
              onClick={toggleSidebar}
            >
            <div className="flex flex-row gap-2">
              <LuClipboardList className="size-6"/> Category List
            </div>
            </Link>
          </div>
        </details>

        {/* Inventory */}
        <Link
          to="/inventory"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          onClick={toggleSidebar}
        >
          Inventory
        </Link>

        {/* Blogs */}
        <details className="group">
          <summary className="flex justify-between items-center py-2.5 px-4 rounded cursor-pointer hover:bg-gray-700">
            <span>Blogs</span>
            <span className="group-open:rotate-180 transition-transform"><FaAngleDown/></span>
          </summary>
          <div className="ml-4 space-y-1">
            <Link
              to="/add-blog"
              className="block py-2 px-3 rounded hover:bg-gray-700"
              onClick={toggleSidebar}
            >
            <div className="flex flex-row gap-2">
               <IoAdd className="size-6"/> Add Blog
            </div>
            </Link>
            <Link
              to="/blogs"
              className="block py-2 px-3 rounded hover:bg-gray-700"
              onClick={toggleSidebar}
            >
            <div className="flex flex-row gap-2">
               <LuClipboardList className="size-5"/>Blog List
            </div>
            </Link>
          </div>
        </details>

        {/* Orders */}
        <Link
          to="/orders"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          onClick={toggleSidebar}
        >
          Orders
        </Link>

        {/* Users */}
        <Link
          to="/users"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          onClick={toggleSidebar}
        >
          Users
        </Link>
      </nav>
    </aside>
  );
}
