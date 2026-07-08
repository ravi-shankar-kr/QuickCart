import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import ProductForm from "../../components/ui/ProductForm";
import { updateProduct } from "../../features/products/productSlice";

const EditProduct = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const products = useSelector(
    (state) => state.products.products
  );

  const product = useMemo(
    () =>
      products.find(
        (item) => item.id === Number(id)
      ),
    [products, id]
  );

  const handleSubmit = (data) => {
    dispatch(
      updateProduct({
        ...product,
        ...data,
        id: product.id,
        price: Number(data.price),
        stock: Number(data.stock),
        images: [data.thumbnail],
      })
    );

    navigate("/dashboard/manage-products");
  };

  if (!product) {
    return (
      <div className="py-10 text-center text-xl">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl py-8">
      <h1 className="mb-8 text-3xl font-bold">
        Edit Product
      </h1>

      <ProductForm
        submitText="Update Product"
        onSubmit={handleSubmit}
        defaultValues={{
          title: product.title,
          brand: product.brand,
          category: product.category,
          price: product.price,
          stock: product.stock,
          thumbnail: product.thumbnail,
          description: product.description,
        }}
      />
    </div>
  );
};

export default EditProduct;