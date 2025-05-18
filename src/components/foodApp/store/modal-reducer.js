export const initialState = {
  modalType: null, // null | "CART" | "CHECKOUT" | 'RESULT'
};

// 모달 열고,닫힘 리듀서
export const modalReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_CART":
      return { modalType: "CART" };
    case "OPEN_CHECKOUT":
      return { modalType: "CHECKOUT" };
    case "OPEN_RESULT":
      return { modalType: "RESULT" };
    case "CLOSE_MODAL":
      return { modalType: null };
  }
};
