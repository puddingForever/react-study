import { createSlice } from "@reduxjs/toolkit";
const initialCartState = { items: [], totalCount: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  //처음에 서버의 카트 데이터 불러오기 필요
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      //장바구니에 없는 상품이면 추가하고 있는 상품이면 count 추가
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
