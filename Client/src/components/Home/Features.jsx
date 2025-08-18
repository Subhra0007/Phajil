import { FaHistory } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { PiTreePalmDuotone } from "react-icons/pi";

export default function Features() {
  return (
    <div className="bg-gray-100  py-10">
    <div className="flex flex-wrap gap-6 justify-center items-center mt-6 max-w-6xl mx-auto px-6 ">
      {/* Feature 1 */}
      <div className="flex items-center gap-6 bg-green-600 text-white px-6 py-4 rounded-lg shadow-md 
                      w-full sm:w-[300px] md:w-[350px] lg:w-[350px] justify-center">
        <div className="text-white">
          <PiTreePalmDuotone size={40} className="sm:size-[50px]" />
        </div>
        <div className="leading-snug text-lg sm:text-xl md:text-2xl font-medium">
          Premium <br /> Quality Fabric
        </div>
      </div>

      {/* Feature 2 */}
      <div className="flex items-center gap-6 bg-green-600 text-white px-6 py-4 rounded-lg shadow-md 
                      w-full sm:w-[300px] md:w-[350px] lg:w-[350px] justify-center">
        <div className="text-white">
          <FaTruckFast size={40} className="sm:size-[50px]" />
        </div>
        <div className="leading-snug text-lg sm:text-xl md:text-2xl font-medium">
          <span className="font-bold">Free Delivery</span> <br /> within a Week
        </div>
      </div>

      {/* Feature 3 */}
      <div className="flex items-center gap-6 bg-green-600 text-white px-6 py-4 rounded-lg shadow-md 
                      w-full sm:w-[300px] md:w-[350px] lg:w-[350px] justify-center">
        <div className="text-white">
          <FaHistory size={40} className="sm:size-[50px]" />
        </div>
        <div className="leading-snug text-lg sm:text-xl md:text-2xl font-medium">
          <span className="font-bold">7 Days</span> Easy <br/> return
        </div>
      </div>
    </div>
    </div>
  );
}
