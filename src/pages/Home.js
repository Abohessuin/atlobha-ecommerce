import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../slices/productsSlice";
import { addToCart } from "../slices/cartSlice";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const productsStatus = useSelector((state) => state.products.status);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (productsStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productsStatus, dispatch]);

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.price.toString().includes(searchTerm)
  );

  return (
    <div className="container mx-auto mt-10 px-4">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-5 p-3 border border-gray-300 rounded w-full shadow-sm"
      />
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <li
            key={product.id}
            className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
          >
            <Link
              to={`/product/${product.id}`}
              className="flex flex-col items-center"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain rounded-lg mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {product.title}
              </h2>

              <p className="text-lg font-semibold text-blue-500 mb-4">
                ${product.price}
              </p>
            </Link>
            <button
              onClick={() => dispatch(addToCart(product))}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
