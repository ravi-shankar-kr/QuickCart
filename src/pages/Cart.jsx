import { Link, useNavigate } from "react-router-dom";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../features/cart/cartSlice";
import { formatPrice, toINR } from "../utils/formatPrice";
import Button from "../components/ui/Button";
import EmptyState from "../components/common/EmptyState";

const Cart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items } = useAppSelector((state) => state.cart);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const subtotal = items.reduce((sum, item) => sum + toINR(item.price) * item.quantity, 0);
  const shipping = subtotal > 0 ? 99 : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EmptyState
          title="Your cart is empty"
          subtitle="Looks like you haven't added anything yet."
          action={
            <Link to="/products">
              <Button>Browse Products</Button>
            </Link>
          }
        />
      </div>
    );
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-[#111111] dark:text-white mb-8">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 border border-[#E5E5E5] dark:border-neutral-800 rounded-2xl p-4"
            >
              <img
                src={item.thumbnail || item.images?.[0]}
                alt={item.title}
                className="w-20 h-20 rounded-xl object-cover bg-[#F8F8F8] dark:bg-neutral-900"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-[#111111] dark:text-white line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-500 mt-1">{formatPrice(item.price)}</p>

                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    className="w-7 h-7 flex items-center justify-center rounded-full border border-[#E5E5E5] dark:border-neutral-700 text-[#111111] dark:text-white"
                  >
                    <FiMinus size={12} />
                  </button>
                  <span className="text-sm font-medium text-[#111111] dark:text-white w-4 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    className="w-7 h-7 flex items-center justify-center rounded-full border border-[#E5E5E5] dark:border-neutral-700 text-[#111111] dark:text-white"
                  >
                    <FiPlus size={12} />
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-neutral-400 hover:text-red-600"
                >
                  <FiTrash2 size={16} />
                </button>
                <p className="text-sm font-semibold text-[#111111] dark:text-white">
                  {`₹${(toINR(item.price) * item.quantity).toLocaleString("en-IN")}`}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="border border-[#E5E5E5] dark:border-neutral-800 rounded-2xl p-6 h-fit">
          <h2 className="text-lg font-semibold text-[#111111] dark:text-white mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-neutral-500">
              <span>Subtotal</span>
              <span>{`₹${subtotal.toLocaleString("en-IN")}`}</span>
            </div>
            <div className="flex justify-between text-neutral-500">
              <span>Shipping</span>
              <span>{`₹${shipping}`}</span>
            </div>
            <div className="flex justify-between font-semibold text-[#111111] dark:text-white pt-2 border-t border-[#E5E5E5] dark:border-neutral-800 mt-2">
              <span>Total</span>
              <span>{`₹${total.toLocaleString("en-IN")}`}</span>
            </div>
          </div>
          <Button className="w-full mt-6" onClick={handleCheckout}>
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
