import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";
/**
 * 장바구니 아이템을 렌더링하는 컴포넌트
 * @param {Object} -item { id, name, count, price, subtotal }
 * @param {Function} -increaseItemQuantity 아이템 수량 +1
 * @param {Function} -decreaseItemQuantity 아이템 수량 -1
 */
export default function CartItem({ item }) {
  const { id, name, count, subtotal } = item;
  const dispatch = useDispatch();
  const increaseItemQuantity = () => dispatch(cartActions.addItemToCart(item));
  const decreaseItemQuantity = () => dispatch(cartActions.removeItemToCart(id));

  return (
    <li className="cart-item">
      <p>
        <span>{name}</span> - <span>{count}</span> x <span>$ {subtotal}</span>
      </p>
      <div className="cart-item-actions">
        <button type="button" onClick={decreaseItemQuantity}>
          -
        </button>
        {count}
        <button type="button" onClick={increaseItemQuantity}>
          +
        </button>
      </div>
    </li>
  );
}
