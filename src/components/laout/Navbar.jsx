import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiHeart, FiLogOut, FiMoon, FiShoppingCart, FiSun, FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import Container from "../common/Container";
import { clearUser } from "../../features/auth/authSlice";
import { logoutUser } from "../../features/auth/authService";
import { selectIsAuthenticated, selectUser } from "../../features/auth/authSelectors";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const logout = () => {
    logoutUser();
    dispatch(clearUser());
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold"
          >
            QuickCart
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>

            {isAuthenticated && (
              <>
                <Link to="/cart">Cart</Link>
                <Link to="/wishlist">Wishlist</Link>
                <Link to="/orders">Orders</Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button className="rounded-full border p-2">
              <FiMoon size={18} />
            </button>

            {isAuthenticated && (
              <>
                <Link to="/wishlist">
                  <FiHeart size={20} />
                </Link>

                <Link to="/cart">
                  <FiShoppingCart size={20} />
                </Link>

                <Link to="/profile">
                  <FiUser size={20} />
                </Link>

                <button onClick={logout}>
                  <FiLogOut size={20} />
                </button>

                <span className="hidden font-medium md:block">
                  {user.name}
                </span>
              </>
            )}

            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="rounded-lg border px-4 py-2"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="rounded-lg bg-black px-4 py-2 text-white"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;