import Feluda from "../../assets/Feluda.webp";
import Nostalgickolkata from "../../assets/Nostalgickolkata.webp";
import unisex from "../../assets/unisex.webp";
import girl from "../../assets/girl.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function CategorySection() {
  const categories = [
    { name: "feluda", img: Feluda },
    { name: "kolkata", img: Nostalgickolkata },
    { name: "unisex", img: unisex },
    { name: "girls", img: girl },
  ];

  return (
    <section className=" bg-gray-100  py-10">
      <div className=" max-w-7xl mx-auto px-6 cursor-pointer">
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
            <div className="relative flex flex-col items-center transition-transform duration-300 hover:scale-105">
              
              {/* Circle Image */}
              <div className="w-60 h-60 sm:w-70 sm:h-70 rounded-full overflow-hidden shadow-lg border border-gray-200 bg-white flex items-center justify-center">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Pill Label (outside the circle, centered) */}
              <span
                className="mt-4 px-6 py-1.5 
                             bg-gradient-to-r from-pink-400 to-pink-600
                             text-white font-semibold text-sm
                             rounded-full shadow-md"
              >
                {cat.name}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
    </section>
  );
}
