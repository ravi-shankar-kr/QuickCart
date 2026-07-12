import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllProducts } from "../../services/productService";
import { getStorage, setStorage } from "../../utils/storage";

const localKey = "quickcart_local_products";

export const loadProducts = createAsyncThunk(
  "products/loadProducts",
  async () => {
    const apiProducts = await fetchAllProducts();
    return apiProducts;
  }
);

const initialState = {
  apiProducts: [],
  localProducts: getStorage(localKey, []),
  status: "idle",
  error: null,
  filters: {
    search: "",
    category: "all",
    brand: "all",
    minPrice: 0,
    maxPrice: 999999,
    rating: 0,
    sortBy: "default",
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addLocalProduct: (state, action) => {
      const product = {
        ...action.payload,
        id: Date.now(),
        isLocal: true,
        rating: action.payload.rating || 4,
      };
      state.localProducts.unshift(product);
      setStorage(localKey, state.localProducts);
    },
    updateLocalProduct: (state, action) => {
      const idx = state.localProducts.findIndex(
        (p) => p.id === action.payload.id
      );
      if (idx !== -1) {
        state.localProducts[idx] = {
          ...state.localProducts[idx],
          ...action.payload,
        };
        setStorage(localKey, state.localProducts);
      }
    },
    deleteLocalProduct: (state, action) => {
      state.localProducts = state.localProducts.filter(
        (p) => p.id !== action.payload
      );
      setStorage(localKey, state.localProducts);
    },
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.apiProducts = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  addLocalProduct,
  updateLocalProduct,
  deleteLocalProduct,
  setFilter,
  resetFilters,
} = productsSlice.actions;

export default productsSlice.reducer;
