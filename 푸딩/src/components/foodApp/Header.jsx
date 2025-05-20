import Logo from "../../assets/food-logo.jpg" 
import {  useModalContext } from "../store/modal-provider"

const Header = () => {
  // context
  const { dispatch:modalDispatch } = useModalContext();

    // 카트 모달 보여주기 
   const showCartHandler = () => {
      modalDispatch({ type : "OPEN_CART"})
   }
    return <header id="main-header">
            <div id="title">
                <img src={Logo} />
                <h1>React food</h1>
            </div>
            <button onClick={showCartHandler}>Cart</button>
    </header>
}

export default Header;