import { useDispatch, useSelector } from "react-redux";
import { cartUIActions } from "../../store/cart-ui";

export default function Header() {
  const dispatch = useDispatch();
  const totalItemsInCart = useSelector((state) => state.cart.totalCount);
  const handleToggleCart = () => dispatch(cartUIActions.toggleCart());

  return (
    <header id="main-header">
      <div id="title">
        <img src="logo.jpg" alt="로고" />
        <h1>FOOD</h1>
      </div>
      <button type="button" onClick={handleToggleCart}>
        Cart ({totalItemsInCart})
      </button>
    </header>
  );
}
