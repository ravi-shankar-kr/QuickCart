import React from "react";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import Button from "../common/Button";
import formatCurrency from "../../utils/formatCurrency";

const CartItem = ({
  item,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
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

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={() => decreaseQuantity(item.id)}
        >
          <FiMinus />
        </Button>

        <span className="min-w-8 text-center font-semibold">
          {item.quantity}
        </span>

        <Button
          variant="outline"
          onClick={() => increaseQuantity(item.id)}
        >
          <FiPlus />
        </Button>
      </div>

      <div className="text-right">
        <p className="mb-3 text-lg font-bold">
          {formatCurrency(item.price * item.quantity * 85)}
        </p>

        <Button onClick={() => removeFromCart(item.id)}>
          <FiTrash2 />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;