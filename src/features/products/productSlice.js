import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./productService";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const data = await getProducts();
    return data.products;
  }
);

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch products";
      });
  },
});

export default productSlice.reducer;