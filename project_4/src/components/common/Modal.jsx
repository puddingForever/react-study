import { useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartUIActions } from "../../store/cart-ui";
import { postOrderData } from "../../api/orders";

/**
 * 장바구니 및 주문 양식(Checkout)을 표시하는 다이얼로그 모달 컴포넌트
 *
 * @params {string} - view 현재 보여줄 뷰 상태 ('cart' | 'checkout')
 * @param {React.ReactNode} - 모달 내부에 렌더링할 자식 컴포넌트(<Cart />, <Checkout />)
 */

export default function Modal({ children, view }) {
  const dispatch = useDispatch();
  const handleCloseModal = () => dispatch(cartUIActions.toggleCart());
  const handleChangeModalView = () =>
    dispatch(cartUIActions.showOtherContent("checkout"));
  const { items: cartItems } = useSelector((state) => state.cart);
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const customer = Object.fromEntries(formData.entries());

    const order = {
      items: cartItems,
      customer,
    };

    try {
      const result = await postOrderData(order);
      setNotification(result.message);
      setTimeout(handleCloseModal, 3000);
    } catch (error) {
      setNotification(error.message);
    }
  };

  return createPortal(
    <dialog className="modal" open>
      <form id="checkout-form" onSubmit={handleSubmit}>
        {children}
        {view === "checkout" && <p>{notification}</p>}
      </form>
      <div className="modal-actions">
        <button
          className="text-button"
          type="button"
          onClick={handleCloseModal}
        >
          닫기
        </button>
        {view === "cart" && (
          <button
            type="button"
            className="button"
            onClick={handleChangeModalView}
          >
            Go to Checkout
          </button>
        )}
        {view === "checkout" && (
          <button type="submit" className="button" form="checkout-form">
            Submit-Order
          </button>
        )}
      </div>
    </dialog>,
    document.getElementById("modal")
  );
}
