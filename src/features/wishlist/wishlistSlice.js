import { createSlice } from "@reduxjs/toolkit";
import { getStorage, setStorage } from "../../utils/storage";

const wishlistKey = "quickcart_wishlist";

const initialState = {
  items: getStorage(wishlistKey, []),
};

const persist = (items) => setStorage(wishlistKey, items);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        persist(state.items);
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      persist(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      persist(state.items);
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
