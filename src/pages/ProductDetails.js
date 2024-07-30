import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { addToCart } from "../slices/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => setProduct(response.data));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto mt-10">
      <div className="bg-white p-5 rounded shadow">
        <h1 className="text-2xl font-bold mb-5">{product.title}</h1>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-96 mb-5 object-contain"
        />
        <p className="text-lg mb-5">{product.description}</p>
        <p className="text-xl font-semibold mb-5">{product.price}</p>
        <button
          onClick={() => dispatch(addToCart(product))}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
