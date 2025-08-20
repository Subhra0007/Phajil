import { useState, useRef, createContext, useContext } from "react";
import { FaHeart, FaEye, FaSync } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { IoSyncSharp } from "react-icons/io5";
import newarrival1 from "../../assets/newarrival1.jpg";
import newarrival2 from "../../assets/newarrival2.jpg";
import newarrival3 from "../../assets/newarrival3.jpg";
import newarrival4 from "../../assets/newarrival4.jpg";
import newarrival5 from "../../assets/newarrival5.jpg";

// Context to share swiper instance
const SwiperContext = createContext(null);

export default function Trending() {
  const swiperRef = useRef(null);

  return (
    <section className="bg-yellow-400 py-10">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl md:text-3xl font-black text-black mb-6 text-center">
          Trending →
        </h2>
        <SwiperContext.Provider value={swiperRef}>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            loop={true}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {/* Slide 1 */}
            <SwiperSlide>
              <ProductCard
                img={newarrival1}
                badge="SALE"
                title="Minimal Earth T-shirt"
                review="★★★★★"
                price="₹499.00"
                oldPrice="₹599.00"
              />
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide>
              <ProductCard
                img={newarrival2}
                badge="SALE"
                title="Cosmic Vibe Tee"
                review="★★★★★"
                price="₹499.00"
                oldPrice="₹599.00"
              />
            </SwiperSlide>

            {/* Slide 3 */}
            <SwiperSlide>
              <ProductCard
                img={newarrival3}
                badge="-17%"
                title="Ocean Depth T-shirt"
                review="★★★★★"
                price="₹499.00"
                oldPrice="₹599.00"
              />
            </SwiperSlide>

            {/* Slide 4 */}
            <SwiperSlide>
              <ProductCard
                img={newarrival4}
                badge="SALE"
                title="Retro Wave Tee"
                review="★★★★★"
                price="₹499.00"
                oldPrice="₹599.00"
              />
            </SwiperSlide>

            {/* Slide 5 */}
            <SwiperSlide>
              <ProductCard
                img={newarrival1}
                badge="SALE"
                title="Vintage Sunset Shirt"
                review="★★★★★"
                price="₹499.00"
                oldPrice="₹599.00"
              />
            </SwiperSlide>

            {/* Slide 6 */}
            <SwiperSlide>
              <ProductCard
                img={newarrival5}
                badge="-15%"
                title="Abstract Art Tee"
                review="★★★★★"
                price="₹499.00"
                oldPrice="₹599.00"
              />
            </SwiperSlide>
          </Swiper>
        </SwiperContext.Provider>
      </div>
    </section>
  );
}

function ProductCard({ img, badge, title, review, price, oldPrice }) {
  const [showOptions, setShowOptions] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const swiperRef = useContext(SwiperContext);

  const colors = [
    { name: "Black", code: "bg-black" },
    { name: "Blue", code: "bg-blue-900" },
    { name: "Red", code: "bg-red-600" },
  ];

  const sizes = ["M", "L", "XL", "XXL", "XXXL"];

  const handleOpenOptions = () => {
    setShowOptions(true);
    if (swiperRef.current) swiperRef.current.autoplay.stop();
  };

  const handleCloseOptions = () => {
    setShowOptions(false);
    if (swiperRef.current) swiperRef.current.autoplay.start();
  };

  return (
    <div className="group relative bg-gray-100 shadow-md rounded-md overflow-hidden">
      {/* Badge */}
      <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
        {badge}
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
          <IoSyncSharp />
        </button>
      </div>

      {/* Product Image */}
      <img
        src={img}
        alt={title}
        className="w-full h-80 object-contain transition-transform duration-300 group-hover:scale-105"
      />

      {/* Product Info */}
      <div className="p-4 relative z-0">
        <h3 className="text-base font-medium">{title}</h3>
        <div className=" gap-1 mt-1 text-yellow-500 text-lg">{review}</div>
        <div className="flex gap-2 items-center">
          <span className="line-through text-gray-500">{oldPrice}</span>
          <span className="text-black font-bold text-lg">{price}</span>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 w-full transition-all duration-300 z-20">
        {!showOptions ? (
          <button
            onClick={handleOpenOptions}
            className="w-full bg-red-600 text-white text-sm font-semibold py-3 
                       opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 
                       transition-all duration-300"
          >
            Add to basket
          </button>
        ) : (
          <div className="bg-white p-4 relative">
            {/* Close button */}
            <button
              onClick={handleCloseOptions}
              className="absolute top-2 right-2 text-lg font-bold text-gray-600 hover:text-red-600"
            >
              ×
            </button>

            {/* Color */}
            <div className="mb-3">
              <p className="font-medium text-sm">Color</p>
              <div className="flex gap-3 mt-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-6 h-6 rounded-full border-2 ${color.code} ${
                      selectedColor === color.name ? "ring-2 ring-black" : ""
                    }`}
                  ></button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-3">
              <p className="font-medium text-sm">Size</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1 border rounded text-sm ${
                      selectedSize === s
                        ? "bg-black text-white border-black"
                        : "bg-white text-black"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3 mb-3">
              <button
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                className="px-3 py-1 border rounded"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 border rounded"
              >
                +
              </button>
            </div>

            {/* Select Options */}
            <button className="bg-red-600 w-full text-white px-6 py-2 rounded font-semibold text-sm">
              Select Options
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
