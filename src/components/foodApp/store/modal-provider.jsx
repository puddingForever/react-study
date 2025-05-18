import { createContext, useContext, useReducer } from "react";
import { initialState, modalReducer } from "./modal-reducer";

// 모달용 context 
export const ModalContext = createContext();

export const useModalContext = () => {
    const context = useContext(ModalContext);
    if(!context){
        throw new Error("modal context를 벗어났습니다!")
    }

    return context;
}

// provider 
export default function ModalContextProvider({children}){

    const [state,dispatch] = useReducer(modalReducer,initialState)
    const ctxValue = {
        state,
        dispatch
    }
    return ( 
            <ModalContext.Provider value={ctxValue}>
                 {children}
            </ModalContext.Provider>
    )
}