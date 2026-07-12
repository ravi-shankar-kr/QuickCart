import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice";
import { formatPrice } from "../utils/formatPrice";
import Button from "../components/ui/Button";
import EmptyState from "../components/common/EmptyState";

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.wishlist);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EmptyState
          title="Your wishlist is empty"
          subtitle="Save products you love and find them here later."
          action={
            <Link to="/products">
              <Button>Browse Products</Button>
            </Link>
          }
        />
      </div>
    );
  }

  const moveToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(removeFromWishlist(item.id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-[#111111] dark:text-white mb-8">Wishlist</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item) => (
          <div
            key={item.id}
            className="border border-[#E5E5E5] dark:border-neutral-800 rounded-2xl p-4 flex gap-4"
          >
            <Link to={`/products/${item.id}`} className="shrink-0">
              <img
                src={item.thumbnail || item.images?.[0]}
                alt={item.title}
                className="w-20 h-20 rounded-xl object-cover bg-[#F8F8F8] dark:bg-neutral-900"
              />
            </Link>
            <div className="flex-1 min-w-0">
              <Link to={`/products/${item.id}`}>
                <h3 className="text-sm font-semibold text-[#111111] dark:text-white line-clamp-1">
                  {item.title}
                </h3>
              </Link>
              <p className="text-sm text-neutral-500 mt-1">{formatPrice(item.price)}</p>
              <div className="flex items-center gap-2 mt-3">
                <Button variant="outline" className="!px-3 !py-1.5 text-xs" onClick={() => moveToCart(item)}>
                  Move to Cart
                </Button>
                <button
                  onClick={() => dispatch(removeFromWishlist(item.id))}
                  className="text-neutral-400 hover:text-red-600 p-1.5"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
