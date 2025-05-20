import { createPortal } from "react-dom";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Result from "./Result";
import { useModalContext } from "../store/modal-provider";
import { useCallback } from "react";

// 모달창 
const Modal = () => {
  // portal 배치용 selector
  const modalRoot = document.getElementById("modal")
  // context
  const  { dispatch:modalDispatch,state:modalState} = useModalContext();
  // 모달창 닫기 
  const closeModalHandler = useCallback(() => {
    modalDispatch({type : "CLOSE_MODAL" })
  },[])

  // 장바구니 or 주문서 or 결과 모달창 
  const modalContent = {
    CART : <Cart onCloseModal={closeModalHandler} />,
    CHECKOUT : <Checkout onCloseModal={closeModalHandler}/>,
    RESULT : <Result onCloseModal={closeModalHandler} />
  }

  return ( 
    createPortal(
      <div className="modal">{modalContent[modalState.modalType]}</div>
    , modalRoot)
  )
}

export default Modal;