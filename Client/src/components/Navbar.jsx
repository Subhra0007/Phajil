import { useEffect, useState } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import { GoSearch } from "react-icons/go";
import { BsCart3 } from "react-icons/bs";
import { GoHeart } from "react-icons/go";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { IoSyncSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import phajilLogo from "../assets/phajilLogo.png";

function getFirstNameFromLocal() {
  return (
    localStorage.getItem("firstName")?.trim() ||
    localStorage.getItem("username")?.trim() ||
    localStorage.getItem("name")?.trim() ||
    ""
  );
}
function getUserImageFromLocal() {
  return localStorage.getItem("userImage") || "";
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [items] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("token")));
  const [firstName, setFirstName] = useState(getFirstNameFromLocal());
  const [userImage, setUserImage] = useState(getUserImageFromLocal());

  useEffect(() => {
    const syncAuth = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("token")));
      setFirstName(getFirstNameFromLocal());
      setUserImage(getUserImageFromLocal());
    };
    window.addEventListener("storage", syncAuth);
    window.addEventListener("authChange", syncAuth);
    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("authChange", syncAuth);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsLoggedIn(Boolean(localStorage.getItem("token")));
      setFirstName(getFirstNameFromLocal());
      setUserImage(getUserImageFromLocal());
    }
  }, [isOpen]);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-30 bg-white shadow-md">
        <div className="flex items-center justify-between px-6 py-6">
          {/* Left - Hamburger */}
          <div className="flex gap-3 items-center">
            <HiOutlineBars3 className="text-4xl cursor-pointer" onClick={() => setIsOpen(true)} />
            <GoSearch className="size-7 cursor-pointer" />
          </div>

          <Link to="/">
            <img
              src={phajilLogo}
              alt="phajilLogo"
              className="h-12 w-auto cursor-pointer absolute top-3 left-1/2 -translate-x-1/2"
            />
          </Link>

          {/* Right - Desktop icons */}
          <div className="flex items-center gap-3">
            <RiAccountCircleLine className="size-8 cursor-pointer lg:hidden" />

            <div className="hidden lg:flex space-x-3 items-center">
              <IoSyncSharp className="size-7 cursor-pointer" />

              {/* Cart */}
              <Link to="/cart" className="relative">
                <BsCart3 className="size-7 cursor-pointer hover:text-red-400 hoverEffect" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
                  {items?.length ? items.length : 0}
                </span>
              </Link>

              {/* Wishlist */}
              <Link to="/wishlist" className="relative">
                <GoHeart className="size-7 cursor-pointer hover:text-red-400 hoverEffect" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
                  {items?.length ? items.length : 0}
                </span>
              </Link>

              {/* Account */}
              <div className="relative group">
                {isLoggedIn ? (
                  <div>
                    {/* Avatar (image if exists, else letter) */}
                    <Link to="/dashboard/profile" className="flex items-center justify-center">
                      {userImage ? (
                        <img
                          src={userImage}
                          alt="avatar"
                          className="w-9 h-9 rounded-full object-cover shadow-md border-1 border-gray-800"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold cursor-pointer shadow-md">
                          {firstName ? firstName[0].toUpperCase() : "U"}
                        </div>
                      )}
                    </Link>

                    {/* Hover Tooltip */}
                    <div className="absolute right-0 mt-2 px-4 py-2 bg-gradient-to-br from-[#0b223f] to-[#06263f] border border-white/10 rounded-xl shadow-lg text-sm font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transform transition-all duration-200">
                      👋 Hey! {firstName || "User"}
                    </div>
                  </div>
                ) : (
                  <Link to="/login">
                    <RiAccountCircleLine className="size-7 cursor-pointer hover:text-red-400 hoverEffect" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-xs z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <img src={phajilLogo} alt="logo" className="h-10" />
          <IoMdClose className="text-2xl cursor-pointer" onClick={() => setIsOpen(false)} />
        </div>

        {/* Sidebar Menu */}
        <ul className="flex flex-col space-y-4 mt-6 px-6 text-lg font-medium">
          {/* <li className="hover:text-red-500 cursor-pointer">FELUDA</li>
          <li className="hover:text-red-500 cursor-pointer">NOSTALGIC KOLKATA</li>
          <li className="hover:text-red-500 cursor-pointer">UNISEX</li>
          <li className="hover:text-red-500 cursor-pointer">WOMEN</li>
          <li className="hover:text-red-500 cursor-pointer">ORDER TRACKING</li> */}
           <li>
            <Link to="/feluda" className="hover:text-red-500 cursor-pointer" onClick={() => setIsOpen(false)}>
             FELUDA
            </Link>
          </li>
           <li>
            <Link to="/kolkata" className="hover:text-red-500 cursor-pointer" onClick={() => setIsOpen(false)}>
              NOSTALGIC KOLKATA
            </Link>
          </li>
           <li>
            <Link to="/unisex" className="hover:text-red-500 cursor-pointer" onClick={() => setIsOpen(false)}>
              UNISEX
            </Link>
          </li>
           <li>
            <Link to="/girls" className="hover:text-red-500 cursor-pointer" onClick={() => setIsOpen(false)}>
              WOMEN
            </Link>
          </li>
           <li>
            <Link to="" className="hover:text-red-500 cursor-pointer" onClick={() => setIsOpen(false)}>
             ORDER TRACKING
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-red-500 cursor-pointer" onClick={() => setIsOpen(false)}>
              ABOUT US
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-red-500 cursor-pointer" onClick={() => setIsOpen(false)}>
              CONTACT US
            </Link>
          </li>
        </ul>

        {/* Bottom Section */}
        <div className="absolute bottom-6 left-6 flex flex-col gap-2 cursor-pointer">
          {isLoggedIn ? (
            <Link to="/dashboard/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
              {userImage ? (
                <img
                  src={userImage}
                  alt="avatar"
                  className="w-9 h-9 rounded-full object-cover shadow-md border-1 border-gray-800"
                />
              ) : (
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold shadow-md">
                  {firstName ? firstName[0].toUpperCase() : "U"}
                </div>
              )}
              <span className="text-lg font-medium">👋 Hey! {firstName && firstName !== "" ? firstName : "User"}</span>
            </Link>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <div className="flex items-center gap-2">
                <RiAccountCircleLine className="text-2xl" />
                <span className="text-lg font-medium">Login / Register</span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
