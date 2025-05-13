import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import cartUISlice from "./cart-ui";

const store = configureStore({
  reducer: { cart: cartSlice.reducer, ui: cartUISlice.reducer },
});
export default store;
