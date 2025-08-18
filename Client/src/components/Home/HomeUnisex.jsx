import { FaHeart, FaEye, FaSync } from "react-icons/fa";
import newarrival1 from "..//../assets/newarrival1.jpg";
import newarrival2 from "..//../assets/newarrival2.jpg";
import newarrival3 from "..//../assets/newarrival3.jpg";
import newarrival4 from "..//../assets/newarrival4.jpg";
import newarrival5 from "..//../assets/newarrival5.jpg";

export default function HomeUnisex() {
  return (
    <section className="bg-gray-100 py-10">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl md:text-3xl font-black text-black mb-6 text-center">
          Unisex→
        </h2>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div className="group relative bg-white shadow-md rounded-md overflow-hidden">
            {/* Badge */}
            <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded  z-10">
              SALE
            </span>

            {/* Hover Icons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-5 
                            group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-10">
              <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100">
                <FaHeart />
              </button>
              <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100">
                <FaEye />
              </button>
              <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100">
                <FaSync />
              </button>
            </div>

            {/* Product Image */}
            <img
              src={newarrival1}
              alt="Rabindranath Tagor"
              className="w-full h-80 object-contain transition-transform duration-300 group-hover:scale-105"
            />

            {/* Product Info (ALWAYS visible) */}
            <div className="p-4 relative z-0">
              <h3 className="text-base font-medium">Rabindranath Tagor</h3>
              <div className="flex gap-2 items-center">
                <span className="line-through text-gray-500">₹599.00</span>
                <span className="text-black font-bold text-lg">₹499.00</span>
              </div>
            </div>

            {/* Add to Basket (OVERLAY, doesn’t replace text) */}
            <button
              className="absolute bottom-0 left-0 w-full bg-red-600 text-white text-sm font-semibold py-3 
                         opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 
                         transition-all duration-300 z-20"
            >
              Add to basket
            </button>
          </div>

           
          {/* Card 2 */}
          <div className="group relative bg-white shadow-md rounded-md overflow-hidden">
            {/* Badge */}
            <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded  z-10">
              SALE
            </span>

            {/* Hover Icons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-5 
                            group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-10">
              <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100">
                <FaHeart />
              </button>
              <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100">
                <FaEye />
              </button>
              <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100">
                <FaSync />
              </button>
            </div>

            {/* Product Image */}
            <img
              src={newarrival2}
              alt="Rabindranath Tagor"
              className="w-full h-80 object-contain transition-transform duration-300 group-hover:scale-105"
            />

            {/* Product Info (ALWAYS visible) */}
            <div className="p-4 relative z-0">
              <h3 className="text-base font-medium">Rabindranath Tagor</h3>
              <div className="flex gap-2 items-center">
                <span className="line-through text-gray-500">₹599.00</span>
                <span className="text-black font-bold text-lg">₹499.00</span>
              </div>
            </div>

            {/* Add to Basket (OVERLAY, doesn’t replace text) */}
            <button
              className="absolute bottom-0 left-0 w-full bg-red-600 text-white text-sm font-semibold py-3 
                         opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 
                         transition-all duration-300 z-20"
            >
              Add to basket
            </button>
          </div>

 
          {/* Card 3 */}
          <div className="group relative bg-white shadow-md rounded-md overflow-hidden">
            {/* Badge */}
            <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded  z-10">
             -17%
            </span>

            {/* Hover Icons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-5 
                            group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-10">
              <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100">
                <FaHeart />
              </button>
              <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100">
                <FaEye />
              </button>
              <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100">
                <FaSync />
              </button>
            </div>

            {/* Product Image */}
            <img
              src={newarrival3}
              alt="Rabindranath Tagor"
              className="w-full h-80 object-contain transition-transform duration-300 group-hover:scale-105"
            />

            {/* Product Info (ALWAYS visible) */}
            <div className="p-4 relative z-0">
              <h3 className="text-base font-medium">Rabindranath Tagor</h3>
              <div className="flex gap-2 items-center">
                <span className="line-through text-gray-500">₹599.00</span>
                <span className="text-black font-bold text-lg">₹499.00</span>
              </div>
            </div>

            {/* Add to Basket (OVERLAY, doesn’t replace text) */}
            <button
              className="absolute bottom-0 left-0 w-full bg-red-600 text-white text-sm font-semibold py-3 
                         opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 
                         transition-all duration-300 z-20"
            >
              Add to basket
            </button>
          </div>

 
          {/* Card 4 */}
          <div className="group relative bg-white shadow-md rounded-md overflow-hidden">
            {/* Badge */}
            <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded  z-10">
              SALE
            </span>

            {/* Hover Icons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-5 
                            group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-10">
              <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100">
                <FaHeart />
              </button>
              <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100">
                <FaEye />
              </button>
              <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100">
                <FaSync />
              </button>
            </div>

            {/* Product Image */}
            <img
              src={newarrival4}
              alt="Rabindranath Tagor"
              className="w-full h-80 object-contain transition-transform duration-300 group-hover:scale-105"
            />

            {/* Product Info (ALWAYS visible) */}
            <div className="p-4 relative z-0">
              <h3 className="text-base font-medium">Rabindranath Tagor</h3>
              <div className="flex gap-2 items-center">
                <span className="line-through text-gray-500">₹599.00</span>
                <span className="text-black font-bold text-lg">₹499.00</span>
              </div>
            </div>

            {/* Add to Basket (OVERLAY, doesn’t replace text) */}
            <button
              className="absolute bottom-0 left-0 w-full bg-red-600 text-white text-sm font-semibold py-3 
                         opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 
                         transition-all duration-300 z-20"
            >
              Add to basket
            </button>
          </div>

 
          {/* Card 1 */}
          <div className="group relative bg-white shadow-md rounded-md overflow-hidden">
            {/* Badge */}
            <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded  z-10">
              SALE
            </span>

            {/* Hover Icons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-5 
                            group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-10">
              <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100">
                <FaHeart />
              </button>
              <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100">
                <FaEye />
              </button>
              <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100">
                <FaSync />
              </button>
            </div>

            {/* Product Image */}
            <img
              src={newarrival1}
              alt="Rabindranath Tagor"
              className="w-full h-80 object-contain transition-transform duration-300 group-hover:scale-105"
            />

            {/* Product Info (ALWAYS visible) */}
            <div className="p-4 relative z-0">
              <h3 className="text-base font-medium">Rabindranath Tagor</h3>
              <div className="flex gap-2 items-center">
                <span className="line-through text-gray-500">₹599.00</span>
                <span className="text-black font-bold text-lg">₹499.00</span>
              </div>
            </div>

            {/* Add to Basket (OVERLAY, doesn’t replace text) */}
            <button
              className="absolute bottom-0 left-0 w-full bg-red-600 text-white text-sm font-semibold py-3 
                         opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 
                         transition-all duration-300 z-20"
            >
              Add to basket
            </button>
          </div>

 
          {/* Card 5 */}
          <div className="group relative bg-white shadow-md rounded-md overflow-hidden">
            {/* Badge */}
            <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded  z-10">
              -15%
            </span>

            {/* Hover Icons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-5 
                            group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-10">
              <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100">
                <FaHeart />
              </button>
              <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100">
                <FaEye />
              </button>
              <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100">
                <FaSync />
              </button>
            </div>

            {/* Product Image */}
            <img
              src={newarrival5}
              alt="Rabindranath Tagor"
              className="w-full h-80 object-contain transition-transform duration-300 group-hover:scale-105"
            />

            {/* Product Info (ALWAYS visible) */}
            <div className="p-4 relative z-0">
              <h3 className="text-base font-medium">Rabindranath Tagor</h3>
              <div className="flex gap-2 items-center">
                <span className="line-through text-gray-500">₹599.00</span>
                <span className="text-black font-bold text-lg">₹499.00</span>
              </div>
            </div>

            {/* Add to Basket (OVERLAY, doesn’t replace text) */}
            <button
              className="absolute bottom-0 left-0 w-full bg-red-600 text-white text-sm font-semibold py-3 
                         opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 
                         transition-all duration-300 z-20"
            >
              Add to basket
            </button>
          </div>

          
        </div>
      </div>
    </section>
  );
}
