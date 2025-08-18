import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
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
    text: "Unmesh Ganguly",
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

const TestimonialSection = () => {
  return (
    <section className="py-10 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 3000 }}
          loop={true}
        
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center text-center relative">
                {/* Speech Bubble */}
                <div className="bg-yellow-400 text-black text-base font-medium px-6 py-4 rounded-3xl relative w-full min-h-[120px] flex items-center justify-center">
                  <p>{testimonial.text}</p>
                  <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-400 rotate-45"></div>
                </div>

                {/* Avatar */}
                <img
                  src={testimonial.img}
                  alt="testimonial"
                  className="w-16 h-16 rounded-full mt-6 border-4 border-yellow-400 object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;
