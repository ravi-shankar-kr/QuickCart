import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FiFilter, FiX } from "react-icons/fi";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { loadProducts, setFilter, resetFilters } from "../features/products/productsSlice";
import useFilteredProducts from "../hooks/useFilteredProducts";
import useDebounce from "../hooks/useDebounce";
import ProductCard from "../components/common/ProductCard";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const PAGE_SIZE = 12;

const Products = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { apiProducts, localProducts, status, filters } = useAppSelector((state) => state.products);
  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebounce(searchInput, 400);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (status === "idle") dispatch(loadProducts());
  }, [status, dispatch]);

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) dispatch(setFilter({ category: categoryParam }));
  }, [searchParams, dispatch]);

  useEffect(() => {
    dispatch(setFilter({ search: debouncedSearch }));
    setPage(1);
  }, [debouncedSearch, dispatch]);

  const categories = useMemo(
    () => [...new Set(apiProducts.map((p) => p.category))],
    [apiProducts]
  );
  const brands = useMemo(
    () => [...new Set(apiProducts.map((p) => p.brand).filter(Boolean))],
    [apiProducts]
  );

  const filtered = useFilteredProducts();
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleReset = () => {
    dispatch(resetFilters());
    setSearchInput("");
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#111111] dark:text-white">Products</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center gap-2 px-4 py-2 rounded-2xl border border-[#E5E5E5] dark:border-neutral-800 text-sm font-medium text-[#111111] dark:text-white"
        >
          <FiFilter size={16} /> Filters
        </button>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Search products..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside
          className={`w-full md:w-64 shrink-0 ${showFilters ? "block" : "hidden"} md:block`}
        >
          <div className="border border-[#E5E5E5] dark:border-neutral-800 rounded-2xl p-5 space-y-6 sticky top-24">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#111111] dark:text-white">Filters</h3>
              <button onClick={handleReset} className="text-xs text-neutral-500 hover:text-[#111111] dark:hover:text-white">
                Reset
              </button>
              <button className="md:hidden" onClick={() => setShowFilters(false)}>
                <FiX size={16} />
              </button>
            </div>

            <div>
              <p className="text-xs font-medium text-neutral-500 mb-2 uppercase">Category</p>
              <select
                value={filters.category}
                onChange={(e) => dispatch(setFilter({ category: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-[#E5E5E5] dark:border-neutral-700 bg-white dark:bg-[#1A1A1A] text-sm text-[#111111] dark:text-white"
              >
                <option value="all">All</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="text-xs font-medium text-neutral-500 mb-2 uppercase">Brand</p>
              <select
                value={filters.brand}
                onChange={(e) => dispatch(setFilter({ brand: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-[#E5E5E5] dark:border-neutral-700 bg-white dark:bg-[#1A1A1A] text-sm text-[#111111] dark:text-white"
              >
                <option value="all">All</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="text-xs font-medium text-neutral-500 mb-2 uppercase">Max Price (USD)</p>
              <input
                type="range"
                min="0"
                max="2000"
                value={filters.maxPrice === 999999 ? 2000 : filters.maxPrice}
                onChange={(e) => dispatch(setFilter({ maxPrice: Number(e.target.value) }))}
                className="w-full accent-black dark:accent-white"
              />
            </div>

            <div>
              <p className="text-xs font-medium text-neutral-500 mb-2 uppercase">Minimum Rating</p>
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4].map((r) => (
                  <button
                    key={r}
                    onClick={() => dispatch(setFilter({ rating: r }))}
                    className={`w-8 h-8 rounded-full text-xs font-medium border ${
                      filters.rating === r
                        ? "bg-[#111111] text-white dark:bg-white dark:text-black border-transparent"
                        : "border-[#E5E5E5] dark:border-neutral-700 text-[#111111] dark:text-white"
                    }`}
                  >
                    {r === 0 ? "All" : r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-neutral-500 mb-2 uppercase">Sort By</p>
              <select
                value={filters.sortBy}
                onChange={(e) => dispatch(setFilter({ sortBy: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-[#E5E5E5] dark:border-neutral-700 bg-white dark:bg-[#1A1A1A] text-sm text-[#111111] dark:text-white"
              >
                <option value="default">Default</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="titleAZ">Title: A-Z</option>
              </select>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          {status === "loading" ? (
            <Loader />
          ) : filtered.length === 0 ? (
            <EmptyState
              title="No products found"
              subtitle="Try adjusting your filters or search term."
              action={<Button onClick={handleReset}>Clear filters</Button>}
            />
          ) : (
            <>
              <p className="text-sm text-neutral-500 mb-4">{filtered.length} products found</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                {paginated.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-9 h-9 rounded-full text-sm font-medium ${
                        page === p
                          ? "bg-[#111111] text-white dark:bg-white dark:text-black"
                          : "text-[#111111] dark:text-white hover:bg-[#F8F8F8] dark:hover:bg-[#1A1A1A]"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
