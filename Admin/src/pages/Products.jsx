import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/admin/products").then((res) => setProducts(res.data.data));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Products</h2>
          <Link to="/add-product" className="bg-green-600 text-white px-3 py-1 rounded">
            + Add Product
          </Link>
        </div>
        <table className="w-full mt-4 border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Title</th>
              <th className="p-2">Price</th>
              <th className="p-2">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-t">
                <td className="p-2">{p.title}</td>
                <td className="p-2">₹{p.price}</td>
                <td className="p-2">{p.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
