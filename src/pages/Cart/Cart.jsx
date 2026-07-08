import React from "react";
import Button from "../../components/common/Button";
import Container from "../../components/common/Container";
import EmptyState from "../../components/common/EmptyState";
import CartItem from "../../components/ui/CartItem";
import useCart from "../../hooks/useCart";
import formatCurrency from "../../utils/formatCurrency";

const Cart = () => {
  const {
    cartItems,
    totalItems,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (!cartItems.length) {
    return (
      <Container className="py-16">
        <EmptyState
          title="Your Cart is Empty"
          description="Add products to your cart to continue shopping."
        />
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-5">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeFromCart={removeFromCart}
            />
          ))}
        </div>

        <div className="h-fit rounded-xl border p-6">
          <h2 className="mb-6 text-2xl font-bold">
            Cart Summary
          </h2>

          <div className="mb-4 flex justify-between">
            <span>Total Items</span>

            <span>{totalItems}</span>
          </div>

          <div className="mb-8 flex justify-between text-xl font-bold">
            <span>Total</span>

            <span>
              {formatCurrency(totalPrice * 85)}
            </span>
          </div>

          <Button className="mb-3 w-full">
            Proceed To Checkout
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={clearCart}
          >
            Clear Cart
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Cart;