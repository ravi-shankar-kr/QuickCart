import { createSlice } from "@reduxjs/toolkit";
import {
  getOrders,
  saveOrders,
  clearOrders,
} from "./orderService";

const initialState = {
  orders: getOrders(),
};

const orderSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {
    placeOrder: (state, action) => {
      state.orders.unshift(action.payload);

      saveOrders(state.orders);
    },

    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;

      const order = state.orders.find(
        (item) => item.id === id
      );

      if (order) {
        order.status = status;
      }

      saveOrders(state.orders);
    },

    removeOrder: (state, action) => {
      state.orders = state.orders.filter(
        (item) => item.id !== action.payload
      );

      saveOrders(state.orders);
    },

    clearOrderHistory: (state) => {
      state.orders = [];

      clearOrders();
    },
  },
});

export const {
  placeOrder,
  updateOrderStatus,
  removeOrder,
  clearOrderHistory,
} = orderSlice.actions;

export default orderSlice.reducer;