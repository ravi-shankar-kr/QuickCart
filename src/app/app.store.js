import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import productReducer from "@/features/products/productSlice";
import cartReducer from "@/features/cart/cartSlice";
import wishlistReducer from "@/features/wishlist/wishlistSlice";
import orderReducer from "@/features/orders/orderSlice";
import profileReducer from "@/features/profile/profileSlice";
import themeReducer from "@/features/theme/themeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    orders: orderReducer,
    profile: profileReducer,
    theme: themeReducer,
  },
});