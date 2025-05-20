import { useContext } from 'react';
import CartContext from '../../store/CartContext';
import Button from '../UI/Button';

const Header = (props) => {
  const cartCtx = useContext(CartContext);

  // 장바구니의 총 아이템 수 계산
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src="/logo.jpg" alt="Restaurant logo" />
        <h1>ReactMeals</h1>
      </div>
      <Button onClick={props.onShowCart}>
        Cart ({numberOfCartItems})
      </Button>
    </header>
  );
};

export default Header;