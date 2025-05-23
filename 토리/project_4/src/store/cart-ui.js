import { createSlice } from "@reduxjs/toolkit";

const initialCartUIState = { isShow: false, view: "cart" };
const cartUISlice = createSlice({
  name: "cartUI",
  initialState: initialCartUIState,
  reducers: {
    toggleCart(state) {
      state.isShow = !state.isShow;
      state.view = "cart";
    },
    showOtherContent(state, action) {
      const content = action.payload;
      state.view = content;
    },
  },
});

export const cartUIActions = cartUISlice.actions;
export default cartUISlice;
