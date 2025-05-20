const CartItem = (props) => {
  return (
    <li className="cart-item">
      <div>
        <span className="cart-item-price">{props.name} - {props.amount} x ${props.price}</span>
      </div>
      <div className="cart-item-actions">
        <button onClick={props.onRemove}>−</button>
        <span className="cart-item-amount">{props.amount}</span>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;