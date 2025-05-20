import { useContext } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Button from '../UI/Button';
import CartContext from '../../store/CartContext';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className="modal-actions">
      <Button text onClick={props.onClose}>
        Close
      </Button>
      {hasItems && (
        <Button onClick={props.onCheckout}>
          Go to Checkout
        </Button>
      )}
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      <div className="cart">
        <h2>Your Cart</h2>
        {cartItems}
        <div className="cart-total">
          <span>${totalAmount}</span>
        </div>
        {modalActions}
      </div>
    </Modal>
  );
};

export default Cart;