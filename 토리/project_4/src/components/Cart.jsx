import { useSelector } from "react-redux";
import CartItem from "./CartItem";

/**
 * 장바구니 내용을 보여주는 컴포넌트
 *
 */

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalPrice);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
        <span className="cart-total">${totalAmount.toFixed(2)}</span>
      </ul>
    </div>
  );
}
