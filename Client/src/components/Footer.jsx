import { FaFacebookF, FaInstagram, FaWhatsapp, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import phajilLogo from "../assets/phajilLogo.png";

const Footer = () => {
  return (
    <footer className="bg-[#1e1e1e] text-white py-10 px-6 border-t border-white/20">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-around gap-10 flex-wrap">
        
        {/* Logo & About */}
        <div className="w-full md:w-[250px] text-center lg:text-left">
          <img
            src={phajilLogo}
            alt="phajilLogo"
            className="h-12 w-auto cursor-pointer mx-auto lg:mx-0"
          />
          <p className="mt-2 text-gray-300">
            PHAJIL is a Bengali graphic T-shirt brand. Where phajils home grown
            some awesome t-shirt designs which feature our language and
            tradition.
          </p>
          <div className="flex justify-center md:justify-start space-x-4 mt-4 text-yellow-400 text-xl">
            <FaFacebookF className="cursor-pointer hover:scale-110 transition" />
            <FaInstagram className="cursor-pointer hover:scale-110 transition" />
            <FaWhatsapp className="cursor-pointer hover:scale-110 transition" />
          </div>
        </div>

        {/* Useful Links */}
        <div className="w-full md:w-[180px] text-center lg:text-left">
          <h3 className="text-lg font-semibold mb-3 text-yellow-400">Useful Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
            <li><Link to="/shipping-policy" className="hover:text-white transition">Shipping Policy</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions" className="hover:text-white transition">Terms & Conditions</Link></li>
            <li><Link to="/exchange-returns" className="hover:text-white transition">Exchange & Returns Policy</Link></li>
            <li><Link to="/blog" className="hover:text-white transition">Blog</Link></li>
          </ul>
        </div>

        {/* Online Shopping */}
        <div className="w-full md:w-[180px] text-center lg:text-left">
          <h3 className="text-lg font-semibold mb-3 text-yellow-400">Online Shopping</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="/feluda" className="hover:text-white transition">Feluda</Link></li>
            <li><Link to="/unisex" className="hover:text-white transition">Unisex</Link></li>
            <li><Link to="/women" className="hover:text-white transition">Women</Link></li>
            <li><Link to="/order-tracking" className="hover:text-white transition">Order Tracking</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="w-full md:w-[220px] text-center lg:text-left">
          <h3 className="text-lg font-semibold mb-3 text-yellow-400">Get In Touch</h3>
          <p className="text-gray-300">
            Nagarukhra, Nadia, <br />
            West Bengal <br />
            Pin-741257
          </p>
          <div className="mt-4 space-y-2 text-yellow-400">
            <p className="flex justify-center md:justify-start items-center gap-2">
              <FaPhoneAlt className="text-sm" />
              <span className="text-gray-300">8348296083</span>
            </p>
            <p className="flex justify-center md:justify-start items-center gap-2">
              <FaEnvelope className="text-sm" />
              <span className="text-gray-300">Support@phajil.com</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div className="mt-10 text-center text-gray-400 text-sm border-t border-white/10 pt-4">
        © 2023 Phajil. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
