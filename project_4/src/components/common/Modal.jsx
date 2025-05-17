import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartUIActions } from "../../store/cart-ui";
import { BASE_URL } from "../../api/base";
import { useState } from "react";

export default function Modal({ children, view }) {
  const dispatch = useDispatch();
  const handleCloseModal = () => dispatch(cartUIActions.toggleCart());
  const { items: cartItems } = useSelector((state) => state.cart);
  const [notification, setNotification] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("제출");
    const formData = new FormData(e.target);
    const customer = Object.fromEntries(formData.entries());

    const order = {
      items: cartItems, // 장바구니에 있는 상품 배열
      customer,
    };
    postOrderData(order);
  };

  const postOrderData = async (order) => {
    console.log(order, "order");
    const res = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order }),
    });
    if (!res.ok) {
      throw new Error("주문에 실패했습니다.");
    }
    console.log(res, "res");
  };
  const handleChangeModalView = () =>
    dispatch(cartUIActions.showOtherContent("checkout"));

  return createPortal(
    <dialog className="modal" open>
      <form id="checkout-form" onSubmit={handleSubmit}>
        {children}
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
