import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { cartUIActions } from "../../store/cart-ui";

export default function Modal({ children, view }) {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(cartUIActions.toggleCart());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("제출");
    const formData = new FormData(e.target);
    const order = Object.fromEntries(formData.entries());
    postOrderData(order);
  };
  const postOrderData = async (order) => {
    const res = await fetch(`${BASE_URL}/oreders`, {
      method: "POST",
      body: order,
    });
    if (!res.ok) {
      throw new Error("주문에 실패했습니다.");
    }
    console.log(res, "res");
  };
  const handleChangeModalView = () => {
    dispatch(cartUIActions.showOtherContent("checkout"));
  };

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
