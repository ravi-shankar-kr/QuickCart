import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { addToCart } from "../../features/cart/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../features/wishlist/wishlistSlice";
import { formatPrice } from "../../utils/formatPrice";
import Rating from "../ui/Rating";
import Button from "../ui/Button";

const ProductCard = ({ product }) => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some((i) => i.id === product.id);

  const thumbnail =
    product.thumbnail || product.images?.[0] || "https://placehold.co/400x400?text=QuickCart";

  const toggleWishlist = (e) => {
    e.preventDefault();
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group block bg-white dark:bg-[#1A1A1A] border border-[#E5E5E5] dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-square bg-[#F8F8F8] dark:bg-neutral-900 overflow-hidden">
        <img
          src={thumbnail}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-black/70 flex items-center justify-center"
        >
          {isWishlisted ? (
            <FaHeart size={14} className="text-red-500" />
          ) : (
            <FiHeart size={14} className="text-[#111111] dark:text-white" />
          )}
        </button>
        {product.isLocal && (
          <span className="absolute top-3 left-3 text-[10px] px-2 py-1 rounded-full bg-[#111111] text-white dark:bg-white dark:text-black">
            New
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <h3 className="text-sm font-semibold text-[#111111] dark:text-white line-clamp-1">
          {product.title}
        </h3>
        <div className="mt-1.5">
          <Rating value={product.rating} />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-base font-bold text-[#111111] dark:text-white">
            {formatPrice(product.price)}
          </span>
          <Button variant="outline" className="!px-3 !py-1.5 text-xs" onClick={handleAddToCart}>
            Add
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
