import { useState } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import { GoSearch } from "react-icons/go";
import { FaCartShopping } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io"; // Close icon
import phajilLogo from "../assets/phajilLogo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-30 bg-white shadow-md">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left - Hamburger */}
          <HiOutlineBars3
            className="text-3xl cursor-pointer"
            onClick={() => setIsOpen(true)}
          />

          {/* Logo */}
          <img
            src={phajilLogo}
            alt="phajilLogo"
            className="h-12 w-auto cursor-pointer"
          />

          {/* Right - Icons */}
          <div className="flex space-x-4 items-center">
            <GoSearch className="size-7 cursor-pointer" />
            <FaCartShopping className="size-7 cursor-pointer" />
            <FcLike className="size-7 cursor-pointer " />
            <RiAccountCircleFill className="size-7 cursor-pointer" />
          </div>
        </div>
      </nav>

      {/* Overlay with Blur */}
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
        <div className="flex items-center justify-between px-6 py-5 border-b ">
          <img src={phajilLogo} alt="logo" className="h-10" />
          <IoMdClose
            className="text-2xl cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>

        {/* Menu */}
        <ul className="flex flex-col space-y-4 mt-6 px-6 text-lg font-medium">
          <li className="hover:text-red-500 cursor-pointer">FELUDA</li>
          <li className="hover:text-red-500 cursor-pointer">NOSTALGIC KOLKATA</li>
          <li className="hover:text-red-500 cursor-pointer">UNISEX</li>
          <li className="hover:text-red-500 cursor-pointer">WOMEN</li>
          <li className="hover:text-red-500 cursor-pointer">ORDER TRACKING</li>
          <li className="hover:text-red-500 cursor-pointer">ABOUT US</li>
          <li className="hover:text-red-500 cursor-pointer">CONTACT US</li>

        </ul>

        {/* Bottom Login/Register */}
        <div className="absolute bottom-6 left-6 flex items-center gap-2 cursor-pointer">
          <RiAccountCircleFill className="text-2xl" />
          <span className="text-lg font-medium">Login / Register</span>
        </div>
      </div>
    </>
  );
}
