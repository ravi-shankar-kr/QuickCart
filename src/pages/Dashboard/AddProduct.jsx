import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../components/ui/ProductForm";
import { addProduct } from "../../features/products/productSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    const product = {
      ...data,
      id: Date.now(),
      price: Number(data.price),
      stock: Number(data.stock),
      rating: 5,
      discountPercentage: 0,
      images: [data.thumbnail],
      createdAt: new Date().toISOString(),
      isLocal: true,
    };

    dispatch(addProduct(product));

    navigate("/dashboard/manage-products");
  };

  return (
    <div className="mx-auto max-w-4xl py-8">
      <h1 className="mb-8 text-3xl font-bold">
        Add Product
      </h1>

      <ProductForm
        submitText="Add Product"
        onSubmit={handleSubmit}
        defaultValues={{
          title: "",
          brand: "",
          category: "",
          price: "",
          stock: "",
          thumbnail: "",
          description: "",
        }}
      />
    </div>
  );
};

export default AddProduct;