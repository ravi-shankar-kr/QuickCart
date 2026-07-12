import { createSlice } from "@reduxjs/toolkit";
import { getStorage, setStorage } from "../../utils/storage";

const ordersKey = "quickcart_orders";

const initialState = {
  orders: getStorage(ordersKey, []),
};

const persist = (orders) => setStorage(ordersKey, orders);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      const order = {
        id: Date.now(),
        items: action.payload.items,
        total: action.payload.total,
        address: action.payload.address,
        paymentMethod: action.payload.paymentMethod,
        status: "Placed",
        createdAt: new Date().toISOString(),
        timeline: [
          { status: "Placed", date: new Date().toISOString() },
          { status: "Processing", date: null },
          { status: "Shipped", date: null },
          { status: "Delivered", date: null },
        ],
      };
      state.orders.unshift(order);
      persist(state.orders);
    },
    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;
      const order = state.orders.find((o) => o.id === id);
      if (order) {
        order.status = status;
        const step = order.timeline.find((t) => t.status === status);
        if (step) step.date = new Date().toISOString();
        persist(state.orders);
      }
    },
  },
});

export const { placeOrder, updateOrderStatus } = ordersSlice.actions;

export default ordersSlice.reducer;
