import { createSlice } from "@reduxjs/toolkit";

const initialCartUIState = { isShow: false };
const cartUISlice = createSlice({
  name: "cartUI",
  initialState: initialCartUIState,
  reducers: {
    toggleCart(state) {
      state.isShow = !state.isShow;
    },
  },
});

export const cartUIActions = cartUISlice.actions;
export default cartUISlice;
