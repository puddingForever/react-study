export default function CartItem() {
  return (
    <div className="cart-item">
      <p>
        <span>title</span>-<span>count</span>x<span>price</span>
      </p>
      <div className="cart-item-actions">
        <button>-</button>1<button>+</button>
      </div>
    </div>
  );
}
