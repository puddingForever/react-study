import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartUIActions } from "../../store/cart-ui";
import { useState } from "react";
import { postOrderData } from "../../api/orders";

export default function Modal({ children, view }) {
  const dispatch = useDispatch();
  const handleCloseModal = () => dispatch(cartUIActions.toggleCart());
  const { items: cartItems } = useSelector((state) => state.cart);
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("제출");
    const formData = new FormData(e.target);
    const customer = Object.fromEntries(formData.entries());

    const order = {
      items: cartItems, // 장바구니에 있는 상품 배열
      customer,
    };
    try {
      const result = await postOrderData(order);
      setNotification(result.message);
    } catch (error) {
      setNotification(error.message);
    }
  };

  const handleChangeModalView = () =>
    dispatch(cartUIActions.showOtherContent("checkout"));

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
