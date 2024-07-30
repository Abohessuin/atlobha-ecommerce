import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  // Group items by id and count quantities
  const groupedItems = cartItems.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = { ...item, quantity: 0 };
    }
    acc[item.id].quantity += 1;
    return acc;
  }, {});

  const groupedItemsArray = Object.values(groupedItems);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Your Cart</h1>
      <ul className="space-y-5">
        {groupedItemsArray.map((product) => (
          <li
            key={product.id}
            className="bg-white p-5 rounded shadow flex justify-between items-center h-44"
          >
            <div className="flex items-center h-full">
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-24 object-contain"
              />
              <div className="mx-3 flex flex-col justify-evenly h-[80%]">
                <h2 className="text-lg font-bold">{product.title}</h2>
                <p className="text-sm">{product.description}</p>
                <p className="text-lg font-semibold">{product.price}</p>
                <p className="text-lg font-semibold">
                  Quantity: {product.quantity}
                </p>
              </div>
            </div>
            <button
              onClick={() => dispatch(removeFromCart(product.id))}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
