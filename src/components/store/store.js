import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";

export const store = configureStore({
  reducer: {
    cartReducer: cartSlice.reducer,
  },
});

export const cartActions = cartSlice.actions;
