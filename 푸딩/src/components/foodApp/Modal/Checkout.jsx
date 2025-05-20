import { useState } from "react";
import { submitOrder } from "../http";
import { useCartContext } from "../store/cart-provider";
import { useModalContext } from "../store/modal-provider";

// 주문서 
const Checkout = ({onCloseModal}) => {
    // context (모달,장바구니)
    const {dispatch:modalDispatch} = useModalContext();
    const {state:cartState} = useCartContext(); 
    const { totalPrice , meals } = cartState;
    // state (에러,로딩)
    const [errors,setErrors] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false);

    // submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // 선택된 음식이 없을 때 
        if(meals.length === 0){
            setErrors({message : "No Meal has been selected"});
            setIsSubmitting(false);
            return;
        }

        // submitting data
        const formData = new FormData(e.target);
       
        const userData = {
                items : meals,
                customer : {
                      name : formData.get("name"),
                     email : formData.get("email"),
                    street : formData.get("street"),
             'postal-code' : formData.get('postal-code'),
                      city : formData.get("city"),
                } 
        }

        try{ // 요청이 성공한 경우 , 결과 모달창표시
            await submitOrder(userData);
            modalDispatch({type: 'OPEN_RESULT'})
        }catch(error){ 
          setErrors({message: error.message })
        }finally{
            setIsSubmitting(false);
        }
        
    }
 
    return <>
        <h2>Checkout</h2>
        <p className="cart-total">Total Amount: ${totalPrice}</p>
        <form onSubmit={handleSubmit}>
            <ul className="cart">
            <li className="control">
                <label>Full Name</label>
                <input type="text" name="name" required />
                
            </li>
            <li className="control">
                <label>E-mail Address</label>
                <input type="email" name="email" required />
            </li>
            <li className="control">
                <label>Street</label>
                <input type="text" name="street" required />
            </li>
            <li className="control-row">
                <div className="control">
                <label>Postal Code</label>
                <input type="text" name="postal-code" required/>
                </div>
                <div className="control">
                <label>City</label>
                <input type="text" name="city" required />
                </div>
            </li>
            </ul>
            <div>
                {errors && <p className="error-message">{errors.message}</p> }
            </div>
            <div className="modal-actions">  
            <button type="button" className="text-button" onClick={onCloseModal}>Close</button>
            <button className="button" > { isSubmitting ? 'Submitting..' : 'Submit Order'}</button>
            </div>
        </form>
    </>
}

export default Checkout;