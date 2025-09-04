// src/components/TestimonialSlider.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import test1 from "..//../assets/test1.jpg";
import test2 from "..//../assets/test2.jpg";

const testimonials = [
  {
    text: "Awesome T shirt all over very good product",
    img: test1,
  },
  {
    text: "প্রিন্টিং কোয়ালিটি ও দারুন !! কাপড়ের মানও ভালো এবং কমফোর্টেবল",
    img: test2,
  },
  {
    text: "Khub sundor!",
    img: test1,
  },
  {
    text: "Nice Fitting",
    img: test2,
  },
  {
    text: "Very Nice",
    img: test1,
  },
  {
    text: "Good Quality",
    img: test2,
  },
];

export default function TestimonialSlider() {
  return (
    <section className="bg-white py-16 text-center">
      <h2 className="text-4xl font-bold text-center mb-12 text-black mt-5">
          What <span className="text-yellow-500">People</span> Say About Us
      </h2>
      <div className="max-w-6xl mx-auto px-6">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          spaceBetween={20}
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: { slidesPerView: 1 }, // mobile
            640: { slidesPerView: 2 }, // tablet
            1024: { slidesPerView: 3 }, // desktop
          }}
          className="pb-10"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-yellow-400 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-between text-black min-h-[220px] ">
                <img
                  src={item.img}
                  alt={item.text}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <p className="text-sm font-semibold text-center leading-relaxed ">
                  {item.text}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
