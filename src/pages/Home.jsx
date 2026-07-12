import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { loadProducts } from "../features/products/productsSlice";
import ProductCard from "../components/common/ProductCard";
import Loader from "../components/common/Loader";
import Button from "../components/ui/Button";

const Home = () => {
  const dispatch = useAppDispatch();
  const { apiProducts, localProducts, status } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") dispatch(loadProducts());
  }, [status, dispatch]);

  const featured = [...localProducts, ...apiProducts].slice(0, 8);
  const categories = [...new Set(apiProducts.map((p) => p.category))].slice(0, 6);

  return (
    <div>
      <section className="border-b border-[#E5E5E5] dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#111111] dark:text-white">
            Shop what matters.
          </h1>
          <p className="mt-4 text-neutral-500 max-w-xl mx-auto">
            Curated products, honest prices, and a store designed to get out of your way.
          </p>
          <div className="mt-8">
            <Link to="/products">
              <Button className="!px-8 !py-3">Explore Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-lg font-semibold text-[#111111] dark:text-white mb-5">
            Shop by category
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/products?category=${cat}`}
                className="shrink-0 px-5 py-2.5 rounded-2xl border border-[#E5E5E5] dark:border-neutral-800 text-sm font-medium capitalize text-[#111111] dark:text-white hover:bg-[#F8F8F8] dark:hover:bg-[#1A1A1A]"
              >
                {cat.replace("-", " ")}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-[#111111] dark:text-white">
            Featured products
          </h2>
          <Link to="/products" className="text-sm font-medium text-neutral-500 hover:text-[#111111] dark:hover:text-white">
            View all
          </Link>
        </div>
        {status === "loading" ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
