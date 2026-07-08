import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FiHeart,
  FiShoppingCart,
  FiMinus,
  FiPlus,
} from "react-icons/fi";

import api from "../../services/api";
import Container from "../../components/common/Container";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import Button from "../../components/common/Button";
import Rating from "../../components/ui/Rating";
import formatCurrency from "../../utils/formatCurrency";

const ProductDetails = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState(null);

  const [selectedImage, setSelectedImage] = useState("");

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const { data } = await api.get(`/products/${id}`);

        setProduct(data);

        setSelectedImage(data.thumbnail);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const increase = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  if (loading) return <Loader />;

  if (!product)
    return (
      <EmptyState
        title="Product Not Found"
        description="Requested product doesn't exist."
      />
    );

  const discountedPrice =
    product.price -
    (product.price * product.discountPercentage) / 100;

      return (
    <Container className="py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-xl border">
            <img
              src={selectedImage}
              alt={product.title}
              className="h-[500px] w-full object-cover"
            />
          </div>

          <div className="mt-5 flex gap-3 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`overflow-hidden rounded-lg border ${
                  selectedImage === image
                    ? "border-black"
                    : "border-neutral-300"
                }`}
              >
                <img
                  src={image}
                  alt={product.title}
                  className="h-24 w-24 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="rounded bg-black px-3 py-1 text-sm text-white">
            {product.category}
          </span>

          <h1 className="mt-4 text-4xl font-bold">
            {product.title}
          </h1>

          <div className="mt-4">
            <Rating
              rating={product.rating}
              reviews={product.stock}
            />
          </div>

          <div className="mt-6 flex items-center gap-4">
            <span className="text-4xl font-bold">
              {formatCurrency(discountedPrice * 85)}
            </span>

            <span className="text-xl text-neutral-400 line-through">
              {formatCurrency(product.price * 85)}
            </span>

            <span className="rounded bg-red-500 px-3 py-1 text-sm text-white">
              {product.discountPercentage.toFixed(0)}% OFF
            </span>
          </div>

          <div className="mt-8 space-y-3 text-lg">
            <p>
              <span className="font-semibold">Brand :</span>{" "}
              {product.brand}
            </p>

            <p>
              <span className="font-semibold">Stock :</span>{" "}
              {product.stock > 0 ? (
                <span className="text-green-600">
                  In Stock ({product.stock})
                </span>
              ) : (
                <span className="text-red-500">
                  Out of Stock
                </span>
              )}
            </p>
          </div>

          <p className="mt-8 leading-8 text-neutral-600">
            {product.description}
          </p>

          <div className="mt-10 flex items-center gap-5">
            <div className="flex items-center rounded-lg border">
              <button
                onClick={decrease}
                className="p-4"
              >
                <FiMinus />
              </button>

              <span className="min-w-14 text-center text-lg font-semibold">
                {quantity}
              </span>

              <button
                onClick={increase}
                className="p-4"
              >
                <FiPlus />
              </button>
            </div>

            <Button className="flex items-center gap-2">
              <FiShoppingCart />
              Add To Cart
            </Button>

            <Button
              variant="outline"
              className="flex items-center gap-2"
            >
              <FiHeart />
              Wishlist
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetails;