import { useDispatch, useSelector } from "react-redux";

import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCartItems,
} from "../features/cart/cartSlice";

const useCart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return {
    cartItems,
    totalItems,
    totalPrice,
    addToCart: (product) =>
      dispatch(addToCart(product)),
    removeFromCart: (id) =>
      dispatch(removeFromCart(id)),
    increaseQuantity: (id) =>
      dispatch(increaseQuantity(id)),
    decreaseQuantity: (id) =>
      dispatch(decreaseQuantity(id)),
    clearCart: () =>
      dispatch(clearCartItems()),
  };
};

export default useCart;