import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cartItemsCount = useSelector((state) => state.cart.items.length);

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center text-white">
      <Link to="/" className="text-2xl font-bold">
        Logo
      </Link>
      <div>
        {user ? (
          <div className="flex items-center space-x-4">
            <span>{user.email}</span>
            <button
              onClick={() => dispatch(logout())}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Logout
            </button>
            <Link to="/cart" className="relative">
              Cart
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2 text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        ) : (
          <Link to="/signup" className="bg-blue-500 px-4 py-2 rounded">
            Signup
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
