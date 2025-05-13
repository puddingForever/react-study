import { useDispatch } from "react-redux";
import { cartUIActions } from "../../store/cart-ui";

export default function Header() {
  const dispatch = useDispatch();

  const handleToggleCart = () => {
    dispatch(cartUIActions.toggleCart());
  };
  return (
    <header id="main-header">
      <div id="title">
        <img src="logo.jpg" alt="로고" />
        <h1>FOOD</h1>
      </div>
      <button onClick={handleToggleCart}>Cart ({"수량"})</button>
    </header>
  );
}
