// src/NewArrival.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import newarrival1 from "../../assets/newarrival1.jpg";
import newarrival2 from "../../assets/newarrival2.jpg";
import newarrival3 from "../../assets/newarrival3.jpg";
import newarrival4 from "../../assets/newarrival4.jpg";
import newarrival5 from "../../assets/newarrival5.jpg";

export default function NewArrival() {
  const products = [
    { id: 1, img: newarrival1, name: "Ami ek jajabor", oldPrice: "599.00", newPrice: "499.00" },
    { id: 2, img: newarrival2, name: "Joto Pai Beer Khai", oldPrice: "599.00", newPrice: "499.00" },
    { id: 3, img: newarrival3, name: "Tumio hete dekho kolkata", oldPrice: "599.00", newPrice: "499.00" },
    { id: 4, img: newarrival4, name: "Rabindranath Tagor", oldPrice: "599.00", newPrice: "499.00" },
    { id: 5, img: newarrival5, name: "Katata Funny", oldPrice: "599.00", newPrice: "499.00" },
  ];

  return (
    <div className="py-10 z-50 bg-yellow-400">
      <div className="container mx-auto max-w-6xl  px-6 rounded-2xl">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 text-center">
          New Arrival →
        </h2>

        {/* Swiper Slider */}
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          modules={[Autoplay]}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="mySwiper"
        >
          {products.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="flex flex-col items-center bg-white rounded-2xl shadow-md p-4 min-h-[320px]">
                {/* Fixed image container */}
                <div className="h-64 w-full flex items-center justify-center mb-3">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="max-h-64 object-contain transition-transform duration-300 hover:scale-105 rounded-xl"
                  />
                </div>

                {/* Product Info */}
                <h3 className="text-lg font-medium text-center">{item.name}</h3>
                <div className="flex gap-2 items-center justify-center">
                  <span className="line-through text-gray-600">₹{item.oldPrice}</span>
                  <span className="font-bold text-xl text-black">₹{item.newPrice}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
