import { useMemo } from "react";
import { useAppSelector } from "./useAppSelector";

const useFilteredProducts = () => {
  const { apiProducts, localProducts, filters } = useAppSelector(
    (state) => state.products
  );

  return useMemo(() => {
    let all = [...localProducts, ...apiProducts];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      all = all.filter((p) => p.title.toLowerCase().includes(q));
    }
    if (filters.category !== "all") {
      all = all.filter((p) => p.category === filters.category);
    }
    if (filters.brand !== "all") {
      all = all.filter((p) => p.brand === filters.brand);
    }
    all = all.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
    );
    if (filters.rating > 0) {
      all = all.filter((p) => Math.round(p.rating) >= filters.rating);
    }

    if (filters.sortBy === "priceLowHigh") {
      all = [...all].sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "priceHighLow") {
      all = [...all].sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === "rating") {
      all = [...all].sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === "titleAZ") {
      all = [...all].sort((a, b) => a.title.localeCompare(b.title));
    }

    return all;
  }, [apiProducts, localProducts, filters]);
};

export default useFilteredProducts;
