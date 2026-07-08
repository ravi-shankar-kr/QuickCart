import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Container from "../../components/common/Container";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import ProductCard from "../../components/ui/ProductCard";

import { fetchProducts } from "../../features/products/productSlice";
import {
  selectProducts,
  selectProductsError,
  selectProductsLoading,
} from "../../features/products/productSelectors";

const Products = () => {
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <EmptyState
        title="Something went wrong"
        description={error}
      />
    );
  }

  if (!products.length) {
    return (
      <EmptyState
        title="No Products Found"
        description="There are no products available."
      />
    );
  }

  return (
    <Container className="py-10">
      <h1 className="mb-8 text-3xl font-bold">
        All Products
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </Container>
  );
};

export default Products;