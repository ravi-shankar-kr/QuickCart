import React from "react";
import { FiHeart, FiShoppingCart } from "react-icons/fi";

import Button from "../common/Button";
import formatCurrency from "../../utils/formatCurrency";

const WishlistItem = ({
  item,
  addToCart,
  removeFromWishlist,
}) => {
  return (
    <div className="flex flex-col gap-6 rounded-xl border p-5 md:flex-row md:items-center">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="h-32 w-32 rounded-lg object-cover"
      />

      <div className="flex-1">
        <h2 className="text-xl font-semibold">
          {item.title}
        </h2>

        <p className="mt-2 text-neutral-500">
          {item.brand}
        </p>

        <h3 className="mt-3 text-2xl font-bold">
          {formatCurrency(item.price * 85)}
        </h3>
      </div>

      <div className="flex gap-3">
        <Button
          className="flex items-center gap-2"
          onClick={() => addToCart(item)}
        >
          <FiShoppingCart />
          Add To Cart
        </Button>

        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => removeFromWishlist(item.id)}
        >
          <FiHeart />
          Remove
        </Button>
      </div>
    </div>
  );
};

export default WishlistItem;