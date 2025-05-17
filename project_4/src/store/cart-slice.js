import { createSlice } from "@reduxjs/toolkit";
const initialCartState = { items: [], totalCount: 0, totalPrice: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,

  //처음에 서버의 카트 데이터 불러오기 필요
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalCount++;
      state.totalPrice = state.totalPrice + newItem.price;
      //장바구니에 없는 상품이면 추가하고 있는 상품이면 count 추가
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          count: 1,
          subtotal: newItem.price,
        });
      } else {
        existingItem.count++;
        existingItem.subtotal = newItem.price + existingItem.subtotal;
      }
    },
    removeItemToCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalCount--;
      state.totalPrice = state.totalPrice - existingItem.price;
      if (existingItem.count === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.count--;
        existingItem.subtotal = existingItem.subtotal - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
