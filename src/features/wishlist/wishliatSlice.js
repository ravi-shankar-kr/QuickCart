import { createSlice } from "@reduxjs/toolkit";
import {
  getWishlist,
  saveWishlist,
  clearWishlist,
} from "./wishlistService";

const initialState = {
  wishlistItems: getWishlist(),
};

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;

      const exists = state.wishlistItems.find(
        (item) => item.id === product.id
      );

      if (!exists) {
        state.wishlistItems.push(product);
        saveWishlist(state.wishlistItems);
      }
    },

    removeFromWishlist: (state, action) => {
      state.wishlistItems =
        state.wishlistItems.filter(
          (item) => item.id !== action.payload
        );

      saveWishlist(state.wishlistItems);
    },

    clearWishlistItems: (state) => {
      state.wishlistItems = [];
      clearWishlist();
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlistItems,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;