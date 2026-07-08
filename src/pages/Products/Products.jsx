import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Container from "../../components/common/Container";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";

import ProductCard from "../../components/ui/ProductCard";
import SearchBar from "../../components/ui/SearchBar";
import ProductFilters from "../../components/ui/ProductFilters";
import Pagination from "../../components/ui/Pagination";

import { fetchProducts } from "../../features/products/productSlice";
import {
  selectProducts,
  selectProductsLoading,
  selectProductsError,
} from "../../features/products/productSelectors";

const Products = () => {
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const categories = useMemo(() => {
    return [...new Set(products.map((item) => item.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let data = [...products];

    if (search.trim()) {
      data = data.filter(
        (item) =>
          item.title
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          item.brand
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    if (category) {
      data = data.filter(
        (item) => item.category === category
      );
    }

    if (sort === "low") {
      data.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      data.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      data.sort((a, b) => b.rating - a.rating);
    }

    if (sort === "name") {
      data.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    return data;
  }, [products, search, category, sort]);

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, sort]);

  if (loading) return <Loader />;

  if (error)
    return (
      <EmptyState
        title="Error"
        description={error}
      />
    );

  return (
    <Container className="py-10">
      <div className="mb-8 space-y-5">
        <SearchBar
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <ProductFilters
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
          categories={categories}
        />
      </div>

      {displayedProducts.length ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <EmptyState
          title="No Products Found"
          description="Try another search or filter."
        />
      )}
    </Container>
  );
};

export default Products;