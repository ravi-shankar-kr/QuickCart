import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { addToCart } from "../features/cart/cartSlice";
import { addToWishlist, removeFromWishlist } from "../features/wishlist/wishlistSlice";
import { fetchProductById } from "../services/productService";
import { formatPrice } from "../utils/formatPrice";
import Rating from "../components/ui/Rating";
import Button from "../components/ui/Button";
import Loader from "../components/common/Loader";
import ProductCard from "../components/common/ProductCard";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { apiProducts, localProducts } = useAppSelector((state) => state.products);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localMatch = localProducts.find((p) => String(p.id) === id);
    if (localMatch) {
      setProduct(localMatch);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchProductById(id)
      .then((data) => setProduct(data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id, localProducts]);

  if (loading) return <Loader />;

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-neutral-500">Product not found.</p>
        <Button className="mt-4" onClick={() => navigate("/products")}>
          Back to Products
        </Button>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [product.thumbnail];
  const isWishlisted = wishlistItems.some((i) => i.id === product.id);
  const related = [...localProducts, ...apiProducts]
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <div className="aspect-square bg-[#F8F8F8] dark:bg-neutral-900 rounded-2xl overflow-hidden border border-[#E5E5E5] dark:border-neutral-800">
            <img src={images[activeImage]} alt={product.title} className="w-full h-full object-cover" />
          </div>
          {images.length > 1 && (
            <div className="flex gap-3 mt-4">
              {images.slice(0, 5).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 ${
                    activeImage === idx ? "border-[#111111] dark:border-white" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-500">{product.category}</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] dark:text-white mt-2">
            {product.title}
          </h1>
          <div className="mt-3">
            <Rating value={product.rating} />
          </div>
          <p className="text-3xl font-bold text-[#111111] dark:text-white mt-5">
            {formatPrice(product.price)}
          </p>
          <p className="mt-5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
            {product.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-neutral-500">
            {product.brand && <span>Brand: {product.brand}</span>}
            {product.stock !== undefined && <span>Stock: {product.stock}</span>}
          </div>

          <div className="mt-8 flex items-center gap-3">
            <Button className="flex-1" onClick={() => dispatch(addToCart(product))}>
              Add to Cart
            </Button>
            <button
              onClick={() =>
                isWishlisted
                  ? dispatch(removeFromWishlist(product.id))
                  : dispatch(addToWishlist(product))
              }
              className="w-12 h-12 flex items-center justify-center rounded-2xl border border-[#E5E5E5] dark:border-neutral-700"
            >
              {isWishlisted ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FiHeart className="text-[#111111] dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-lg font-semibold text-[#111111] dark:text-white mb-6">
            Related products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
