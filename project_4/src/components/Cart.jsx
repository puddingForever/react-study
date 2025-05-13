import CartItem from "./CartItem";

export default function Cart() {
  return (
    <dialog className="modal" open>
      <h2>Your Cart</h2>
      <ul>
        <CartItem />
      </ul>
    </dialog>
  );
}
