import { createContext, useContext, useReducer } from "react";
import { CartReducer, initialState } from "./cart-reducer";

export const CartContext = createContext();

export const useCartContext = () => {
  const context = useContext(CartContext);
  if(!context){
    throw new Error('Cart Context 범위를 넘어갔습니다.')
  }

  return context;
}

export default function CartContextProvider({children}){
  const [state,dispatch] = useReducer(CartReducer, initialState);

  const ctxValue = {
    state,
    dispatch
  }

  return <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  
}
