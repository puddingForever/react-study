import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { cartUIActions } from "../../store/cart-ui";

export default function Modal({ children, currentView }) {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(cartUIActions.toggleCart());
  };

  const viewActions = {
    cart: (
      <button
        className="button"
        type="button"
        onClick={() => dispatch(cartUIActions.showCheckout())}
      >
        Go to checkout
      </button>
    ),
    checkout: (
      <button className="button" type="submit" form="checkout-form">
        Submit Order
      </button>
    ),
  };

  return createPortal(
    <dialog className="modal" open>
      {children}
      <div className="modal-actions">
        <button className="text-button" onClick={handleCloseModal}>
          닫기
        </button>
        {viewActions[currentView]}
      </div>
    </dialog>,
    document.getElementById("modal")
  );
}
