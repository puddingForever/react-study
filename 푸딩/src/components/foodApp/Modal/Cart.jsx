import { useCartContext } from "../store/cart-provider";
import {  useModalContext } from "../store/modal-provider";

// 장바구니 
const Cart = ({onCloseModal}) => {
  // context
 const {dispatch:modalDispatch} = useModalContext();
 const {state:cartState , dispatch:cartDispatch} = useCartContext();
 const {meals, totalPrice} = cartState;

  // 주문서 모달창 열기 
  const openCheckoutHandler = () => {
    modalDispatch({type : "OPEN_CHECKOUT"})
  }

  // 음식 추가 or 삭제 
  const handleQuantity = (identifier, meal) => {
    if(identifier){ 
        cartDispatch({type: "ADD_MEAL", payload :meal })
    }else{ 
        cartDispatch({type: "REMOVE_MEAL", payload :meal })
    }
  }

    return (
        <>
            <h2>Your Cart</h2>
            <ul className="cart">
            {/* 추가한 음식들  */}
            {meals.map((meal) => 
                <li className="cart-item" key={meal.id}>
                    <p>{meal.name} &nbsp; -{meal.count} x ${meal.priceSum} </p>
                    <div className="cart-item-actions">
                    <button onClick={() => handleQuantity(false,meal)}>-</button>
                    <span>{meal.count}</span>
                    <button onClick={() => handleQuantity(true,meal)}>+</button>
                    </div>
                </li>
            )}
           
            </ul>
            <div className="cart-total">
                Total: ${totalPrice}
            </div>
            <div className="modal-actions">
                <button className="text-button" onClick={onCloseModal}>Close</button>
                <button className="button" onClick={openCheckoutHandler}>Go to Checkout</button>
            </div>
        </>
    )

}

export default Cart;