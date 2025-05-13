import { useSelector } from "react-redux";
import CartItem from "./CartItem";

/**
 *
 *
 */
export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalPrice);

  return (
    <div className="cart">
      <ul>
        {cartItems.map((item) => {
          return <CartItem key={item.id} item={item} />;
        })}
        <span className="cart-total">${totalAmount}</span>
      </ul>
    </div>
  );
}
