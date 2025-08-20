import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <section className=" py-16 mt-22  bg-gray-100">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6">
        
        {/* Left Form Section */}
        <div className="bg-gray-100 p-6 rounded-2xl  shadow-2xl border-b-neutral-300 border-y-4 border-yellow-400">
          <h2 className="text-3xl font-bold mb-4 ">Leave a Message</h2>
          <p className="text-gray-800 mb-8">
            If you have any questions, please feel free to get in touch with us.  
            We will reply as soon as possible. Thank you!
          </p>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name *"
                className="w-full p-3 rounded-lg bg-white/60 border border-white/80 focus:outline-none focus:border-yellow-400"
              />
              <input
                type="email"
                placeholder="Your Email *"
                className="w-full p-3 rounded-lg bg-white/60 border border-white/80 focus:outline-none focus:border-yellow-400"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full p-3 rounded-lg bg-white/60 border border-white/80 focus:outline-none focus:border-yellow-400"
            />
            <textarea
              rows="6"
              placeholder="Your Message"
              className="w-full p-3 rounded-lg bg-white/60 border border-white/80 focus:outline-none focus:border-yellow-400"
            ></textarea>
            <button
              type="submit"
              className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-500 transition"
            >
              Send
            </button>
          </form>
        </div>

        {/* Right Info Section */}
        <div className="bg-gray-100 p-6 rounded-2xl  shadow-2xl border-b-neutral-300 border-y-4 border-yellow-400">
          <h2 className="text-2xl font-bold mb-6">Our Store</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-yellow-400 text-xl mt-1" />
              <p>Haringhata, Nadia, West Bengal, 741257</p>
            </div>
            <div className="flex items-start gap-3">
              <FaEnvelope className="text-yellow-400 text-xl mt-1" />
              <p>
                Please email us:{" "}
                <a
                  href="mailto:support@phajil.com"
                  className="text-red-500 hover:underline"
                >
                  support@phajil.com
                </a>
              </p>
            </div>
          </div>

          {/* <div className="mt-8">
            <h3 className="text-lg font-semibold">Business Hours</h3>
            <p className="text-gray-800 mt-2">Mon - Sat: 9am - 7pm</p>
            <p className="text-gray-800">Sunday: Closed</p>
          </div> */}
        </div>
      </div>
    </section>
  );
}
