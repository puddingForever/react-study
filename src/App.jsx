import Header from "./components/foodApp/Header";
import Meals from "./components/foodApp/Meals";
import Modal from "./components/foodApp/Modal/Modal";
import CartContextProvider from "./components/foodApp/store/cart-provider";
import ModalContextProvider, { useModalContext } from "./components/foodApp/store/modal-provider";


function App() {

  return (
    <ModalContextProvider>
      <CartContextProvider>
        <Page />
      </CartContextProvider>
    </ModalContextProvider> 
  );
}

const Page = () => {

  const {state} = useModalContext();

  return <>
        { state.modalType && <Modal/> }
            <Header />
            <Meals />
        </>
}


export default App;
