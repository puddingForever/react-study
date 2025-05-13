export default function CartItem({ item }) {
  const { name, count, subtotal } = item;
  return (
    <li className="cart-item">
      <p>
        <span>{name}</span> - <span>{count}</span> x <span>$ {subtotal}</span>
      </p>
      <div className="cart-item-actions">
        <button>-</button>1<button>+</button>
      </div>
    </li>
  );
}
