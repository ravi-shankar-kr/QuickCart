import React from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import Container from "../common/Container";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold tracking-wide text-black"
          >
            QuickCart
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/wishlist">Wishlist</Link>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            <Link to="/wishlist">
              <FiHeart size={22} />
            </Link>

            <Link to="/cart">
              <FiShoppingCart size={22} />
            </Link>

            <Link to="/profile">
              <FiUser size={22} />
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;