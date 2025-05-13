import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { cartUIActions } from "../../store/cart-ui";

export default function Modal({ children }) {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(cartUIActions.toggleCart());
  };
  return createPortal(
    <dialog className="modal" open>
      {children}
      <div className="modal-actions">
        <button className="text-button" onClick={handleCloseModal}>
          닫기
        </button>
        <button className="button">Go to checkout</button>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
}
