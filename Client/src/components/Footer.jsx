import { FaFacebookF, FaInstagram, FaWhatsapp, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import phajilLogo from "../assets/phajilLogo.png";
const Footer = () => {
  return (
    <footer className="bg-[#1e1e1e] text-white py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-around gap-10 flex-wrap">
        {/* Logo & About */}
        <div className="w-full md:w-[250px] text-center md:text-left">
         <img
            src={phajilLogo}
            alt="phajilLogo"
            className="h-12 w-auto cursor-pointer mx-auto lg:mx-0"
         />
         
          <p className="mt-2 text-gray-300">
            PHAJIL is a Bengali graphic T-shirt brand. Where phajils home grown
            some awesome tshirt designs which features our language and
            tradition
          </p>
          <div className="flex justify-center md:justify-start space-x-4 mt-4 text-yellow-400 text-xl">
            <FaFacebookF className="cursor-pointer hover:scale-110 transition" />
            <FaInstagram className="cursor-pointer hover:scale-110 transition" />
            <FaWhatsapp className="cursor-pointer hover:scale-110 transition" />
          </div>
        </div>

        {/* Useful Links */}
        <div className="w-full sm:w-[180px] text-center md:text-left">
          <h3 className="text-lg font-semibold mb-3">Useful Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Shipping Policy</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms And Conditions</a></li>
            <li><a href="#">Exchange and Returns Policy</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        {/* Online Shopping */}
        <div className="w-full sm:w-[180px] text-center md:text-left">
          <h3 className="text-lg font-semibold mb-3">Online Shopping</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#">Feluda</a></li>
            <li><a href="#">Unisex</a></li>
            <li><a href="#">Women</a></li>
            <li><a href="#">Order Tracking</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="w-full sm:w-[220px] text-center md:text-left">
          <h3 className="text-lg font-semibold mb-3">Get In Touch</h3>
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
      <div className="mt-10 text-center text-gray-400 text-sm">
        © 2023 Phajil. All Right reserved!
      </div>
    </footer>
  );
};

export default Footer;
