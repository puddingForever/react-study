import { useSelector, useDispatch } from "react-redux";
import Header from "./components/common/Header";
import MenuList from "./components/MenuList";
import Cart from "./components/Cart";
import Modal from "./components/common/Modal";
import Checkout from "./components/Checkout";
import { cartUIActions } from "./store/cart-ui";

function App() {
  const { isShow, view } = useSelector((state) => state.ui);

  return (
    <>
      {isShow && (
        <Modal view={view}>
          {view === "cart" && <Cart />}
          {view === "checkout" && <Checkout />}
        </Modal>
      )}
      <Header />
      <MenuList />
    </>
  );
}

export default App;
