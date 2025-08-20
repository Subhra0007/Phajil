import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import newarrival1 from "..//../assets/newarrival1.jpg";
import newarrival2 from "..//../assets/newarrival2.jpg";
import newarrival3 from "..//../assets/newarrival3.jpg";
import newarrival4 from "..//../assets/newarrival4.jpg";
import newarrival5 from "..//../assets/newarrival5.jpg";
export default function NewArrival() {
  const products = [
    {
      id: 1,
      img: newarrival1,
      name: "Ami ek jajabor",
      oldPrice: "599.00",
      newPrice: "499.00",
    },
    {
      id: 2,
      img: newarrival2,
      name: "Joto Pai Beer Khai",
      oldPrice: "599.00",
      newPrice: "499.00",
    },
    {
      id: 3,
      img: newarrival3,
      name: "Tumio hete dekho kolkata",
      oldPrice: "599.00",
      newPrice: "499.00",
    },
    {
      id: 4,
      img: newarrival4,
      name: "Rabindranath Tagor",
      oldPrice: "599.00",
      newPrice: "499.00",
    },
    {
      id: 5,
      img: newarrival5,
      name: "Katata Funny",
      oldPrice: "599.00",
      newPrice: "499.00",
    },
  ];

  return (
    <div className="bg-yellow-400 py-10 z-50 ">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 text-center">
          New Arrival
        </h2>

        {/* Swiper Slider */}
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          navigation={true}
          autoplay={{
            delay: 2500, // 2.5 seconds
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Navigation, Autoplay]}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="mySwiper"
        >
          {products.map((item) => (
            <SwiperSlide key={item.id}>
              <div className=" flex flex-col items-center ">
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-64 object-contain mb-3 transition-transform duration-300 hover:scale-105 rounded-2xl"
                />
                <h3 className="text-lg font-medium">{item.name}</h3>
                <div className="flex gap-2 items-center">
                  <span className="line-through text-gray-600">
                    ₹{item.oldPrice}
                  </span>
                  <span className="font-bold text-xl text-black">
                    ₹{item.newPrice}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
