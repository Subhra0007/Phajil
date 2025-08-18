import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import hero1 from "..//../assets/hero1.png"; // Krishna T-shirt
import hero2 from "..//../assets/hero2.png"; // Independence T-shirt

export default function Hero() {
  return (
    <section className="w-full mt-20">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-[250px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <img
            src={hero1}
            alt="hero1"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <img
            src={hero2}
            alt="hero2"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
