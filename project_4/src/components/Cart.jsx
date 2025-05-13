import CartItem from "./CartItem";

export default function Cart() {
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <ul>
        <CartItem />
        <span className="cart-total ">$total</span>
      </ul>
    </div>
  );
}
