import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaHeart, FaEye } from "react-icons/fa";
import { IoSyncSharp } from "react-icons/io5";
import API from "../components/axios";

export default function CategoryProducts({ category: propCategory }) {
  const { category: routeCategory } = useParams();
  const category = propCategory || routeCategory;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await API.get(`/public/products/category/${category}`);
        if (data.success) {
          setProducts(data.data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    if (category) fetchProducts();
  }, [category]);

  if (loading) return <p className="text-center py-10">Loading {category}...</p>;

  return (
    <div className="bg-yellow-400">
      <section className="max-w-6xl mx-auto px-6 py-25">
        <h2 className="text-2xl font-bold capitalize mb-6">{category} Collection</h2>
        {products.length === 0 ? (
          <p className="text-center">No products found in {category}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {products.map((p) => {
              const defaultVariant =
                p.variants?.find((v) => v.isDefault) || p.variants?.[0];

              return (
                <div
                  key={p._id}
                  className="group relative bg-gray-100 shadow-md rounded-md overflow-hidden"
                >
                  {/* Hover Icons */}
                  <div
                    className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-5 
                              group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-10"
                  >
                    <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100 cursor-pointer">
                      <FaHeart />
                    </button>
                    <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100 cursor-pointer">
                      <FaEye />
                    </button>
                    <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100 cursor-pointer">
                      <IoSyncSharp />
                    </button>
                  </div>

                  {/* Product Image */}
                  <img
                    src={defaultVariant?.images?.[0] || p.images?.[0]}
                    alt={p.title}
                    className="w-full h-56 object-contain transition-transform duration-300 group-hover:scale-105 p-3 rounded-2xl"
                  />

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{p.title}</h3>
                    <p className="text-gray-600">
                      Color: {defaultVariant?.color || "N/A"}
                    </p>
                    <p className="text-gray-600">
                      ₹{p.price}{" "}
                      {p.originalPrice && (
                        <span className="line-through text-sm text-gray-400 ml-2">
                          ₹{p.originalPrice}
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Add to Basket (hover reveal) */}
                  <div className="absolute bottom-0 left-0 w-full">
                    <button
                      className="w-full bg-red-600 text-white text-sm font-semibold py-3 
                                 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 
                                 transition-all duration-300 cursor-pointer"
                    >
                      Add to basket
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
