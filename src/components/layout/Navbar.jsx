import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiHeart, FiUser, FiMenu, FiX, FiMoon, FiSun } from "react-icons/fi";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { logoutUser } from "../../features/auth/authSlice";
import { toggleTheme } from "../../features/theme/themeSlice";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/orders", label: "Orders" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cartCount = useAppSelector((state) => state.cart.items.length);
  const wishlistCount = useAppSelector((state) => state.wishlist.items.length);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const themeMode = useAppSelector((state) => state.theme.mode);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#0F0F0F]/90 backdrop-blur border-b border-[#E5E5E5] dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold tracking-tight text-[#111111] dark:text-white">
          QuickCart
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-[#111111] dark:hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {user?.role === "admin" && (
            <Link
              to="/dashboard"
              className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-[#111111] dark:hover:text-white transition-colors"
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-full hover:bg-[#F8F8F8] dark:hover:bg-[#1A1A1A] text-[#111111] dark:text-white"
            aria-label="Toggle theme"
          >
            {themeMode === "light" ? <FiMoon size={18} /> : <FiSun size={18} />}
          </button>

          <Link
            to="/wishlist"
            className="relative p-2 rounded-full hover:bg-[#F8F8F8] dark:hover:bg-[#1A1A1A] text-[#111111] dark:text-white"
          >
            <FiHeart size={18} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#111111] dark:bg-white text-white dark:text-black text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="relative p-2 rounded-full hover:bg-[#F8F8F8] dark:hover:bg-[#1A1A1A] text-[#111111] dark:text-white"
          >
            <FiShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#111111] dark:bg-white text-white dark:text-black text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="relative group">
              <Link
                to="/profile"
                className="p-2 rounded-full hover:bg-[#F8F8F8] dark:hover:bg-[#1A1A1A] text-[#111111] dark:text-white flex items-center"
              >
                <FiUser size={18} />
              </Link>
              <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-[#1A1A1A] border border-[#E5E5E5] dark:border-neutral-800 rounded-2xl shadow-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link to="/profile" className="block px-3 py-2 text-sm rounded-xl hover:bg-[#F8F8F8] dark:hover:bg-neutral-800 text-[#111111] dark:text-white">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm rounded-xl hover:bg-[#F8F8F8] dark:hover:bg-neutral-800 text-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden sm:inline-block px-4 py-2 text-sm font-medium rounded-2xl bg-[#111111] text-white dark:bg-white dark:text-black hover:bg-black"
            >
              Login
            </Link>
          )}

          <button
            className="md:hidden p-2 text-[#111111] dark:text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#E5E5E5] dark:border-neutral-800 px-4 py-3 flex flex-col gap-3 bg-white dark:bg-[#0F0F0F]">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-[#111111] dark:text-white"
            >
              {link.label}
            </Link>
          ))}
          {user?.role === "admin" && (
            <Link to="/dashboard" onClick={() => setOpen(false)} className="text-sm font-medium text-[#111111] dark:text-white">
              Dashboard
            </Link>
          )}
          {!isAuthenticated && (
            <Link to="/login" onClick={() => setOpen(false)} className="text-sm font-medium text-[#111111] dark:text-white">
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
