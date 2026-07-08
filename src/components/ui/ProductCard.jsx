import React from "react";
import { Link } from "react-router-dom";
import { FiStar } from "react-icons/fi";
import formatCurrency from "../../utils/formatCurrency";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/products/${product.id}`}
      className="overflow-hidden rounded-xl border bg-white transition hover:-translate-y-1 hover:shadow-lg"
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        className="h-60 w-full object-cover"
      />

      <div className="space-y-2 p-4">
        <h2 className="line-clamp-1 text-lg font-semibold">
          {product.title}
        </h2>

        <p className="line-clamp-2 text-sm text-neutral-500">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">
            {formatCurrency(product.price * 85)}
          </span>

          <div className="flex items-center gap-1">
            <FiStar />
            <span>{product.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;