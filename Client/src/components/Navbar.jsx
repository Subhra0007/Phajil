import { useState } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import { GoSearch } from "react-icons/go";
import { BsCart3 } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io"; // Close icon
import { IoSyncSharp } from "react-icons/io5";
import { Link } from "react-router-dom";  
import phajilLogo from "../assets/phajilLogo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-30 bg-white shadow-md">
        <div className="flex items-center justify-between px-6 py-6">
          {/* Left - Hamburger */}
          <div className="flex gap-3 items-center">
            <HiOutlineBars3
              className="text-4xl cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
             <GoSearch className="size-7 cursor-pointer" />
          </div>

          <Link to="/">
            <img
              src={phajilLogo}
              alt="phajilLogo"
              className="h-12 w-auto cursor-pointer absolute top-3 left-1/2 -translate-x-1/2"
            />
          </Link>

          {/* Right - Account only for mobile/tab */}
          <div className="flex items-center gap-3">
            <RiAccountCircleLine className="size-8 cursor-pointer lg:hidden" />

            <div className="hidden lg:flex space-x-3 items-center">
             
              <IoSyncSharp className="size-7 cursor-pointer" />
              <BsCart3 className="size-7 cursor-pointer" />
              <FcLike className="size-7 cursor-pointer" />
              <RiAccountCircleLine className="size-7 cursor-pointer" />
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-xs z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        ></div>
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
          <IoMdClose
            className="text-2xl cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>

        {/* Sidebar Icons for mobile/tablet */}
        <div className="flex gap-6 px-6 mt-4 lg:hidden ">
          {/* <GoSearch className="size-6 cursor-pointer" /> */}
          <IoSyncSharp className="size-6 cursor-pointer" />
          <BsCart3 className="size-6 cursor-pointer" />
          <FcLike className="size-6 cursor-pointer" />
        </div>

        {/* Menu */}
        <ul className="flex flex-col space-y-4 mt-6 px-6 text-lg font-medium">
          <li className="hover:text-red-500 cursor-pointer">FELUDA</li>
          <li className="hover:text-red-500 cursor-pointer">NOSTALGIC KOLKATA</li>
          <li className="hover:text-red-500 cursor-pointer">UNISEX</li>
          <li className="hover:text-red-500 cursor-pointer">WOMEN</li>
          <li className="hover:text-red-500 cursor-pointer">ORDER TRACKING</li>
          <li>
            <Link 
              to="/about" 
              className="hover:text-red-500 cursor-pointer"
              onClick={() => setIsOpen(false)}  // close drawer after click
            >
              ABOUT US
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className="hover:text-red-500 cursor-pointer"
              onClick={() => setIsOpen(false)}  // close drawer after click
            >
              CONTACT US
            </Link>
          </li>
        </ul>

        {/* Bottom Login/Register */}
        <div className="absolute bottom-6 left-6 lg:flex items-center gap-2 cursor-pointer ">
          <RiAccountCircleLine className="text-2xl" />
          <span className="text-lg font-medium">Login / Register</span>
        </div>
      </div>
    </>
  );
}
