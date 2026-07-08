import { createSlice } from "@reduxjs/toolkit";
import {
  getCart,
  saveCart,
  clearCart,
} from "./cartService";

const initialState = {
  cartItems: getCart(),
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const existing = state.cartItems.find(
        (item) => item.id === product.id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.cartItems.push({
          ...product,
          quantity: 1,
        });
      }

      saveCart(state.cartItems);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );

      saveCart(state.cartItems);
    },

    increaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        (product) => product.id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }

      saveCart(state.cartItems);
    },

    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        (product) => product.id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      saveCart(state.cartItems);
    },

    clearCartItems: (state) => {
      state.cartItems = [];
      clearCart();
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;