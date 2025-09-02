//components/Home/Category.jsx
import Feluda from "../../assets/Feluda.webp";
import Nostalgickolkata from "../../assets/Nostalgickolkata.webp";
import unisex from "../../assets/unisex.webp";
import girl from "../../assets/girl.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router-dom";   // ✅ import Link

export default function CategorySection() {
  const categories = [
    { name: "feluda", img: Feluda, path: "/feluda" },
    { name: "kolkata", img: Nostalgickolkata, path: "/kolkata" },
    { name: "unisex", img: unisex, path: "/unisex" },
    { name: "girls", img: girl, path: "/girls" },
  ];

  return (
    <section className="bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={20}
          slidesPerView={3}
          className="flex items-center"
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {categories.map((cat, i) => (
            <SwiperSlide key={i} className="flex justify-center">
              <Link 
                to={cat.path} 
                className="relative flex flex-col items-center transition-transform duration-300 hover:scale-90"
              >
                {/* Circle Image */}
                <div className="w-60 h-60 sm:w-70 sm:h-70 rounded-full overflow-hidden shadow-2xl border border-gray-800 bg-black flex items-center justify-center">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                {/* Pill Label */}
                <span
                  className="mt-4 px-6 py-1.5 
                               bg-gradient-to-r from-pink-400 to-pink-600
                               text-white font-semibold text-sm
                               rounded-full shadow-md"
                >
                  {cat.name}
                </span>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
