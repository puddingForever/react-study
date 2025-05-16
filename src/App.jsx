import { useState } from 'react';
import Header from './components/Layout/Header';
import MealList from './components/Meals/MealList';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import { CartProvider } from './store/CartContext';

// 모달 상태 관리
// CartProvider로 전체 앱에 장바구니 상태 제공
const App = () => {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [checkoutIsShown, setCheckoutIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
    setCheckoutIsShown(false);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const showCheckoutHandler = () => {
    setCartIsShown(false);
    setCheckoutIsShown(true);
  };

  const hideCheckoutHandler = () => {
    setCheckoutIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && (
        <Cart
          onClose={hideCartHandler}
          onCheckout={showCheckoutHandler}
        />
      )}
      {checkoutIsShown && (
        <Checkout
          onCancel={hideCheckoutHandler}
          onShowCart={showCartHandler}
        />
      )}
      <Header onShowCart={showCartHandler} />
      <main>
        <MealList />
      </main>
    </CartProvider>
  );
}

export default App;